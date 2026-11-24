/* =========================================================
   THÀNH PHẦN TƯƠNG TÁC DÙNG CHUNG
   phân loại (kéo thả + chạm), sắp thứ tự, ghép cặp, đèn tín hiệu,
   chuỗi tình huống, khung điện thoại, hiệu ứng gõ chữ, kết quả bài
   ========================================================= */
(function(){
const A = window.APP, st = A.st, $ = A.$, $$ = A.$$, esc = A.esc, I = window.ICON;
window.EX = window.EX || {};
/* markdown rất gọn: **đậm**, `mã` */
A.md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '<code>$1</code>');
A.mdRaw = s => String(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
A.partOf = id => window.PARTS.find(p => p.id === id);
A.exById = id => window.EXLIST.find(e => e.id === id);
A.lessonOfEx = id => { for (const p of window.PARTS) for (const l of p.lessons) if (l.b.some(b => b.t === 'ex' && b.x === id)) return l; return null; };

/* ---------- ghi nhận kết quả bài thực hành ---------- */
A.exDone = function(id, score, max){
  const pct = max ? Math.round(score * 100 / max) : 100;
  const old = st.ex[id];
  const first = !old;
  if (!old || pct >= old.pct) st.ex[id] = { pct, s: score, m: max, t: Date.now() };
  A.save();
  if (first) A.addXP(20 + Math.round(pct / 5), 'Hoàn thành bài thực hành');
  else if (pct > (old.pct || 0)) A.addXP(5, 'Cải thiện điểm');
  if (pct >= 80) { A.SND.win(); A.confetti(); } else A.SND.ok();
  return pct;
};
A.mission = function(steps, tip){
  return '<div class="mission"><h3>' + I('target') + 'Nhiệm vụ</h3><ol>' + steps.map(s => '<li>' + A.mdRaw(s) + '</li>').join('') + '</ol>' + (tip ? '<p class="hint" style="margin:8px 0 0">' + I('sparkle') + A.mdRaw(tip) + '</p>' : '') + '</div>';
};
/* bảng kết quả: ctx từ trang bài thực hành */
A.resultHTML = function(pct, msg, extra){
  const good = pct >= 80;
  return '<div class="result' + (good ? '' : ' mid') + '" tabindex="-1">' +
    '<div class="medal">' + I(good ? 'award' : 'flag') + '</div>' +
    '<div class="big">' + pct + '%</div>' +
    '<p style="font-weight:700;margin:4px 0 10px">' + (good ? 'Xuất sắc! Bạn đã nắm vững bài này.' : 'Gần được rồi! Xem lại phần gợi ý và thử lần nữa.') + '</p>' +
    (msg ? '<p>' + A.mdRaw(msg) + '</p>' : '') + (extra || '') +
    '<div class="btnrow" style="justify-content:center;margin-top:12px"><button class="btn ghost" data-act="retry">' + I('refresh') + 'Làm lại</button><button class="btn sun" data-act="next">Bài tiếp theo ' + I('right') + '</button></div></div>';
};
A.showResult = function(holder, ctx, score, max, msg, extra){
  const pct = A.exDone(ctx.id, score, max);
  holder.innerHTML = A.resultHTML(pct, msg, extra);
  holder.querySelector('[data-act=retry]').onclick = () => ctx.retry();
  holder.querySelector('[data-act=next]').onclick = () => ctx.next();
  const r = holder.querySelector('.result'); setTimeout(() => { r.scrollIntoView({ behavior: 'smooth', block: 'center' }); r.focus({ preventScroll: true }); }, 80);
  ctx.updateBar && ctx.updateBar();
  return pct;
};

/* ---------- PHÂN LOẠI: kéo thả hoặc chạm thẻ rồi chạm ô ---------- */
A.sorter = function(root, cfg){
  const items = A.shuffle(cfg.items.map((x, i) => Object.assign({ i }, x)));
  root.innerHTML = '<p class="hint">' + I('drag') + 'Kéo thẻ vào ô phù hợp – hoặc <b>chạm vào thẻ</b> rồi <b>chạm vào ô</b>.</p>' +
    '<div class="pool" data-bin="pool">' + items.map(it => '<div class="tcard" draggable="true" tabindex="0" data-i="' + it.i + '">' + A.mdRaw(it.x) + '</div>').join('') + '</div>' +
    '<div class="bins">' + cfg.bins.map(b => '<div class="bin ' + (b.cls || '') + '" data-bin="' + b.k + '" tabindex="0"><h4>' + I(b.ic || 'folder') + esc(b.t) + '</h4></div>').join('') + '</div>' +
    '<div class="btnrow" style="margin-top:14px"><button class="btn big" data-act="check">' + I('check') + 'Kiểm tra</button><span class="small" data-left></span></div><div data-res style="margin-top:16px"></div>';
  let picked = null, checked = false;
  const left = () => { const n = $$('.pool .tcard', root).length; $('[data-left]', root).textContent = n ? 'Còn ' + n + ' thẻ chưa xếp' : 'Đã xếp đủ thẻ'; };
  const place = (card, bin) => { if (checked) return; bin.appendChild(card); card.classList.remove('pick'); picked = null; $$('.bin', root).forEach(b => b.classList.remove('target')); A.SND.tap(); left(); };
  root.addEventListener('click', e => {
    const c = e.target.closest('.tcard');
    if (c && !checked && picked && c !== picked && c.closest('.bin')) { place(picked, c.closest('.bin')); return; }
    if (c && !checked) { if (picked === c) { c.classList.remove('pick'); picked = null; $$('.bin', root).forEach(b => b.classList.remove('target')); return; } $$('.tcard.pick', root).forEach(x => x.classList.remove('pick')); picked = c; c.classList.add('pick'); $$('.bin', root).forEach(b => b.classList.add('target')); A.SND.flip(); return; }
    const b = e.target.closest('[data-bin]'); if (b && picked) place(picked, b);
  });
  root.addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return; const t = e.target; if (t.classList.contains('tcard') || t.dataset.bin) { e.preventDefault(); t.click(); } });
  root.addEventListener('dragstart', e => { const c = e.target.closest('.tcard'); if (!c) return; e.dataTransfer.setData('text/plain', c.dataset.i); c.classList.add('dragging'); });
  root.addEventListener('dragend', e => { const c = e.target.closest('.tcard'); c && c.classList.remove('dragging'); });
  root.addEventListener('dragover', e => { const b = e.target.closest('[data-bin]'); if (b) { e.preventDefault(); b.classList.add('over'); } });
  root.addEventListener('dragleave', e => { const b = e.target.closest('[data-bin]'); b && b.classList.remove('over'); });
  root.addEventListener('drop', e => { const b = e.target.closest('[data-bin]'); if (!b) return; e.preventDefault(); b.classList.remove('over'); const c = $('.tcard[data-i="' + e.dataTransfer.getData('text/plain') + '"]', root); c && place(c, b); });
  left();
  $('[data-act=check]', root).onclick = () => {
    const rest = $$('.pool .tcard', root).length;
    if (rest) { A.toast('Hãy xếp hết ' + rest + ' thẻ còn lại'); A.SND.no(); return; }
    checked = true; let ok = 0;
    $$('.bin .tcard', root).forEach(c => {
      const it = cfg.items[+c.dataset.i], bin = c.closest('.bin').dataset.bin, good = it.k === bin;
      if (good) ok++;
      c.classList.add(good ? 'ok' : 'no'); c.draggable = false;
      if (!good) { const right = cfg.bins.find(b => b.k === it.k); c.insertAdjacentHTML('beforeend', '<span class="why">→ Đúng là: <b>' + esc(right.t) + '</b>' + (it.why ? '. ' + A.mdRaw(it.why) : '') + '</span>'); }
      else if (it.why && cfg.showWhy) c.insertAdjacentHTML('beforeend', '<span class="why">' + A.mdRaw(it.why) + '</span>');
    });
    $('[data-act=check]', root).disabled = true;
    cfg.onDone(ok, cfg.items.length, $('[data-res]', root));
  };
};

