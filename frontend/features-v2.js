/* Manak Match v2 features — layered on top of the existing UI (no visual redesign).
   1) hybrid-search transparency  2) Standards Map  3) Dispute-risk panel + corrected-spec export
   4) Watchlist  5) PDF / DOCX tender upload */
(function(){
  const $$ = id => document.getElementById(id);
  const css = document.createElement('style');
  css.textContent = `
  .term.sem{ background:var(--accent-soft); color:var(--accent); border-color:transparent; }
  .mapwrap{ padding:6px 22px 4px; } .mapwrap svg{ width:100%; height:auto; display:block; }
  .mapwrap .edge{ stroke:var(--ink-4,#b9bfd0); stroke-width:1.3; fill:none; } .mapwrap .edge.sup{ stroke:var(--bad); stroke-dasharray:5 4; }
  .mapwrap .node{ cursor:pointer; } .mapwrap .node circle{ stroke-width:2; fill:var(--surface,#fff); transition:transform .15s; transform-box:fill-box; transform-origin:center; }
  .mapwrap .node:hover circle{ transform:scale(1.12); } .mapwrap text{ font:600 11px var(--f-body,system-ui); fill:var(--ink); text-anchor:middle; pointer-events:none; }
  .maplegend{ display:flex; flex-wrap:wrap; gap:6px 14px; padding:8px 22px 4px; font-size:.78rem; color:var(--ink-3); } .maplegend i{ display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:5px; vertical-align:-1px; }
  .risk{ margin:16px 0; padding:18px 20px; } .risk h3{ margin:0 0 4px; font-family:var(--f-display); font-size:1.05rem; }
  .risk-top{ display:flex; align-items:center; gap:18px; flex-wrap:wrap; } .risk-num{ font:800 2rem var(--f-display); line-height:1; }
  .risk-bar{ flex:1; min-width:180px; height:10px; border-radius:99px; background:linear-gradient(90deg,var(--ok),var(--warn),var(--bad)); position:relative; }
  .risk-bar b{ position:absolute; top:-5px; width:4px; height:20px; border-radius:3px; background:var(--ink); transform:translateX(-2px); }
  .checks{ display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:8px 16px; margin:14px 0 0; padding:0; list-style:none; font-size:.86rem; }
  .checks li{ display:flex; gap:8px; align-items:flex-start; } .checks .y{ color:var(--ok); } .checks .n{ color:var(--bad); } .checks .w{ color:var(--warn); }
  .watchbox{ margin-top:22px; } .wrow{ display:flex; align-items:center; gap:12px; padding:12px 14px; border:1px solid var(--line,#e3e6ef); border-radius:12px; margin-top:8px; background:var(--surface,#fff); flex-wrap:wrap; }
  .wrow .no{ font-weight:800; } .wrow .tt{ flex:1; min-width:180px; font-size:.86rem; color:var(--ink-3); } .wrow.alert{ border-color:var(--bad-line); background:var(--bad-soft); }
  .btn.on{ background:var(--accent-soft); color:var(--accent); }`;
  document.head.appendChild(css);

  /* ---------- 1) hybrid search transparency + action buttons ---------- */
  const baseRender = window.renderResult;
  window.renderResult = function(r, i){
    let h = baseRender(r, i);
    if(r.semOnly){
      h = h.replace('</p>', `</p><div class="why">${ic('scan-search')}Matched by <b>meaning</b>, not keywords <span class="term sem">concept similarity ${r.semantic}%</span></div>`);
    } else if(r.semantic >= 40){
      h = h.replace('in title and scope</div>', `in title and scope <span class="term sem">+ meaning ${r.semantic}%</span></div>`);
    }
    const w = watched(r.std.no);
    const extra = `<button class="btn btn-ghost btn-sm" data-map="${escapeHtml(r.std.no)}">${ic('network')}Standards map</button>` +
      `<button class="btn btn-ghost btn-sm${w ? ' on' : ''}" data-watch="${escapeHtml(r.std.no)}">${w ? '★ Watching' : '☆ Watch'}</button>`;
    const k = h.lastIndexOf('</div>\n  </article>');
    return k > -1 ? h.slice(0, k) + extra + h.slice(k) : h;
  };

  /* ---------- 2) Standards map ---------- */
  const dlg = document.createElement('dialog'); dlg.id = 'mapDlg';
  dlg.innerHTML = `<div class="dlg" style="width:820px"><div class="dlg-hd"><span class="page-ic" style="width:42px;height:42px">${ic('network')}</span>
    <div><h2 id="mapTitle">Standards map</h2><p id="mapSub"></p></div><button class="btn-icon" aria-label="Close" onclick="mapDlg.close()">${ic('x')}</button></div>
    <div class="mapwrap" id="mapBody"></div><div class="maplegend" id="mapLegend"></div>
    <div class="dlg-ft"><span style="font-size:.8rem;color:var(--ink-3)">Right: standards it refers to · Left: standards that cite it · click a node to open it.</span><button class="btn btn-ghost" onclick="mapDlg.close()">Close</button></div></div>`;
  document.body.appendChild(dlg);
  dlg.addEventListener('click', e => { if(e.target === dlg) dlg.close(); });
  const COL = { product:'#E8741C', normative:'#3D5AFE', test:'#0F7A45', term:'#8E24AA', safety:'#C0372B', install:'#00838F', centre:'#1B1F3B' };
  window.openMap = function(no){
    const c = resolveStd(no); if(!c) return;
    const W = 780, H = 470, cx = W / 2, cy = H / 2, nodes = [{ s:c, x:cx, y:cy, t:'centre', r:34 }], edges = [], seen = new Set([c.no]);
    const ring = (src, list, R, a0, a1, depth) => {
      const items = list.map(n => ({ n, s:resolveStd(n) })).filter(o => o.s && !seen.has(o.s.no));
      items.forEach((o, k) => {
        seen.add(o.s.no);
        const a = a0 + (a1 - a0) * (items.length === 1 ? .5 : k / (items.length - 1));
        nodes.push({ s:o.s, x:cx + R * 1.55 * Math.cos(a), y:cy + R * Math.sin(a), t:classifyRelation(o.n), r:depth === 1 ? 26 : 20, from:src });
        edges.push({ a:src, b:o.s.no });
      });
    };
    const first = (c.related || []).slice(0, 7); ring(c.no, first, 150, -.85, .85, 1);
    const inbound = STANDARDS.filter(x => x.no !== c.no && (x.related || []).some(r => { const t = resolveStd(r); return t && t.no === c.no; })).map(x => x.no).slice(0, 7);
    const nOut = nodes.length; ring(c.no, inbound, 150, Math.PI - .85, Math.PI + .85, 1);
    const l1 = nodes.slice(1, nOut);
    l1.forEach((n, i) => { const rel = (n.s.related || []).slice(0, 2); const base = Math.atan2(n.y - cy, (n.x - cx) / 1.55); ring(n.s.no, rel, 215, base - .28, base + .28, 2); });
    if(c.supersededBy){ const t = resolveStd(c.supersededBy); if(t && !seen.has(t.no)){ seen.add(t.no); nodes.push({ s:t, x:cx, y:cy - 190, t:'product', r:26, sup:true }); edges.push({ a:c.no, b:t.no, sup:true }); } }
    const pos = {}; nodes.forEach(n => pos[n.s.no] = n);
    const short = n => n.replace(/:\d{4}$/, '').replace(/\s*\(Part\s*/i, ' P').replace(/\)/, '').slice(0, 14);
    $$('mapBody').innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Relationship graph of ${escapeHtml(c.no)}">` +
      edges.map(e => `<line class="edge${e.sup ? ' sup' : ''}" x1="${pos[e.a].x}" y1="${pos[e.a].y}" x2="${pos[e.b].x}" y2="${pos[e.b].y}"/>`).join('') +
      nodes.map(n => { const col = n.s.status !== 'current' ? '#C0372B' : COL[n.t]; return `<g class="node" data-open="${escapeHtml(n.s.no)}"><title>${escapeHtml(n.s.no + ' — ' + n.s.title)}</title><circle cx="${n.x}" cy="${n.y}" r="${n.r}" style="stroke:${col}${n.t === 'centre' ? ';fill:' + col : ''}"/>` +
        `<text x="${n.x}" y="${n.y + 4}" style="${n.t === 'centre' ? 'fill:#fff;' : ''}${short(n.s.no).length > 9 ? 'font-size:9px' : ''}">${short(n.s.no)}</text>${n.r < 30 && n.t !== 'centre' ? `<text x="${n.x}" y="${n.y + n.r + 13}" style="font-weight:500;font-size:9.5px;fill:var(--ink-3)">${escapeHtml(n.s.title.split(/[—,(]/)[0].slice(0, 28))}</text>` : ''}</g>`; }).join('') + `</svg>`;
    $$('mapLegend').innerHTML = Object.entries({ centre:'Selected', product:'Related product', normative:'Normative reference', test:'Test method', safety:'Safety', install:'Installation' }).map(([k, v]) => `<span><i style="background:${COL[k]}"></i>${v}</span>`).join('') + `<span><i style="background:#fff;border:2px solid #C0372B"></i>Superseded / withdrawn</span>`;
    $$('mapTitle').textContent = c.no; $$('mapSub').textContent = c.title + ' — ' + (nodes.length - 1) + ' connected standards';
    dlg.showModal();
  };

  /* ---------- 4) Watchlist ---------- */
  function wl(){ return store.get('watch', []); }
  function watched(no){ return wl().some(x => x.no === no); }
  function toggleWatch(no){
    const s = resolveStd(no); if(!s) return; let l = wl();
    if(watched(no)) l = l.filter(x => x.no !== no); else l.push({ no, status:s.status, added:new Date().toISOString().slice(0, 10) });
    store.set('watch', l); toast(watched(no) ? 'Watching ' + no : 'Removed ' + no); renderWatch();
    document.querySelectorAll(`[data-watch="${CSS.escape(no)}"]`).forEach(b => { b.classList.toggle('on', watched(no)); b.textContent = watched(no) ? '★ Watching' : '☆ Watch'; });
  }
  function renderWatch(){
    let box = $$('watchBox');
    if(!box){ const g = $$('gaps'); if(!g) return; box = document.createElement('div'); box.id = 'watchBox'; box.className = 'watchbox'; g.after(box); }
    const l = wl();
    if(!l.length){ box.innerHTML = ''; return; }
    box.innerHTML = `<div class="res-hd"><h2>Your watchlist</h2><span class="meta">${ic('history')}Flags a tender when a cited standard is superseded or withdrawn</span></div>` +
      l.map(w => { const s = resolveStd(w.no) || {}; const bad = s.status && s.status !== 'current';
        return `<div class="wrow${bad ? ' alert' : ''}"><span class="no">${escapeHtml(w.no)}</span><span class="tt">${escapeHtml(s.title || '')}${bad ? `<br><b style="color:var(--bad)">${s.status === 'superseded' ? 'Superseded by ' + escapeHtml(s.supersededBy || 'a newer edition') : 'Withdrawn'} — update every tender that cites it.</b>` : `<br>Current · watching since ${w.added}`}</span>` +
          (bad && s.supersededBy ? `<button class="btn btn-danger btn-sm" data-lookup="${escapeHtml(s.supersededBy)}">Open ${escapeHtml(s.supersededBy)}</button>` : '') +
          `<button class="btn btn-ghost btn-sm" data-watch="${escapeHtml(w.no)}">Remove</button></div>`; }).join('');
  }
  document.addEventListener('click', e => {
    const m = e.target.closest('[data-map]'), w = e.target.closest('[data-watch]'), o = e.target.closest('[data-open]');
    if(m) openMap(m.dataset.map); else if(w) toggleWatch(w.dataset.watch); else if(o){ dlg.close(); lookup(o.dataset.open); }
  });
  const baseDo = window.doSearch; window.doSearch = function(q){ baseDo(q); renderWatch(); };
  renderWatch();

  /* ---------- 3) dispute-risk panel + corrected specification ---------- */
  const baseAudit = window.runAudit;
  window.runAudit = function(){
    baseAudit();
    const text = $$('tenderText').value, out = $$('auditOut'), health = out.querySelector('.health');
    if(!health || !text.trim()) return;
    const rows = auditTenderText(text);
    const std = rows.map(r => r.std).filter(Boolean);
    const hasProduct = std.some(s => docType(s) === 'product-spec'), hasTest = std.some(s => docType(s) === 'test-method' || /test|sampling/i.test(s.title));
    const needCert = std.filter(s => certRequired(s)), certWord = /\b(ISI|BIS|CRS|hallmark|HUID|licen[cs]e|Standard Mark)\b/i.test(text);
    const crit = rows.filter(r => r.issues.some(i => i.level === 'critical')).length, warn = rows.filter(r => !r.issues.some(i => i.level === 'critical') && r.issues.length).length;
    const gaps = auditSuggestions(rows).length;
    const risk = Math.min(100, crit * 26 + warn * 8 + (needCert.length && !certWord ? 16 : 0) + (hasProduct ? 0 : 10) + (hasTest ? 0 : 8) + Math.min(gaps, 4) * 3);
    const lvl = risk >= 55 ? ['High', 'var(--bad)'] : risk >= 25 ? ['Medium', 'var(--warn)'] : ['Low', 'var(--ok)'];
    const chk = (ok, t, warnOnly) => `<li><span class="${ok ? 'y' : warnOnly ? 'w' : 'n'}">${ok ? '✓' : warnOnly ? '!' : '✕'}</span><span>${t}</span></li>`;
    health.insertAdjacentHTML('afterend', `<div class="card risk"><div class="risk-top"><div><h3>Dispute-risk index</h3><span style="font-size:.82rem;color:var(--ink-3)">How likely this tender is to be challenged</span></div>
      <div class="risk-num" style="color:${lvl[1]}">${risk}<small style="font-size:.9rem">/100 · ${lvl[0]}</small></div><div class="risk-bar"><b style="left:${risk}%"></b></div></div>
      <ul class="checks">${chk(!crit, crit ? `${crit} superseded / withdrawn citation${crit > 1 ? 's' : ''}` : 'No superseded or withdrawn citations')}
      ${chk(hasProduct, hasProduct ? 'A product standard is cited' : 'No product standard cited')}${chk(hasTest, hasTest ? 'A test method is cited' : 'No test method cited — acceptance testing is undefined', true)}
      ${chk(!needCert.length || certWord, !needCert.length ? 'No mandatory certification triggered' : certWord ? 'Certification wording present' : `Missing ISI / CRS / Hallmark clause (${needCert.length} standard${needCert.length > 1 ? 's' : ''} require it)`)}
      ${chk(!gaps, gaps ? `${gaps} commonly co-cited standard${gaps > 1 ? 's' : ''} not referenced` : 'No obvious allied-standard gaps', true)}</ul>
      <div style="margin-top:14px"><button class="btn btn-primary btn-sm" onclick="exportCorrectedSpec()">${ic('download')}Export corrected specification</button></div></div>`);
  };
  window.exportCorrectedSpec = function(){
    let text = $$('tenderText').value; const rows = auditTenderText(text), notes = [], addl = [];
    rows.forEach(r => { const fix = r.std && r.std.supersededBy || (r.issues.find(i => i.fix) || {}).fix;
      if(fix && r.issues.some(i => i.level === 'critical')){ text = text.split(r.cited.raw).join(fix); notes.push(`${r.cited.raw}  →  ${fix}`); } });
    const certs = [...new Set(rows.map(r => r.std).filter(s => s && s.status === 'current' && certRequired(s)).map(s => `• ${s.no}: ${certSentence(s, false)}`))];
    auditSuggestions(rows).filter(g => !text.includes(g.std.no)).forEach(g => addl.push(`• ${g.std.no} — ${g.std.title} (normally cited with ${g.becauseOf})`));
    const body = `CORRECTED TENDER SPECIFICATION — generated by Manak Match on ${new Date().toISOString().slice(0, 10)}\n${'='.repeat(70)}\n\n` + text +
      `\n\n${'-'.repeat(70)}\nCITATION CORRECTIONS APPLIED\n${notes.length ? notes.join('\n') : 'None needed.'}\n\nMANDATORY CERTIFICATION CLAUSES\n${certs.length ? certs.join('\n') : 'None triggered.'}\n\nSTANDARDS TO CONSIDER ADDING\n${addl.length ? addl.join('\n') : 'None.'}\n\nNote: verify against bis.gov.in before issuing the tender.\n`;
    download('corrected-specification.txt', body, 'text/plain'); toast('Corrected specification downloaded');
  };

  /* ---------- 5) PDF / DOCX upload (libraries load on demand from cdnjs) ---------- */
  const loadJs = src => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => no(new Error('offline')); document.head.appendChild(s); });
  const baseLoad = window.loadTextFile;
  window.loadTextFile = async function(input, targetId, nameId){
    const f = input.files[0]; if(!f) return; const ext = f.name.split('.').pop().toLowerCase();
    if(ext !== 'pdf' && ext !== 'docx') return baseLoad(input, targetId, nameId);
    try{
      toast('Reading ' + f.name + '…'); let txt = '';
      const buf = await f.arrayBuffer();
      if(ext === 'pdf'){
        if(!window.pdfjsLib){ await loadJs('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'); pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; }
        const pdf = await pdfjsLib.getDocument({ data:buf }).promise;
        for(let p = 1; p <= pdf.numPages; p++){ const c = await (await pdf.getPage(p)).getTextContent(); txt += c.items.map(i => i.str).join(' ') + '\n'; }
      } else {
        if(!window.mammoth) await loadJs('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js');
        txt = (await mammoth.extractRawText({ arrayBuffer:buf })).value;
      }
      if(!txt.trim()) throw new Error('empty');
      $$(targetId).value = txt; if(nameId) $$(nameId).textContent = f.name; toast(f.name + ' loaded');
    }catch(err){ toast(err.message === 'offline' ? 'PDF/DOCX reading needs an internet connection — paste the text or upload a .txt' : 'Could not read text from that file (scanned PDFs need OCR)', true); }
    input.value = '';
  };
  document.querySelectorAll('.file-btn').forEach(b => { const inp = b.querySelector('input'); if(!inp) return; inp.accept = inp.accept.replace(/,text\/plain/, '') + ',.pdf,.docx,text/plain';
    const t = [...b.childNodes].find(n => n.nodeType === 3 && /Upload/.test(n.textContent)); if(t) t.textContent = 'Upload PDF / DOCX / TXT'; });
})();
