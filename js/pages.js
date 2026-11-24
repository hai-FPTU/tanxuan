/* =========================================================
   CÁC TRANG: trang chủ, chương trình, phần, bài học, phòng thực hành,
   bài thực hành, tra cứu văn bản, kiểm tra, giấy xác nhận
   ========================================================= */
(function(){
const A = window.APP, st = A.st, $ = A.$, $$ = A.$$, esc = A.esc, I = window.ICON;
const PARTS = window.PARTS, EXL = window.EXLIST, LAW = window.LAW, SD = window.DATA.site;
const P = window.PAGES = {};
const allLessons = () => PARTS.flatMap(p => p.lessons.map(l => Object.assign({ part: p }, l)));
const exDoneN = () => EXL.filter(e => st.ex[e.id]).length;
const readN = () => allLessons().filter(l => st.read[l.id]).length;
const partProg = p => { const ls = p.lessons, ex = EXL.filter(e => e.p === p.id); const d = ls.filter(l => st.read[l.id]).length + ex.filter(e => st.ex[e.id]).length; return Math.round(d * 100 / (ls.length + ex.length)); };
const lawById = id => LAW.items.find(x => x.id === id);
A.backTo = (fallback) => { if (A.canBack()) history.back(); else location.hash = fallback; };
const head = (cls, crumbs, title, sub, back) => '<section class="phead ' + (cls || '') + '"><div class="wrap">' + (back ? '<button class="backbtn" data-back="' + back + '">' + I('left') + 'Quay lại</button>' : '') + '<div class="crumb"><a href="#home">Trang chủ</a>' + crumbs.map(c => ' › ' + (c[1] ? '<a href="' + c[1] + '">' + esc(c[0]) + '</a>' : '<span>' + esc(c[0]) + '</span>')).join('') + '</div><h1>' + title + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</div></section>';
const bindBack = page => $$('[data-back]', page).forEach(b => b.onclick = () => A.backTo(b.dataset.back));

/* ---------- hình nền trang chủ ---------- */
const HERO = '<svg viewBox="0 0 460 380" role="img" aria-label="Minh hoạ: điện thoại thông minh bên dòng sông và hàng dừa"><defs><linearGradient id="hs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#fde68a"/></linearGradient><linearGradient id="hp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e0f2fe"/></linearGradient></defs>' +
  '<g class="spin" style="transform-origin:370px 70px"><circle cx="370" cy="70" r="34" fill="url(#hs)"/>' + Array.from({ length: 10 }, (_, i) => '<rect x="368" y="18" width="4" height="12" rx="2" fill="#fcd34d" transform="rotate(' + i * 36 + ' 370 70)"/>').join('') + '</g>' +
  '<g class="sway" style="transform-origin:70px 330px"><path d="M70 330 C68 260 74 210 80 170" stroke="#92400e" stroke-width="9" fill="none" stroke-linecap="round"/><g fill="#22c55e"><path d="M80 170 C50 150 30 160 10 180 C40 168 60 168 80 172z"/><path d="M80 170 C110 140 140 145 160 160 C130 156 105 160 82 174z"/><path d="M80 170 C70 135 80 115 95 100 C88 125 88 148 84 172z"/><path d="M80 170 C55 130 35 125 20 128 C45 140 62 152 78 174z"/></g><circle cx="78" cy="178" r="6" fill="#a16207"/><circle cx="88" cy="180" r="6" fill="#a16207"/></g>' +
  '<g class="sway" style="transform-origin:410px 330px;animation-delay:-2s"><path d="M410 330 C412 280 405 245 398 215" stroke="#92400e" stroke-width="7" fill="none" stroke-linecap="round"/><g fill="#16a34a"><path d="M398 215 C375 200 355 205 340 220 C362 212 380 212 398 218z"/><path d="M398 215 C420 195 442 198 456 210 C434 207 416 210 400 220z"/><path d="M398 215 C392 190 398 175 410 165 C405 185 404 200 401 218z"/></g></g>' +
  '<g class="floaty"><rect x="160" y="70" width="140" height="250" rx="24" fill="#0b1020"/><rect x="170" y="86" width="120" height="218" rx="16" fill="url(#hp)"/><rect x="180" y="100" width="100" height="22" rx="8" fill="#0f766e"/><text x="230" y="115" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">TÂN XUÂN SỐ</text>' +
  '<g><rect x="180" y="132" width="46" height="42" rx="10" fill="#ede9fe"/><text x="203" y="158" font-size="16" text-anchor="middle">🤖</text><rect x="234" y="132" width="46" height="42" rx="10" fill="#e0f2fe"/><text x="257" y="158" font-size="16" text-anchor="middle">🪪</text><rect x="180" y="182" width="46" height="42" rx="10" fill="#ccfbf1"/><text x="203" y="208" font-size="16" text-anchor="middle">📄</text><rect x="234" y="182" width="46" height="42" rx="10" fill="#ffedd5"/><text x="257" y="208" font-size="16" text-anchor="middle">📍</text></g>' +
  '<rect x="180" y="234" width="100" height="10" rx="5" fill="#e2e8f0"/><rect x="180" y="234" width="64" height="10" rx="5" fill="#14b8a6"><animate attributeName="width" values="10;100;10" dur="5s" repeatCount="indefinite"/></rect><rect x="180" y="254" width="100" height="30" rx="10" fill="#f59e0b"/><text x="230" y="273" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">BẮT ĐẦU HỌC</text></g>' +
  '<g class="pulse"><circle cx="320" cy="140" r="16" fill="#fff"/><path d="M312 140l6 6 10-12" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-linecap="round"/></g><g class="pulse" style="animation-delay:-1s"><circle cx="138" cy="230" r="14" fill="#fff"/><text x="138" y="235" font-size="14" text-anchor="middle">✨</text></g>' +
  '<path d="M0 335 C80 320 150 350 230 338 C320 325 380 348 460 332 L460 380 L0 380z" fill="#38bdf8" opacity=".55"/><path d="M0 352 C90 340 170 365 250 352 C330 340 390 362 460 350 L460 380 L0 380z" fill="#0ea5e9" opacity=".6"/><g><path d="M120 344 l40 0 l-6 9 l-28 0z" fill="#92400e"><animateTransform attributeName="transform" type="translate" values="0 0;160 -4;0 0" dur="14s" repeatCount="indefinite"/></path></g></svg>';

/* ---------- khối nội dung bài học ---------- */
const DEMO = {
  nfc: () => '<div class="card pad-s" style="text-align:center"><div class="nfcanim"><div class="ph2"></div><div class="wave"></div><div class="card"></div></div><p class="small" style="margin:0">Áp thẻ căn cước sát vùng lưng điện thoại mới – chip NFC trên thẻ được đọc để xác thực.</p></div>',
  chonxa: () => '<div class="card pad-s"><div class="grid g3" style="align-items:center"><div class="pcard" style="margin:0;border:2px solid #86efac;background:#f0fdf4"><small>Tỉnh / Thành phố</small><br><b>Tỉnh Vĩnh Long</b></div><div class="pcard" style="margin:0;opacity:.6;text-decoration:line-through;border:2px dashed #fca5a5;background:#fef2f2"><small>Huyện / Thị xã / Thành phố</small><br><b>(không còn từ 01/7/2025)</b></div><div class="pcard" style="margin:0;border:2px solid #86efac;background:#f0fdf4"><small>Phường / Xã</small><br><b>Xã Tân Xuân</b></div></div></div>'
};
function blocks(list){
  return list.map(b => {
    switch (b.t) {
      case 'p': return '<div class="blk"><p>' + A.mdRaw(b.x) + '</p></div>';
      case 'h': return '<div class="blk"><h3>' + esc(b.x) + '</h3></div>';
      case 'ul': return '<div class="blk"><ul class="li">' + b.x.map(x => '<li>' + A.md(x) + '</li>').join('') + '</ul></div>';
      case 'flow': return '<div class="blk reveal"><div class="flow">' + b.x.map(s => '<div class="st"><b>' + esc(s[0]) + '</b><span>' + A.md(s[1]) + '</span></div>').join('') + '</div></div>';
      case 'tbl': return '<div class="blk tblw"><table class="tbl"><tr>' + b.h.map(h => '<th>' + esc(h) + '</th>').join('') + '</tr>' + b.r.map(r => '<tr>' + r.map(c => '<td>' + A.md(c) + '</td>').join('') + '</tr>').join('') + '</table></div>';
      case 'note': return '<div class="note ' + (b.k || '') + '">' + I({ warn: 'alert', no: 'ban', ok: 'check', law: 'scale' }[b.k] || 'sparkle') + '<div><p>' + A.mdRaw(b.x) + '</p></div></div>';
      case 'law': return '<div class="blk">' + b.x.map(id => { const l = lawById(id); return l ? '<a class="lawchip ' + l.st + '" href="#tracuu-' + id + '"><i></i>' + esc(l.no) + ' · ' + esc(LAW.status[l.st]) + '</a>' : ''; }).join('') + '</div>';
      case 'ex': { const e = A.exById(b.x); if (!e) return ''; const d = st.ex[e.id]; return '<div class="blk"><a class="excta' + (d ? ' done' : '') + '" href="#th-' + e.id + '"><span class="ti">' + I(d ? 'check' : e.ic) + '</span><span><b>Thực hành ngay: ' + esc(e.t) + '</b><span>' + esc(e.d) + ' · ' + e.m + ' phút' + (d ? ' · Đạt ' + d.pct + '%' : '') + '</span></span><span class="btn small sun go">' + (d ? 'Làm lại' : 'Làm bài') + I('right') + '</span></a></div>'; }
      case 'prompt': return '<div class="blk"><div class="prompt"><div class="ph"><span><b>' + esc(b.code) + '</b> · ' + esc(b.title) + '</span><button class="cp" data-copy>' + I('copy') + ' Chép</button></div><pre>' + esc(b.x).replace(/\[(Cần bổ sung|Chưa xác định)\]/g, '<mark>[$1]</mark>') + '</pre></div></div>';
      case 'cmp': return '<div class="blk cmp"><div><h4>' + esc(b.a[0]) + '</h4><ul>' + b.a[1].map(x => '<li>' + A.md(x) + '</li>').join('') + '</ul></div><div><h4>' + esc(b.b[0]) + '</h4><ul>' + b.b[1].map(x => '<li>' + A.md(x) + '</li>').join('') + '</ul></div></div>';
      case 'demo': return '<div class="blk">' + (DEMO[b.x] ? DEMO[b.x]() : '') + '</div>';
      case 'rules': return '<div class="blk grid g2">' + window.COURSE.rules.map((r, i) => '<div class="card pad-s reveal" style="display:flex;gap:12px"><span class="ti" style="width:40px;height:40px;border-radius:12px;background:' + ['#0f766e', '#dc2626', '#7c3aed', '#ea580c'][i] + ';color:#fff;display:grid;place-items:center;flex:none">' + I(['shield', 'ban', 'file', 'chart'][i]) + '</span><div><b>' + esc(r[0]) + '</b><br><span class="small">' + esc(r[1]) + '</span></div></div>').join('') + '</div>';
      case 'scenario': { const s = window.COURSE.scenario; return '<div class="blk card" style="background:linear-gradient(135deg,#ecfdf5,#f0f9ff)"><h3 style="display:flex;gap:8px;align-items:center">' + I('broom') + esc(s.t) + '</h3><table class="tbl">' + s.rows.map(r => '<tr><td style="width:34%"><b>' + r[0] + '</b></td><td>' + r[1] + '</td></tr>').join('') + '</table><p class="small" style="margin:8px 0 0">Tình huống này được dùng lại trong các bài thực hành soạn thảo, bảng việc, tin Zalo.</p></div>'; }
      default: return '';
    }
  }).join('');
}

/* ---------- TRANG CHỦ ---------- */
P.home = function(page){
  const nL = allLessons().length, nE = EXL.length;
  page.innerHTML = '<section class="hero"><div class="wrap hero-grid"><div><span class="kick">' + I('pin') + ' Xã Tân Xuân · Tỉnh Vĩnh Long</span><h1>Kỹ năng số cho <span>cán bộ xã</span></h1><p class="lead">Giáo trình tương tác: dùng AI soạn thảo an toàn, hướng dẫn người dân VNeID và Sổ sức khỏe điện tử, nộp hồ sơ dịch vụ công trực tuyến, phản ánh hiện trường trên Smart Vĩnh Long.</p>' +
    '<div class="statrow"><div class="stat"><b>4</b><span>phần học</span></div><div class="stat"><b>' + nL + '</b><span>bài học</span></div><div class="stat"><b>' + nE + '</b><span>bài thực hành trên web</span></div><div class="stat"><b>' + LAW.items.length + '</b><span>văn bản đã rà soát hiệu lực</span></div></div>' +
    '<div class="btnrow"><a class="btn big sun" href="#bai-1-1">' + I('play') + (readN() ? 'Học tiếp' : 'Bắt đầu học') + '</a><a class="btn big light" href="#thuchanh">' + I('puzzle') + 'Vào Phòng thực hành</a></div></div><div class="hero-art">' + HERO + '</div></div>' +
    '<svg class="waves" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60 C240 20 480 100 720 60 C960 20 1200 100 1440 60 L1500 110 L-60 110z" fill="rgba(255,255,255,.18)"/><path d="M0 80 C240 50 480 110 720 80 C960 50 1200 110 1440 80 L1500 110 L-60 110z" fill="#f4f8f6"/></svg></section>' +
    '<section class="wrap lift"><div class="grid g4">' + PARTS.map(p => { const pr = partProg(p); return '<a class="card part-card reveal" href="#phan-' + p.id + '"><span class="blob pill-' + p.col + '"></span><span class="pic pill-' + p.col + '">' + I(p.ic) + '</span><span class="pnum c-' + p.col + '">' + p.code + '</span><h3 style="margin:0">' + esc(p.t) + '</h3><p class="small" style="margin:0">' + esc(p.sub) + '</p><div class="meta"><span>' + I('book') + p.lessons.length + ' bài</span><span>' + I('puzzle') + EXL.filter(e => e.p === p.id).length + ' thực hành</span><span>' + pr + '%</span></div><div class="bar"><i class="pill-' + p.col + '" style="width:' + pr + '%"></i></div></a>'; }).join('') + '</div></section>' +
    '<section class="sec"><div class="wrap"><div class="sec-h"><div><h2>Tiến độ của bạn</h2><p>Lưu trên máy này – không gửi đi đâu.</p></div><a class="btn ghost" href="#xacnhan">' + I('badge') + 'Giấy xác nhận</a></div><div class="grid g3">' +
    [['book', 'Bài học đã xong', readN() + '/' + nL, readN() * 100 / nL, '#0f766e'], ['puzzle', 'Bài thực hành đạt', exDoneN() + '/' + nE, exDoneN() * 100 / nE, '#ea580c'], ['award', 'Kiểm tra cuối khoá', st.exam ? st.exam.s + '/20' : 'Chưa làm', st.exam ? st.exam.s * 5 : 0, '#7c3aed']].map(x => '<div class="card reveal" style="display:flex;gap:14px;align-items:center"><div class="ring" style="--v:' + Math.round(x[3]) + ';width:84px;height:84px;background:conic-gradient(' + x[4] + ' calc(var(--v)*1%),#e2e8f0 0)"><b style="width:64px;height:64px;font-size:1rem">' + Math.round(x[3]) + '%</b></div><div><span class="small">' + I(x[0]) + ' ' + x[1] + '</span><h3 style="margin:2px 0 0">' + x[2] + '</h3></div></div>').join('') + '</div></div></section>' +
    '<section class="sec tight"><div class="wrap"><div class="sec-h"><div><h2>Thực hành nổi bật</h2><p>Làm ngay trên trình duyệt, chấm điểm tức thì.</p></div><a class="btn" href="#thuchanh">Xem cả ' + nE + ' bài ' + I('right') + '</a></div><div class="exgrid">' + ['prompt6', 'aogiac', 'vneid-dk', 'luadao', 'dvc-nop', 'svl-pa'].map(id => excard(A.exById(id))).join('') + '</div></div></section>' +
    '<section class="sec"><div class="wrap grid g2"><div class="card reveal"><h3>' + I('scale') + ' Văn bản đã được rà soát hiệu lực</h3><p>Mọi luật, nghị định nhắc trong giáo trình đều có trạng thái <span class="chip ok">còn hiệu lực</span> <span class="chip no">hết hiệu lực</span> <span class="chip warn">có thời hạn</span> – rà soát đến <b>' + LAW.checked + '</b>.</p><a class="btn ghost" href="#tracuu">Mở sổ tra cứu</a></div><div class="card reveal"><h3>' + I('alert') + ' ' + window.UPDATES.length + ' điểm trong tài liệu gốc cần cập nhật</h3><p>Ví dụ: chọn cơ quan tiếp nhận nay chỉ còn <b>Tỉnh Vĩnh Long → Xã Tân Xuân</b>; tài khoản mức 2 cấp tại Công an cấp xã; tài khoản bị khoá nếu số điện thoại không chính chủ.</p><a class="btn ghost" href="#tracuu-capnhat">Xem danh sách</a></div></div></section>';
  const xp = $('#xp'); xp && (xp.textContent = st.xp);
};
function excard(e){
  const p = A.partOf(e.p), d = st.ex[e.id];
  return '<a class="excard reveal" href="#th-' + e.id + '">' + (d ? '<span class="ok">' + I('check') + '</span>' : '') + '<div class="top"><span class="ti pill-' + p.col + '">' + I(e.ic) + '</span><span class="chip">' + p.code + '</span></div><h4>' + esc(e.t) + '</h4><p>' + esc(e.d) + '</p><div class="ft"><span>' + I('clock') + ' ' + e.m + ' phút</span><span>' + (d ? '<b style="color:var(--ok)">Đạt ' + d.pct + '%</b>' : 'Chưa làm') + '</span></div></a>';
}

/* ---------- CHƯƠNG TRÌNH ---------- */
P.chuongtrinh = function(page){
  const C = window.COURSE;
  page.innerHTML = head('', [['Chương trình']], 'Chương trình tập huấn', 'Bốn phần học – mỗi bài có phần đọc ngắn, câu lệnh hoặc quy trình mẫu và bài thực hành làm ngay trên web.') +
    '<section class="sec"><div class="wrap"><h2>Ba trọng tâm</h2><div class="grid g3">' + C.goals.map(g => '<div class="card reveal tile"><span class="ti pill-p3">' + I(g[0]) + '</span><div><h4>' + g[1] + '</h4><p class="small" style="margin:0">' + g[2] + '</p></div></div>').join('') + '</div>' +
    '<h2 style="margin-top:30px">Bốn năng lực đầu ra (Phần 1)</h2><div class="grid g4">' + C.outputs.map((o, i) => '<div class="card reveal tile"><span class="ti pill-p1">' + I(o[0]) + '</span><div><h4>' + (i + 1) + '. ' + o[1] + '</h4><p class="small" style="margin:0">' + o[2] + '</p></div></div>').join('') + '</div>' +
    '<h2 style="margin-top:30px">Lộ trình chi tiết</h2>' + PARTS.map(p => '<div class="card reveal" style="margin-bottom:14px"><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><span class="ti pill-' + p.col + '" style="width:48px;height:48px;border-radius:14px;display:grid;place-items:center;color:#fff">' + I(p.ic) + '</span><div style="flex:1;min-width:200px"><span class="small c-' + p.col + '" style="font-weight:800">' + p.code + '</span><h3 style="margin:0">' + esc(p.t) + '</h3></div><a class="btn small" href="#phan-' + p.id + '">Mở phần học ' + I('right') + '</a></div><div class="tblw" style="margin-top:12px"><table class="tbl"><tr><th>Bài</th><th>Thời lượng</th><th>Thực hành trên web</th></tr>' + p.lessons.map(l => '<tr><td><a href="#bai-' + l.id + '">' + l.id.replace('-', '.') + '. ' + esc(l.t) + '</a></td><td>' + l.m + ' phút</td><td>' + l.b.filter(b => b.t === 'ex').map(b => { const e = A.exById(b.x); return e ? '<a class="chip info" href="#th-' + e.id + '" style="margin:2px">' + esc(e.t) + '</a>' : ''; }).join('') + '</td></tr>').join('') + '</table></div></div>').join('') +
    '<div class="note warn">' + I('alert') + '<div><p><b>Quy ước an toàn:</b> chỉ dùng dữ liệu giả định trên lớp; mọi giao diện ứng dụng trong giáo trình là bản mô phỏng tập huấn, không phải trang thật.</p></div></div></div></section>';
};

/* ---------- PHẦN HỌC ---------- */
P.phan = function(page, param){
  const p = A.partOf(+param) || PARTS[0], ex = EXL.filter(e => e.p === p.id);
  page.innerHTML = head(p.col, [['Chương trình', '#chuongtrinh'], [p.code]], esc(p.code + ' · ' + p.t), esc(p.sub)) +
    '<section class="sec"><div class="wrap"><div class="sec-h"><h2>Bài học</h2><span class="chip">' + partProg(p) + '% hoàn thành</span></div><div class="grid g2">' + p.lessons.map((l, i) => '<a class="card tile reveal" href="#bai-' + l.id + '" style="text-decoration:none"><span class="ti pill-' + p.col + '" style="font-weight:900">' + (st.read[l.id] ? I('check') : (i + 1)) + '</span><div><h4>' + esc(l.t) + '</h4><p class="small" style="margin:0">' + l.m + ' phút · ' + l.b.filter(b => b.t === 'ex').length + ' bài thực hành' + (st.read[l.id] ? ' · <b style="color:var(--ok)">Đã học</b>' : '') + '</p></div></a>').join('') + '</div>' +
    '<div class="sec-h" style="margin-top:30px"><h2>Thực hành của ' + p.code + '</h2></div><div class="exgrid">' + ex.map(excard).join('') + '</div></div></section>';
};

/* ---------- BÀI HỌC ---------- */
P.bai = function(page, param){
  const L = allLessons(), idx = Math.max(0, L.findIndex(l => l.id === param)), l = L[idx], p = l.part;
  const tocItem = (x, i) => '<a href="#bai-' + x.id + '" class="' + (x.id === l.id ? 'on ' : '') + (st.read[x.id] ? 'done' : '') + '"><span class="n">' + (st.read[x.id] ? '✓' : i + 1) + '</span><span>' + esc(x.t) + '</span></a>';
  const prev = L[idx - 1], next = L[idx + 1];
  page.innerHTML = head(p.col, [[p.code, '#phan-' + p.id], ['Bài ' + l.id.replace('-', '.')]], esc(l.t), I('clock') + ' ' + l.m + ' phút · ' + esc(p.t)) +
    '<div class="wrap reader"><aside class="toc"><div><div class="toc-m">' + p.lessons.map((x, i) => '<a href="#bai-' + x.id + '" class="' + (x.id === l.id ? 'on' : '') + '">' + (i + 1) + '. ' + esc(x.t.split(' ').slice(0, 4).join(' ')) + '…</a>').join('') + '</div><div class="toc-d"><b class="small" style="display:block;margin:0 0 6px 12px">' + esc(p.code) + '</b>' + p.lessons.map(tocItem).join('') + '<a href="#thuchanh-' + p.id + '" style="margin-top:8px"><span class="n">' + I('puzzle') + '</span><span>Thực hành ' + esc(p.code) + '</span></a></div></div></aside>' +
    '<article class="lesson"><div class="card">' + blocks(l.b) +
    '<div class="note ok" style="margin-top:26px">' + I('check') + '<div><p style="margin:0">' + (st.read[l.id] ? '<b>Bạn đã hoàn thành bài này.</b>' : 'Đọc xong và làm thực hành? Đánh dấu để lưu tiến độ.') + '</p></div></div><div class="btnrow">' + (st.read[l.id] ? '' : '<button class="btn" data-done>' + I('check') + 'Hoàn thành bài học</button>') + '</div>' +
    '<div class="lnav">' + (prev ? '<a class="btn ghost" href="#bai-' + prev.id + '">' + I('left') + 'Bài trước</a>' : '<span></span>') + (next ? '<a class="btn" href="#bai-' + next.id + '">Bài tiếp: ' + esc(next.t.split(' ').slice(0, 5).join(' ')) + '… ' + I('right') + '</a>' : '<a class="btn sun" href="#kiemtra">Làm bài kiểm tra ' + I('right') + '</a>') + '</div></div></article></div>';
  const om = $('.toc-m a.on', page); if (om) om.parentNode.scrollLeft = om.offsetLeft - 20;
  page.addEventListener('click', e => { const c = e.target.closest('[data-copy]'); if (c) A.copy(c.closest('.prompt').querySelector('pre').textContent); });
  const d = $('[data-done]', page); if (d) d.onclick = () => { st.read[l.id] = 1; A.save(); A.addXP(10, 'Hoàn thành bài học'); A.SND.win(); if (next) location.hash = '#bai-' + next.id; else location.hash = '#kiemtra'; };
};

/* ---------- PHÒNG THỰC HÀNH ---------- */
P.thuchanh = function(page, param){
  const f = +param || 0;
  page.innerHTML = head('', [['Phòng thực hành']], 'Phòng thực hành', EXL.length + ' bài làm ngay trên web: kéo thả, mô phỏng điện thoại, cổng dịch vụ công, AI mô phỏng. Đã đạt <b>' + exDoneN() + '/' + EXL.length + '</b>.') +
    '<section class="sec"><div class="wrap"><div class="chips" style="margin-bottom:16px" data-f><button data-p="0" class="' + (!f ? 'on' : '') + '">Tất cả</button>' + PARTS.map(p => '<button data-p="' + p.id + '" class="' + (f === p.id ? 'on' : '') + '">' + p.code + ' · ' + p.short + '</button>').join('') + '</div>' +
    PARTS.filter(p => !f || f === p.id).map(p => '<div class="sec-h" style="margin-top:12px"><h2 style="display:flex;gap:10px;align-items:center"><span class="ti pill-' + p.col + '" style="width:40px;height:40px;border-radius:12px;color:#fff;display:grid;place-items:center">' + I(p.ic) + '</span>' + p.code + ' · ' + esc(p.short) + '</h2><span class="chip">' + EXL.filter(e => e.p === p.id && st.ex[e.id]).length + '/' + EXL.filter(e => e.p === p.id).length + ' đã đạt</span></div><div class="exgrid" style="margin-bottom:22px">' + EXL.filter(e => e.p === p.id).map(excard).join('') + '</div>').join('') + '</div></section>';
  $('[data-f]', page).onclick = e => { const b = e.target.closest('[data-p]'); if (b) location.replace('#thuchanh' + (+b.dataset.p ? '-' + b.dataset.p : '')); };
};

/* ---------- MỘT BÀI THỰC HÀNH ---------- */
P.th = function(page, param){
  const i = EXL.findIndex(e => e.id === param); if (i < 0) { location.replace('#thuchanh'); return; }
  const e = EXL[i], p = A.partOf(e.p), les = A.lessonOfEx(e.id), prev = EXL[i - 1], next = EXL[i + 1];
  page.innerHTML = '<div class="exbar"><div class="wrap exbar-in"><button class="btn small ghost" data-back="#thuchanh">' + I('left') + 'Quay lại</button><div class="t"><span class="ti pill-' + p.col + '" style="width:34px;height:34px;border-radius:10px;color:#fff;display:grid;place-items:center;flex:none">' + I(e.ic) + '</span><span>' + esc(e.t) + '<small>' + p.code + ' · ' + e.m + ' phút · Bài ' + (i + 1) + '/' + EXL.length + ' <span data-best></span></small></span></div>' +
    (les ? '<a class="btn small ghost hide-m" href="#bai-' + les.id + '" title="' + esc(les.t) + '">' + I('book') + 'Bài học</a>' : '') + '<a class="btn small ghost hide-m" href="#thuchanh">' + I('puzzle') + 'Tất cả bài</a>' + (prev ? '<a class="btn small ghost" href="#th-' + prev.id + '" aria-label="Bài thực hành trước">' + I('left') + '</a>' : '') + (next ? '<a class="btn small" href="#th-' + next.id + '" aria-label="Bài thực hành tiếp">' + I('right') + '</a>' : '') + '</div></div><div class="wrap exstage"><div data-stage></div></div>';
  bindBack(page);
  const stage = $('[data-stage]', page); let clean = null;
  const ctx = { id: e.id,
    retry(){ clean && clean(); clean = window.EX[e.id](stage, ctx); window.scrollTo({ top: 0, behavior: 'smooth' }); },
    next(){ location.hash = next ? '#th-' + next.id : '#kiemtra'; },
    updateBar(){ const d = st.ex[e.id]; $('[data-best]', page).innerHTML = d ? '· <b style="color:var(--ok)">Tốt nhất ' + d.pct + '%</b>' : ''; } };
  ctx.updateBar();
  clean = window.EX[e.id](stage, ctx);
  return () => clean && clean();
};

/* ---------- TRA CỨU VĂN BẢN ---------- */
P.tracuu = function(page, param){
  page.innerHTML = head('', [['Tra cứu văn bản']], 'Sổ tra cứu hiệu lực văn bản', 'Rà soát đến ngày <b>' + LAW.checked + '</b>. Trạng thái chỉ để học tập – luôn mở bản gốc trên Cơ sở dữ liệu quốc gia về văn bản pháp luật trước khi viện dẫn.') +
    '<section class="sec"><div class="wrap"><div class="note law">' + I('scale') + '<div><p><b>Ba bước kiểm tra một văn bản trước khi đưa vào dự thảo:</b> (1) tra số hiệu trên vbpl.moj.gov.vn hoặc congbao.chinhphu.vn; (2) xem ô “Tình trạng hiệu lực” và các văn bản sửa đổi, thay thế; (3) nếu đã sửa đổi nhiều lần, dùng <b>văn bản hợp nhất</b> mới nhất.</p></div></div>' +
    '<div class="filters"><div class="searchbox">' + I('search') + '<input data-q placeholder="Tìm số hiệu, tên văn bản…" aria-label="Tìm văn bản"></div><div class="chips" data-g><button data-v="" class="on">Tất cả</button>' + Object.keys(LAW.groups).map(g => '<button data-v="' + g + '">' + LAW.groups[g] + '</button>').join('') + '</div></div><div class="chips" data-s style="margin-bottom:14px"><button data-v="" class="on">Mọi trạng thái</button>' + Object.keys(LAW.status).map(s => '<button data-v="' + s + '">' + LAW.status[s] + '</button>').join('') + '</div><div class="lawlist" data-list></div>' +
    '<h2 id="capnhat" style="margin-top:34px">Những điểm trong tài liệu gốc cần cập nhật khi giảng</h2><div class="tblw"><table class="tbl"><tr><th>Vị trí</th><th>Nội dung cũ</th><th>Cập nhật</th></tr>' + window.UPDATES.map(u => '<tr><td><b>' + u.s + '</b></td><td>' + esc(u.old) + '</td><td>' + esc(u.fix) + (u.law ? ' <a class="lawchip ' + lawById(u.law).st + '" href="#tracuu-' + u.law + '"><i></i>' + lawById(u.law).no + '</a>' : '') + '</td></tr>').join('') + '</table></div></div></section>';
  let q = '', g = '', s = '';
  const draw = () => {
    const items = LAW.items.filter(x => (!g || x.g === g) && (!s || x.st === s) && (!q || A.norm(x.no + x.name + x.gist).includes(A.norm(q))));
    $('[data-list]', page).innerHTML = items.map(x => '<div class="lawitem ' + x.st + '" id="law-' + x.id + '"><div class="lh"><div><span class="no">' + esc(x.no) + '</span> – ' + esc(x.name) + '</div><span class="chip ' + ({ ok: 'ok', end: 'no', tran: 'warn', chk: 'vio' }[x.st]) + '">' + LAW.status[x.st] + '</span></div><div class="dates"><span>Ban hành: ' + esc(x.ban) + '</span><span>Hiệu lực: ' + esc(x.hl) + '</span>' + (x.het ? '<span>' + (x.st === 'end' ? 'Hết hiệu lực: ' : 'Áp dụng đến: ') + esc(x.het) + '</span>' : '') + '<span>' + esc(LAW.groups[x.g]) + '</span></div><p style="margin:0 0 6px">' + esc(x.gist) + '</p><div class="src">Nguồn đối chiếu: ' + (x.src.length ? x.src.map(r => '<a href="' + r[1] + '" target="_blank" rel="noopener">' + esc(r[0]) + '</a>').join('') : '<a href="https://vbpl.moj.gov.vn" target="_blank" rel="noopener">Tra bản gốc trên vbpl.moj.gov.vn</a>') + '</div></div>').join('') || '<p>Không có văn bản phù hợp.</p>';
  };
  draw();
  $('[data-q]', page).oninput = e => { q = e.target.value; draw(); };
  $('[data-g]', page).onclick = e => { const b = e.target.closest('[data-v]'); if (!b) return; g = b.dataset.v; $$('[data-g] button', page).forEach(x => x.classList.toggle('on', x === b)); draw(); };
  $('[data-s]', page).onclick = e => { const b = e.target.closest('[data-v]'); if (!b) return; s = b.dataset.v; $$('[data-s] button', page).forEach(x => x.classList.toggle('on', x === b)); draw(); };
  if (param) setTimeout(() => { const el = param === 'capnhat' ? $('#capnhat', page) : $('#law-' + param, page); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('hi'); } }, 120);
};

/* ---------- KIỂM TRA CUỐI KHOÁ ---------- */
P.kiemtra = function(page){
  const Q = window.EXAM, ans = {}; let submitted = false;
  page.innerHTML = head('', [['Kiểm tra cuối khoá']], 'Kiểm tra cuối khoá', '20 câu trắc nghiệm bao quát 4 phần. Đạt từ <b>16/20</b>. ' + (st.exam ? 'Kết quả tốt nhất: <b>' + st.exam.s + '/20</b>.' : '')) +
    '<section class="sec"><div class="wrap" style="max-width:860px"><div data-qs>' + Q.map((q, i) => '<div class="q" data-i="' + i + '"><h4><span class="qn">Câu ' + (i + 1) + '</span><span>' + esc(q.q) + ' <span class="chip">' + A.partOf(q.p).code + '</span></span></h4><div class="opts">' + q.o.map((o, j) => '<button class="opt" data-j="' + j + '"><span class="lt">' + A.L[j] + '</span><span>' + esc(o) + '</span></button>').join('') + '</div><div data-fb></div></div>').join('') + '</div>' +
    '<div class="card" style="position:sticky;bottom:80px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px"><span>Đã trả lời <b data-n>0</b>/20</span><button class="btn big sun" data-sub>' + I('check') + 'Nộp bài</button></div><div data-res style="margin-top:16px"></div></div></section>';
  page.addEventListener('click', e => {
    const b = e.target.closest('.opt'); if (!b || submitted) return;
    const box = b.closest('.q'), i = +box.dataset.i; ans[i] = +b.dataset.j; $$('.opt', box).forEach(o => o.classList.toggle('sel', o === b)); A.SND.tap(); $('[data-n]', page).textContent = Object.keys(ans).length;
  });
  $('[data-sub]', page).onclick = () => {
    const n = Object.keys(ans).length; if (n < Q.length) { A.toast('Còn ' + (Q.length - n) + ' câu chưa trả lời'); const first = Q.findIndex((q, i) => ans[i] == null); $('.q[data-i="' + first + '"]', page).scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    submitted = true; let ok = 0;
    Q.forEach((q, i) => { const box = $('.q[data-i="' + i + '"]', page), g = ans[i] === q.a; if (g) ok++; $$('.opt', box).forEach((o, j) => { o.disabled = true; o.classList.remove('sel'); if (j === q.a) o.classList.add('right'); else if (j === ans[i]) o.classList.add('wrong'); }); $('[data-fb]', box).innerHTML = '<div class="fb ' + (g ? 'ok' : 'no') + '">' + I(g ? 'check' : 'alert') + '<div>' + esc(q.e) + '</div></div>'; });
    if (!st.exam || ok > st.exam.s) st.exam = { s: ok, t: Date.now() }; A.save();
    const pass = ok >= 16; if (pass) { A.SND.win(); A.confetti(); A.addXP(50, 'Hoàn thành kiểm tra'); } else A.SND.no();
    $('[data-sub]', page).disabled = true;
    $('[data-res]', page).innerHTML = '<div class="result' + (pass ? '' : ' mid') + '"><div class="medal">' + I(pass ? 'award' : 'flag') + '</div><div class="big">' + ok + '/20</div><p><b>' + (pass ? 'Đạt yêu cầu!' : 'Chưa đạt – cần từ 16/20.') + '</b> Xem giải thích dưới từng câu.</p><div class="btnrow" style="justify-content:center"><button class="btn ghost" data-re>' + I('refresh') + 'Làm lại</button><a class="btn sun" href="#xacnhan">' + I('badge') + 'Giấy xác nhận</a></div></div>';
    $('[data-re]', page).onclick = () => P.kiemtra(page);
    $('[data-res]', page).scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
};

/* ---------- GIẤY XÁC NHẬN ---------- */
P.xacnhan = function(page){
  const need = 15, okEx = exDoneN() >= need, okExam = st.exam && st.exam.s >= 16;
  page.innerHTML = head('', [['Giấy xác nhận']], 'Giấy xác nhận hoàn thành', 'Điều kiện: đạt <b>' + need + '/' + EXL.length + '</b> bài thực hành và kiểm tra cuối khoá từ <b>16/20</b>.') +
    '<section class="sec"><div class="wrap two"><div class="card"><h3>Điều kiện</h3><ul class="checks"><li class="' + (okEx ? 'on' : '') + '"><span class="d">' + (okEx ? '✓' : '') + '</span>Bài thực hành đạt: ' + exDoneN() + '/' + need + '</li><li class="' + (okExam ? 'on' : '') + '"><span class="d">' + (okExam ? '✓' : '') + '</span>Kiểm tra cuối khoá: ' + (st.exam ? st.exam.s + '/20' : 'chưa làm') + '</li></ul>' +
    '<div class="field" style="margin-top:14px"><label for="cn">Họ và tên</label><input id="cn" data-n value="' + esc(st.name) + '" placeholder="Nhập họ tên"></div><div class="field"><label for="cu">Đơn vị / chức danh</label><input id="cu" data-u value="' + esc(st.unit) + '" placeholder="VD: Văn phòng HĐND – UBND xã"></div><div class="btnrow"><button class="btn" data-mk ' + (okEx && okExam ? '' : 'disabled') + '>' + I('badge') + 'Tạo giấy xác nhận</button><button class="btn ghost" data-dl hidden>' + I('download') + 'Tải ảnh PNG</button></div>' + (okEx && okExam ? '' : '<p class="small" style="margin-top:10px">Hoàn thành các điều kiện để mở khoá. <a href="#thuchanh">Vào Phòng thực hành</a> · <a href="#kiemtra">Làm kiểm tra</a></p>') + '</div><div class="cert"><canvas width="1400" height="990" data-cv></canvas></div></div></section>';
  const cv = $('[data-cv]', page), c = cv.getContext('2d');
  const draw = () => {
    const W = 1400, H = 990, name = $('[data-n]', page).value.trim() || 'Họ và tên học viên', unit = $('[data-u]', page).value.trim() || 'Đơn vị công tác';
    const g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#ecfdf5'); g.addColorStop(1, '#e0f2fe'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.strokeStyle = '#0f766e'; c.lineWidth = 14; c.strokeRect(30, 30, W - 60, H - 60); c.strokeStyle = '#f59e0b'; c.lineWidth = 3; c.strokeRect(56, 56, W - 112, H - 112);
    c.fillStyle = '#0ea5e9'; c.globalAlpha = .12; c.beginPath(); c.moveTo(0, H - 160); c.bezierCurveTo(400, H - 230, 900, H - 90, W, H - 180); c.lineTo(W, H); c.lineTo(0, H); c.fill(); c.globalAlpha = 1;
    c.textAlign = 'center'; c.fillStyle = '#0f766e'; c.font = '800 30px "Be Vietnam Pro",Arial'; c.fillText('SAIGONLAB · TẬP HUẤN KỸ NĂNG SỐ', W / 2, 150);
    c.fillStyle = '#0f172a'; c.font = '900 76px "Be Vietnam Pro",Arial'; c.fillText('GIẤY XÁC NHẬN', W / 2, 260);
    c.font = '500 30px "Be Vietnam Pro",Arial'; c.fillStyle = '#334155'; c.fillText('Xác nhận Ông/Bà', W / 2, 340);
    c.font = '800 64px "Be Vietnam Pro",Arial'; c.fillStyle = '#b45309'; c.fillText(name, W / 2, 430);
    c.font = '500 30px "Be Vietnam Pro",Arial'; c.fillStyle = '#334155'; c.fillText(unit + ' – Xã Tân Xuân, tỉnh Vĩnh Long', W / 2, 490);
    c.fillText('đã hoàn thành chương trình tự học tương tác', W / 2, 560);
    c.font = '800 38px "Be Vietnam Pro",Arial'; c.fillStyle = '#0f766e'; c.fillText('KỸ NĂNG SỐ CHO CÁN BỘ XÃ', W / 2, 615);
    c.font = '500 26px "Be Vietnam Pro",Arial'; c.fillStyle = '#475569'; c.fillText('AI cơ bản · VNeID & Sổ sức khỏe điện tử · Dịch vụ công trực tuyến · Smart Vĩnh Long', W / 2, 660);
    c.fillText('Bài thực hành đạt: ' + exDoneN() + '/' + EXL.length + '   ·   Kiểm tra cuối khoá: ' + (st.exam ? st.exam.s : 0) + '/20', W / 2, 720);
    const d = new Date(); c.font = 'italic 500 26px "Be Vietnam Pro",Arial'; c.fillText('Ngày ' + d.getDate() + ' tháng ' + (d.getMonth() + 1) + ' năm ' + d.getFullYear(), W - 330, 810);
    c.font = '400 20px "Be Vietnam Pro",Arial'; c.fillStyle = '#64748b'; c.fillText('Giấy xác nhận tự học, do giáo trình tạo trên máy người học – không thay thế chứng chỉ do cơ quan có thẩm quyền cấp.', W / 2, 905);
  };
  draw();
  $('[data-n]', page).oninput = $('[data-u]', page).oninput = () => { st.name = $('[data-n]', page).value; st.unit = $('[data-u]', page).value; A.save(); draw(); };
  $('[data-mk]', page).onclick = () => { if (!$('[data-n]', page).value.trim()) { A.toast('Nhập họ tên trước'); return; } draw(); A.confetti(); A.SND.win(); $('[data-dl]', page).hidden = false; };
  $('[data-dl]', page).onclick = () => cv.toBlob(b => A.saveFile('giay-xac-nhan-ky-nang-so-tan-xuan.png', b));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
};
})();