/* ---------- SẮP THỨ TỰ ---------- */
A.orderer = function(root, cfg){
  let arr = A.shuffle(cfg.items.map((x, i) => ({ x, i })));
  if (arr.every((a, k) => a.i === k)) arr.reverse();
  const draw = () => {
    root.querySelector('.order').innerHTML = arr.map((a, k) => '<div class="it" data-k="' + k + '"><span>' + A.mdRaw(a.x) + '</span><span class="mv"><button data-up="' + k + '" aria-label="Đưa lên">▲</button><button data-dn="' + k + '" aria-label="Đưa xuống">▼</button></span></div>').join('');
  };
  root.innerHTML = '<p class="hint">' + I('sort') + 'Dùng nút ▲ ▼ để đưa từng bước về đúng vị trí.</p><div class="order"></div><div class="btnrow" style="margin-top:14px"><button class="btn big" data-act="check">' + I('check') + 'Kiểm tra thứ tự</button></div><div data-res style="margin-top:16px"></div>';
  draw();
  root.addEventListener('click', e => {
    const u = e.target.closest('[data-up]'), d = e.target.closest('[data-dn]');
    if (u) { const k = +u.dataset.up; if (k > 0) { [arr[k - 1], arr[k]] = [arr[k], arr[k - 1]]; A.SND.tap(); draw(); } }
    if (d) { const k = +d.dataset.dn; if (k < arr.length - 1) { [arr[k + 1], arr[k]] = [arr[k], arr[k + 1]]; A.SND.tap(); draw(); } }
  });
  $('[data-act=check]', root).onclick = () => {
    let ok = 0; $$('.order .it', root).forEach((el, k) => { const g = arr[k].i === k; if (g) ok++; el.classList.add(g ? 'ok' : 'no'); });
    if (ok < arr.length) A.SND.no();
    cfg.onDone(ok, arr.length, $('[data-res]', root));
  };
};

