/* =========================================================
   ĐỊNH TUYẾN & KHUNG TRANG – quay lại đúng trang, đúng vị trí đang đọc
   ========================================================= */
(function(){
const A = window.APP, st = A.st, $ = A.$, $$ = A.$$, I = window.ICON, P = window.PAGES;
const NAV = [
  { r: 'home', t: 'Trang chủ', ic: 'home', tab: 1 },
  { r: 'chuongtrinh', t: 'Bài học', ic: 'book', tab: 1 },
  { r: 'thuchanh', t: 'Thực hành', ic: 'puzzle', tab: 1 },
  { r: 'tracuu', t: 'Tra cứu', ic: 'scale', tab: 1 },
  { r: 'kiemtra', t: 'Kiểm tra', ic: 'award', tab: 1 },
  { r: 'xacnhan', t: 'Xác nhận', ic: 'badge' }
];
const PARTNAV = window.PARTS.map(p => ({ r: 'phan-' + p.id, t: p.code + ' · ' + p.short, ic: p.ic }));
const link = n => '<a href="#' + n.r + '" data-r="' + n.r + '">' + I(n.ic) + '<span>' + n.t + '</span></a>';
$('#nav').innerHTML = NAV.map(link).join('');
$('#drawerNav').innerHTML = NAV.slice(0, 2).map(link).join('') + PARTNAV.map(link).join('') + NAV.slice(2).map(link).join('');
$('#tabbar').innerHTML = NAV.filter(n => n.tab).map(link).join('');
$('#footLinks').innerHTML = NAV.concat(PARTNAV).map(n => '<li><a href="#' + n.r + '">' + n.t + '</a></li>').join('');
$('#footCheck').textContent = 'Trạng thái hiệu lực văn bản rà soát đến ' + window.LAW.checked + '. Đối chiếu bản gốc trước khi áp dụng.';
const drawer = $('#drawer');
$('#menuBtn').innerHTML = I('menu');
$$('[data-close]', drawer).forEach(b => { if (b.tagName === 'BUTTON') b.innerHTML = I('x'); b.onclick = closeDrawer; });
$('#menuBtn').onclick = () => { drawer.hidden = false; $('#menuBtn').setAttribute('aria-expanded', 'true'); const f = $('#drawerNav a', drawer); f && f.focus(); };
function closeDrawer(){ drawer.hidden = true; $('#menuBtn').setAttribute('aria-expanded', 'false'); }
drawer.addEventListener('click', e => { if (e.target.closest('#drawerNav a')) closeDrawer(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) closeDrawer(); });
function sndUI(){ const b = $('#sndBtn'); b.innerHTML = I(st.snd ? 'volume' : 'mute'); b.setAttribute('aria-pressed', st.snd); }
$('#sndBtn').onclick = () => { st.snd = !st.snd; A.save(); sndUI(); A.toast(st.snd ? 'Đã bật âm thanh' : 'Đã tắt âm thanh'); };
const FONTS = ['', 'big', 'huge'];
function fontUI(){ document.documentElement.classList.remove('big', 'huge'); if (FONTS[st.font]) document.documentElement.classList.add(FONTS[st.font]); $('#fontBtn').innerHTML = I('text'); }
$('#fontBtn').onclick = () => { st.font = (st.font + 1) % 3; A.save(); fontUI(); A.toast(['Cỡ chữ thường', 'Cỡ chữ lớn', 'Cỡ chữ rất lớn'][st.font]); };
sndUI(); fontUI(); A.refreshXP();
const ROUTES = ['home', 'chuongtrinh', 'phan', 'bai', 'thuchanh', 'th', 'tracuu', 'kiemtra', 'xacnhan'];
const GROUP = { phan: 'chuongtrinh', bai: 'chuongtrinh', th: 'thuchanh' };
let cleanup = null;
const NAVSTACK = [], SCROLL = {}; let curHash = null;
try { history.scrollRestoration = 'manual'; } catch(e) {}
A.canBack = () => NAVSTACK.length > 1; A._nav = { NAVSTACK, SCROLL };
function parse(){
  const h = (location.hash || '#home').replace(/^#\/?/, '');
  const k = h.indexOf('-');
  const route = k < 0 ? h : h.slice(0, k), param = k < 0 ? undefined : h.slice(k + 1);
  return { route: ROUTES.includes(route) ? route : 'home', param };
}
function render(){
  const { route, param } = parse();
  const h = location.hash || '#home';
  if (curHash !== null) SCROLL[curHash] = window.scrollY;
  let back = false;
  if (NAVSTACK.length > 1 && NAVSTACK[NAVSTACK.length - 2] === h) { NAVSTACK.pop(); back = true; }
  else if (NAVSTACK[NAVSTACK.length - 1] !== h) NAVSTACK.push(h);
  curHash = h;
  if (typeof cleanup === 'function') { try { cleanup(); } catch(e) {} }
  cleanup = null; A.TTS.stop();
  const main = $('#view');
  const page = document.createElement('div'); page.className = 'page';
  main.innerHTML = ''; main.appendChild(page);
  try { cleanup = P[route](page, param); } catch(e) { console.error(e); page.innerHTML = '<div class="wrap" style="padding:40px 20px"><div class="note no">Không mở được trang: ' + A.esc(e.message) + '</div></div>'; }
  const navR = GROUP[route] || route;
  $$('#nav a, #tabbar a').forEach(a => a.classList.toggle('on', a.dataset.r === navR));
  $$('#drawerNav a').forEach(a => a.classList.toggle('on', a.dataset.r === route || a.dataset.r === route + '-' + param));
  const n = NAV.find(x => x.r === navR);
  document.title = (route === 'home' ? 'Kỹ năng số cho cán bộ xã' : (n ? n.t : '') + ' – Kỹ năng số cán bộ xã') + ' | Xã Tân Xuân, Vĩnh Long';
  window.scrollTo(0, 0);
  if (back && SCROLL[h]) { const y = SCROLL[h]; [60, 250, 600].forEach(t => setTimeout(() => { if ((location.hash || '#home') === h) window.scrollTo(0, y); }, t)); }
  A.reveal(page);
  main.focus({ preventScroll: true });
}
window.addEventListener('hashchange', render);
render();
})();