/* ---------- GHÉP CẶP: chọn trái rồi chọn phải ---------- */
A.matcher = function(root, cfg){
  const L = cfg.pairs.map((p, i) => ({ x: p[0], i })), R = A.shuffle(cfg.pairs.map((p, i) => ({ x: p[1], i })));
  root.innerHTML = '<p class="hint">' + I('link') + 'Chạm một ô bên trái, rồi chạm ô phù hợp bên phải.</p><div class="match"><div class="col">' + (cfg.lt ? '<b class="small">' + esc(cfg.lt) + '</b>' : '') + L.map(a => '<button class="mitem" data-l="' + a.i + '">' + A.mdRaw(a.x) + '</button>').join('') + '</div><div class="col">' + (cfg.rt ? '<b class="small">' + esc(cfg.rt) + '</b>' : '') + R.map(a => '<button class="mitem" data-r="' + a.i + '">' + A.mdRaw(a.x) + '</button>').join('') + '</div></div><div data-res style="margin-top:16px"></div>';
  let sel = null, miss = 0, done = 0;
  root.addEventListener('click', e => {
    const l = e.target.closest('[data-l]'), r = e.target.closest('[data-r]');
    if (l && !l.classList.contains('ok')) { $$('[data-l]', root).forEach(x => x.classList.remove('sel')); l.classList.add('sel'); sel = l; A.SND.flip(); }
    if (r && !r.classList.contains('ok')) {
      if (!sel) { A.toast('Chọn ô bên trái trước'); return; }
      if (sel.dataset.l === r.dataset.r) { sel.classList.remove('sel'); sel.classList.add('ok'); r.classList.add('ok'); sel.disabled = r.disabled = true; sel = null; done++; A.SND.ok(); if (done === L.length) cfg.onDone(Math.max(0, L.length - miss), L.length, $('[data-res]', root)); }
      else { miss++; r.classList.remove('no'); void r.offsetWidth; r.classList.add('no'); A.SND.no(); }
    }
  });
};

/* ---------- CHUỖI CÂU HỎI TÌNH HUỐNG (từng câu, phản hồi ngay) ---------- */
A.chain = function(root, cfg){
  const list = cfg.list; let k = 0, ok = 0;
  const draw = () => {
    const q = list[k];
    root.innerHTML = '<div class="sitcard"><div class="small" style="margin-bottom:6px">Tình huống ' + (k + 1) + '/' + list.length + '</div><div class="meter" style="margin-bottom:12px"><i style="width:' + (k * 100 / list.length) + '%;background:var(--teal2)"></i></div>' +
      (q.pre || '') + '<div class="sq"><span class="n">' + (k + 1) + '</span><span>' + A.mdRaw(q.q) + '</span></div>' +
      (cfg.lights ? '<div class="lights">' + [['g', 'Phù hợp'], ['y', 'Cân nhắc'], ['r', 'Không được']].map(l => '<button class="' + l[0] + '" data-c="' + l[0] + '"><i></i>' + l[1] + '</button>').join('') + '</div>'
        : '<div class="opts">' + q.o.map((o, i) => '<button class="opt" data-c="' + i + '"><span class="lt">' + A.L[i] + '</span><span>' + A.mdRaw(o) + '</span></button>').join('') + '</div>') +
      '<div data-fb></div></div>';
  };
  draw();
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-c]'); if (!b || b.disabled) return;
    const q = list[k], c = cfg.lights ? b.dataset.c : +b.dataset.c, good = c === q.a;
    if (good) { ok++; A.SND.ok(); } else A.SND.no();
    $$('[data-c]', root).forEach(x => { x.disabled = true; const v = cfg.lights ? x.dataset.c : +x.dataset.c; if (v === q.a) x.classList.add('right'), x.style.borderColor = '#4ade80'; else if (x === b) x.classList.add('wrong'), x.style.borderColor = '#f87171'; });
    const last = k === list.length - 1;
    $('[data-fb]', root).innerHTML = '<div class="fb ' + (good ? 'ok' : 'no') + '">' + I(good ? 'check' : 'alert') + '<div><b>' + (good ? 'Chính xác! ' : 'Chưa đúng. ') + '</b>' + A.mdRaw(q.e || '') + '</div></div><div class="btnrow" style="margin-top:12px"><button class="btn" data-nx>' + (last ? 'Xem kết quả' : 'Tình huống tiếp') + ' ' + I('right') + '</button></div>';
    $('[data-nx]', root).onclick = () => { if (last) { root.innerHTML = '<div data-res></div>'; cfg.onDone(ok, list.length, $('[data-res]', root)); } else { k++; draw(); } };
  });
};

/* ---------- KHUNG ĐIỆN THOẠI ---------- */
A.phoneHTML = function(cls, title, sub){
  const now = new Date(), hh = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  return '<div class="phone ' + cls + '"><div class="screen"><div class="sbar"><span>' + hh + '</span><span>5G ▮▮▮ 86%</span></div><div class="ribbon">MÔ PHỎNG TẬP HUẤN</div>' +
    '<div class="apphead"><button class="bk" data-pback aria-label="Quay lại màn hình trước" hidden>‹</button><div>' + esc(title) + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</div></div>' +
    '<div class="sbody" data-sbody></div><div class="stepdots" data-dots></div></div></div>';
};
A.notif = function(screen, html, cls, ms){
  const n = document.createElement('div'); n.className = 'notif ' + (cls || ''); n.innerHTML = html; screen.appendChild(n);
  if (ms !== 0) setTimeout(() => { n.style.transition = 'opacity .4s,transform .4s'; n.style.opacity = 0; n.style.transform = 'translateY(-30px)'; setTimeout(() => n.remove(), 400); }, ms || 6000);
  return n;
};
A.dots = function(el, n, cur){ el.innerHTML = Array.from({ length: n }, (_, i) => '<i class="' + (i < cur ? 'done' : i === cur ? 'on' : '') + '"></i>').join(''); };
A.okSVG = '<svg class="okmark" viewBox="0 0 90 90"><circle cx="45" cy="45" r="40"/><path d="M26 47l13 13 25-28"/></svg>';
/* nhật ký hướng dẫn bên cạnh điện thoại */
A.coach = function(el, html, kind){ el.innerHTML = '<div class="note ' + (kind || 'info') + '" style="margin:0">' + I(kind === 'no' ? 'alert' : kind === 'ok' ? 'check' : 'sparkle') + '<div>' + A.mdRaw(html || '') + '</div></div>'; };
/* gõ chữ từng phần (hiển thị HTML an toàn từ mảng đoạn) */
A.typeOut = function(el, parts, speed, cb){
  let i = 0, j = 0, alive = true; el.innerHTML = ''; el.classList.add('caret');
  const spans = parts.map(p => { const s = document.createElement('span'); if (p.c) s.className = p.c; el.appendChild(s); return s; });
  (function step(){
    if (!alive) return;
    if (i >= parts.length) { el.classList.remove('caret'); cb && cb(); return; }
    const txt = parts[i].x; const n = Math.max(1, Math.round(txt.length / 40));
    spans[i].textContent = txt.slice(0, j += n);
    if (j >= txt.length) { i++; j = 0; }
    setTimeout(step, speed || 14);
  })();
  return () => { alive = false; };
};
A.copy = function(text){ (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => A.toast('Đã chép vào bộ nhớ tạm'), () => { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); A.toast('Đã chép'); } catch(e) {} t.remove(); }); };
A.countWords = s => (String(s).trim().match(/\S+/g) || []).length;
})();
