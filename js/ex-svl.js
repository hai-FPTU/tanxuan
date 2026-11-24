/* =========================================================
   PHẦN 4 – SMART VĨNH LONG (giao diện mô phỏng trung tính)
   ========================================================= */
(function(){
const A = window.APP, st = A.st, $ = A.$, $$ = A.$$, esc = A.esc, I = window.ICON, EX = window.EX, F = window.FAKE;
const XA = ['Xã Ba Tri', 'Xã Bảo Thạnh', 'Xã Mỹ Chánh Hòa', 'Xã Tân Thủy', 'Xã Tân Xuân', 'Xã Thạnh Phước'];
const sin = (id, label, ph, type) => '<div class="sin" data-w="' + id + '"><label for="v' + id + '">' + label + '</label><input id="v' + id + '" data-in="' + id + '" ' + (type ? 'type="' + type + '"' : '') + ' placeholder="' + (ph || '') + '" autocomplete="off"><span class="em"></span></div>';
const v = (b, id) => ($('[data-in="' + id + '"]', b) || {}).value || '';
const er = (b, id, m) => { const w = $('[data-w="' + id + '"]', b); if (!w) return; w.classList.toggle('err', !!m); $('.em', w).textContent = m || ''; };
const otpBox = '<div class="otpbox">' + Array.from({ length: 6 }, (_, i) => '<input maxlength="1" inputmode="numeric" data-o="' + i + '">').join('') + '</div>';
const bindO = b => { const os = $$('[data-o]', b); os.forEach((o, i) => o.addEventListener('input', () => { o.value = o.value.replace(/\D/g, '').slice(-1); if (o.value && os[i + 1]) os[i + 1].focus(); })); return () => os.map(o => o.value).join(''); };

/* ---------- Đăng ký, đăng nhập ---------- */
EX['svl-dk'] = function(stage, ctx){
  let otp = '', pw = '';
  return A.phoneSim(stage, ctx, { cls: 'app-svl', title: 'Ứng dụng của tỉnh', sub: 'Mô phỏng Smart Vĩnh Long', mission: ['Hướng dẫn công dân giả định đăng ký tài khoản và đăng nhập.', 'Địa chỉ thường trú: **Tỉnh Vĩnh Long → Xã Tân Xuân** (không còn cấp huyện).'], tip: 'Tin nhắn OTP thật đến từ tổng đài VINHLONG_SO; trong bài là tin mô phỏng.',
    lesson: 'Đăng nhập bằng số điện thoại hoặc số CCCD và mật khẩu đã đặt.', doneTitle: 'Đã đăng nhập', doneText: 'Người dân có thể gửi phản ánh hiện trường, tra cứu tiện ích.',
    steps: [
      { t: 'Mở mục Tài khoản', c: 'Ứng dụng đã cài từ App Store / Google Play (tên “Smart Vĩnh Long”). Chọn **Tài khoản**.', r(s){
        s.body.innerHTML = '<div class="pcard" style="background:linear-gradient(135deg,#ccfbf1,#e0f2fe)"><b>Bản tin</b><br><small>Thông báo · Cảnh báo · Chính sách (mô phỏng)</small></div><div class="homegrid">' + [['Phản ánh hiện trường', 'pin'], ['Dịch vụ công', 'file'], ['Y tế', 'hospital'], ['Giáo dục', 'cap'], ['Tin tức', 'mail'], ['Tài khoản', 'user']].map(x => '<button ' + (x[0] === 'Tài khoản' ? 'data-good' : 'data-bad') + '>' + I(x[1]) + x[0] + '</button>').join('') + '</div>';
        s.bad('Cần có tài khoản trước – chọn “Tài khoản”.'); s.on('[data-good]', () => s.ok()); } },
      { t: 'Chọn Đăng ký', c: 'Chưa có tài khoản → **Đăng ký**.', r(s){ s.body.innerHTML = '<div style="text-align:center;padding:16px">' + I('user') + '<h5>Tài khoản</h5></div>' + s.btn('Đăng nhập', false, 'alt') + s.btn('Đăng ký', true); s.bad('Chọn “Đăng ký”.'); s.on('[data-good]', () => s.ok()); } },
      { t: 'Nhập thông tin, kiểm tra', c: 'Nhập **đầy đủ, chính xác** họ tên, số điện thoại, số CCCD (giả định) → **Kiểm tra thông tin**.', r(s){
        s.side.innerHTML = '<div class="card pad-s"><h4>' + I('card') + ' Thông tin giả định</h4>Họ tên: <b>' + F.name + '</b><br>SĐT: <b>' + F.phoneShow + '</b><br>Số CCCD: <b>' + F.idShow + '</b></div>';
        s.body.innerHTML = '<h5>Đăng ký tài khoản</h5>' + sin('ten', 'Họ và tên') + sin('ph', 'Số điện thoại', '', 'tel') + sin('id', 'Số CCCD', '', 'tel') + s.btn('Kiểm tra thông tin', true);
        s.on('[data-good]', () => { const a = v(s.body, 'ten').trim().toUpperCase() === F.name, b = v(s.body, 'ph').replace(/\s/g, '') === F.phone, c = v(s.body, 'id').replace(/\s/g, '') === F.id; er(s.body, 'ten', a ? '' : 'Chưa khớp'); er(s.body, 'ph', b ? '' : 'Chưa khớp'); er(s.body, 'id', c ? '' : 'Chưa khớp'); a && b && c ? s.ok() : s.fail('Kiểm tra lại thông tin giả định ở bên phải. Số điện thoại phải chính xác để nhận OTP.'); }); } },
      { t: 'Xác thực OTP', c: 'Nhập mã OTP gửi từ tổng đài **VINHLONG_SO** (mô phỏng) → **Đăng ký**.', r(s){ otp = String(Math.floor(100000 + Math.random() * 899999));
        s.body.innerHTML = '<h5>Xác thực OTP</h5><p class="small">Mã đã gửi tới ' + F.phoneShow + '</p>' + otpBox + s.btn('Đăng ký', true) + '<button class="sbtn alt" data-re>Gửi lại mã</button>';
        const g = bindO(s.body), n = () => A.notif(s.screen, '<span class="nic" style="background:#0d9488">' + I('sms') + '</span><div><b>VINHLONG_SO · mô phỏng</b>Ma OTP cua ban la <span class="code" style="color:#0d9488">' + otp + '</span></div>', '', 9000);
        n(); $('[data-re]', s.body).onclick = n; s.on('[data-good]', () => g() === otp ? s.ok() : s.fail('Mã OTP chưa đúng.')); } },
      { t: 'Giới tính, địa chỉ, mật khẩu', c: 'Chọn giới tính; địa chỉ thường trú **Tỉnh Vĩnh Long → Xã Tân Xuân**, chi tiết “Ấp Mẫu 1”; đặt mật khẩu → **Đăng ký**.', r(s){
        s.body.innerHTML = '<h5>Hoàn thiện thông tin</h5><div class="sin" data-w="gt"><label>Giới tính</label><select data-in="gt"><option value="">– Chọn –</option><option>Nam</option><option>Nữ</option></select><span class="em"></span></div><div class="sin" data-w="tinh"><label>Tỉnh/Thành phố</label><select data-in="tinh"><option value="">– Chọn –</option><option>Tỉnh Vĩnh Long</option><option>Tỉnh Bến Tre (cũ)</option></select><span class="em"></span></div><div class="sin" data-w="xa"><label>Xã/Phường</label><select data-in="xa"><option value="">– Chọn –</option>' + XA.map(x => '<option>' + x + '</option>').join('') + '</select><span class="em"></span></div>' + sin('ct', 'Địa chỉ chi tiết', 'Ấp…') + sin('p1', 'Mật khẩu', 'ít nhất 8 ký tự', 'password') + sin('p2', 'Nhập lại mật khẩu', '', 'password') + s.btn('Đăng ký', true);
        s.on('[data-good]', () => { let bad = 0;
          er(s.body, 'gt', v(s.body, 'gt') === 'Nam' ? '' : (bad++, 'Ông Mẫu là nam')); er(s.body, 'tinh', v(s.body, 'tinh') === 'Tỉnh Vĩnh Long' ? '' : (bad++, 'Từ 01/7/2025: Tỉnh Vĩnh Long')); er(s.body, 'xa', v(s.body, 'xa') === 'Xã Tân Xuân' ? '' : (bad++, 'Chọn Xã Tân Xuân'));
          er(s.body, 'ct', /ấp mẫu 1/i.test(v(s.body, 'ct')) ? '' : (bad++, 'Ghi: Ấp Mẫu 1'));
          const p = v(s.body, 'p1'); er(s.body, 'p1', (p.length >= 8 && /\d/.test(p) && /[a-zA-Z]/.test(p)) ? '' : (bad++, 'Tối thiểu 8 ký tự, có chữ và số')); er(s.body, 'p2', p === v(s.body, 'p2') ? '' : (bad++, 'Không khớp'));
          if (bad) return s.fail('Còn ' + bad + ' ô chưa đúng – xem chữ đỏ.'); pw = p; s.ok(); }); } },
      { t: 'Đăng nhập', c: 'Đăng nhập bằng **số điện thoại hoặc số CCCD** và mật khẩu vừa đặt.', r(s){
        s.body.innerHTML = '<h5>Đăng nhập</h5>' + sin('u', 'Số điện thoại hoặc số CCCD', '', 'tel') + sin('pw', 'Mật khẩu', '', 'password') + s.btn('Đăng nhập', true);
        s.on('[data-good]', () => { const u = v(s.body, 'u').replace(/\s/g, ''); if (u !== F.phone && u !== F.id) return s.fail('Dùng số điện thoại hoặc số CCCD giả định.'); if (v(s.body, 'pw') !== pw) return s.fail('Mật khẩu chưa đúng với mật khẩu vừa đặt.'); st.forms.svl = true; A.save(); s.ok(); }); } }
    ] });
};

/* ---------- Ảnh hiện trường minh hoạ (SVG tự vẽ) ---------- */
const PH = {
  good: '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#bae6fd"/><rect y="62" width="100" height="38" fill="#a8a29e"/><rect x="70" y="18" width="5" height="60" fill="#475569"/><rect x="62" y="22" width="20" height="4" fill="#475569"/><text x="72" y="50" font-size="7" fill="#fff" text-anchor="middle" transform="rotate(-90 72 50)">12</text><ellipse cx="38" cy="72" rx="26" ry="11" fill="#57534e"/><circle cx="26" cy="66" r="7" fill="#16a34a"/><circle cx="40" cy="63" r="8" fill="#0ea5e9"/><circle cx="52" cy="68" r="6" fill="#f59e0b"/><rect x="30" y="58" width="8" height="10" fill="#e11d48"/><path d="M0 62 Q30 55 60 62" stroke="#0369a1" stroke-width="3" fill="none"/></svg>',
  blur: '<svg viewBox="0 0 100 100"><defs><filter id="bl"><feGaussianBlur stdDeviation="5"/></filter></defs><g filter="url(#bl)"><rect width="100" height="100" fill="#cbd5e1"/><ellipse cx="45" cy="65" rx="30" ry="14" fill="#57534e"/><circle cx="35" cy="60" r="8" fill="#16a34a"/></g><text x="50" y="94" font-size="8" text-anchor="middle" fill="#334155">ảnh mờ</text></svg>',
  face: '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#fde68a"/><circle cx="50" cy="38" r="16" fill="#f5d0a9"/><circle cx="44" cy="35" r="2" fill="#111"/><circle cx="56" cy="35" r="2" fill="#111"/><path d="M43 44 Q50 49 57 44" stroke="#111" fill="none"/><rect x="30" y="56" width="40" height="34" rx="8" fill="#0ea5e9"/><rect x="58" y="80" width="30" height="12" fill="#fff" stroke="#111"/><text x="73" y="89" font-size="7" text-anchor="middle">71-xx.xxx</text></svg>'
};

/* ---------- Gửi phản ánh hiện trường ---------- */
EX['svl-pa'] = function(stage, ctx){
  const S = { lv: '', txt: '', pin: null, ph: '' };
  stage.innerHTML = A.mission(['Tình huống giả định: rác tồn đọng ở **đầu cầu kênh, cạnh trụ điện số 12, Ấp Mẫu 1** từ sáng **20/11**, lấn ra lòng đường.', 'Soạn phản ánh ở khung bên phải, chọn **vị trí trên bản đồ**, chọn **ảnh** phù hợp.', 'Máy chấm **8 tiêu chí** ngay khi bạn soạn; điện thoại hiển thị bản xem trước. Bấm **Gửi phản ánh**.'], 'Phản ánh tốt = Vị trí + Thời điểm + Nội dung cụ thể + Ảnh rõ, lời lẽ văn minh, không lộ thông tin người khác.') +
    '<div class="simwrap" style="margin-top:16px"><div>' + A.phoneHTML('app-svl', 'Phản ánh hiện trường', 'Mô phỏng Smart Vĩnh Long') + '</div><div class="simside"><div class="card">' +
    '<div class="field"><label>Lĩnh vực</label><select data-lv><option value="">– Chọn –</option><option>Môi trường</option><option>Giao thông</option><option>Điện chiếu sáng</option><option>An ninh trật tự</option><option>Khác</option></select></div>' +
    '<div class="field"><label>Nội dung phản ánh</label><textarea data-tx placeholder="Việc gì? Ở đâu? Từ khi nào? Ảnh hưởng ra sao?"></textarea></div>' +
    '<label class="field" style="margin-bottom:6px"><b>Vị trí trên bản đồ</b> <span class="small">(chạm lên bản đồ hoặc dùng vị trí hiện tại)</span></label><div class="minimap" data-map><svg viewBox="0 0 300 160" preserveAspectRatio="none"><rect width="300" height="160" fill="#d9f99d"/><path d="M0 95 C80 80 140 120 300 90" stroke="#38bdf8" stroke-width="16" fill="none"/><path d="M150 0 L150 160" stroke="#f8fafc" stroke-width="12"/><rect x="138" y="80" width="24" height="26" fill="#a8a29e"/><circle cx="175" cy="70" r="4" fill="#475569"/><text x="180" y="66" font-size="9" fill="#334155">Trụ điện 12</text><text x="20" y="30" font-size="10" fill="#365314">Ấp Mẫu 1 (giả định)</text><text x="200" y="140" font-size="10" fill="#365314">Kênh</text><text x="156" y="122" font-size="9" fill="#334155">Cầu</text></svg></div><div class="btnrow" style="margin:8px 0 12px"><button class="btn small ghost" data-here>' + I('pin') + 'Dùng vị trí hiện tại</button><span class="small" data-pinlbl>Chưa chọn vị trí</span></div>' +
    '<label class="field"><b>Ảnh hiện trường</b></label><div class="photopick" data-pp>' + Object.keys(PH).map(k => '<button data-p="' + k + '" aria-label="Ảnh ' + k + '">' + PH[k] + '</button>').join('') + '</div>' +
    '</div><div class="card pad-s" style="margin-top:12px"><h4>Chấm chất lượng <span class="chip" data-cnt></span></h4><ul class="checks" data-ck></ul></div><div class="btnrow" style="margin-top:12px"><button class="btn big sun" data-send>' + I('upload') + 'Gửi phản ánh</button></div></div></div><div data-res style="margin-top:16px"></div>';
  const body = $('[data-sbody]', stage), screen = $('.screen', stage); $('[data-dots]', stage).remove();
  const C = [
    ['Đã chọn lĩnh vực phù hợp (Môi trường)', () => S.lv === 'Môi trường'],
    ['Nội dung nêu vị trí cụ thể (cầu, trụ điện, ấp…)', () => /(cầu|trụ|ấp|cạnh|đầu|trước|gần|đường|kênh)/i.test(S.txt)],
    ['Nêu thời điểm (ngày, từ khi nào)', () => /(\d{1,2}\s*\/\s*\d{1,2}|từ (sáng|chiều|tối|hôm|ngày)|hôm qua|sáng nay|ngày \d)/i.test(S.txt)],
    ['Mô tả cụ thể, đủ ý (≥ 15 chữ)', () => A.countWords(S.txt) >= 15],
    ['Lời lẽ văn minh (không quá nhiều dấu !, không xúc phạm)', () => S.txt && !/!!|ăn hại|vô dụng|đồ |bọn /i.test(S.txt)],
    ['Không ghi số điện thoại, tên người khác', () => !/\d[\d .]{8,}\d/.test(S.txt) && !/(ông|bà|anh|chị) [A-ZĐ][a-zà-ỹ]+ [A-ZĐ]/.test(S.txt)],
    ['Đã đánh dấu vị trí trên bản đồ', () => !!S.pin],
    ['Ảnh rõ, có mốc nhận diện, không lộ mặt / biển số', () => S.ph === 'good']
  ];
  let pass = 0;
  const upd = () => {
    pass = 0; $('[data-ck]', stage).innerHTML = C.map(c => { const g = c[1](); if (g) pass++; return '<li class="' + (g ? 'on' : '') + '"><span class="d">' + (g ? '✓' : '') + '</span>' + c[0] + '</li>'; }).join('');
    $('[data-cnt]', stage).textContent = pass + '/8';
    body.innerHTML = '<div class="pcard"><span class="badge info">' + esc(S.lv || 'Chưa chọn lĩnh vực') + '</span><p style="margin:8px 0;white-space:pre-wrap">' + esc(S.txt || 'Nội dung phản ánh sẽ hiện ở đây…') + '</p>' + (S.ph ? '<div style="width:100%;aspect-ratio:1.4;border-radius:10px;overflow:hidden">' + PH[S.ph].replace('<svg', '<svg preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%"') + '</div>' : '<div class="small">Chưa có ảnh</div>') + '<p class="small" style="margin:8px 0 0">' + I('pin') + ' ' + (S.pin ? 'Đã gắn vị trí' : 'Chưa có vị trí') + '</p></div>';
  };
  $('[data-lv]', stage).onchange = e => { S.lv = e.target.value; upd(); };
  $('[data-tx]', stage).oninput = e => { S.txt = e.target.value; upd(); };
  const map = $('[data-map]', stage);
  const setPin = (x, y) => { $$('.mk', map).forEach(m => m.remove()); const m = document.createElement('div'); m.className = 'mk'; m.innerHTML = I('pin'); m.style.left = x + '%'; m.style.top = y + '%'; map.appendChild(m); S.pin = [x, y]; $('[data-pinlbl]', stage).textContent = 'Đã gắn vị trí'; A.SND.tap(); upd(); };
  map.addEventListener('click', e => { const r = map.getBoundingClientRect(); setPin((e.clientX - r.left) * 100 / r.width, (e.clientY - r.top) * 100 / r.height); });
  $('[data-here]', stage).onclick = () => setPin(55, 52);
  $$('[data-p]', stage).forEach(b => b.onclick = () => { S.ph = b.dataset.p; $$('[data-p]', stage).forEach(x => x.classList.toggle('on', x === b)); A.SND.flip(); if (S.ph !== 'good') A.toast(S.ph === 'blur' ? 'Ảnh mờ – khó xác minh hiện trường' : 'Ảnh lộ mặt người, biển số xe – không nên gửi'); upd(); });
  upd();
  let sent = false;
  $('[data-send]', stage).onclick = () => {
    if (sent) return;
    if (!S.txt.trim() || !S.pin) { A.toast('Cần có nội dung và vị trí trước khi gửi'); A.SND.no(); return; }
    sent = true; $('[data-send]', stage).disabled = true;
    const bg = document.createElement('div'); bg.className = 'sheet-bg'; const sh = document.createElement('div'); sh.className = 'sheet'; sh.innerHTML = A.okSVG + '<h5 style="text-align:center">Gửi phản ánh thành công</h5><p class="small" style="text-align:center">Phản ánh của bạn đã được tiếp nhận (mô phỏng).</p>'; screen.append(bg, sh);
    setTimeout(() => { bg.remove(); sh.remove(); body.innerHTML = '<h5>Phản ánh của tôi</h5><div class="pcard"><b>' + esc(S.txt.slice(0, 60)) + (S.txt.length > 60 ? '…' : '') + '</b><ul class="timeline" style="margin-top:10px"><li><span class="dt"></span>Đã tiếp nhận</li><li><span class="dt"></span>Đang xử lý</li><li><span class="dt"></span>Đã xử lý</li></ul></div>';
      $$('.timeline li', body).forEach((l, i) => setTimeout(() => { l.classList.add('on'); A.SND.tick(); }, 400 + i * 700)); }, 2000);
    setTimeout(() => A.showResult($('[data-res]', stage), ctx, pass, 8, pass >= 7 ? 'Phản ánh đủ thông tin sẽ được chuyển đúng bộ phận và xử lý nhanh.' : 'Các tiêu chí chưa đạt: ' + C.filter(c => !c[1]()).map(c => c[0]).join('; ') + '.'), 3400);
  };
};

/* ---------- Lọc phản ánh ---------- */
EX['svl-loc'] = function(stage, ctx){
  const O = ['Tốt – gửi được', 'Cần sửa: thiếu vị trí', 'Cần sửa: thiếu nội dung cụ thể', 'Cần sửa: lộ thông tin cá nhân / lời lẽ chưa văn minh'];
  const pre = (t, ph) => '<div class="pcard" style="background:#f8fafc"><span class="badge info">Phản ánh mẫu</span><p style="margin:8px 0">' + esc(t) + '</p><span class="small">' + I('image') + ' ' + esc(ph) + '</span></div>';
  stage.innerHTML = A.mission(['Bạn là cán bộ xã hướng dẫn người dân gửi phản ánh.', 'Với mỗi phản ánh mẫu, chọn **gửi được** hay **cần sửa** và vì sao.']) + '<div data-c style="margin-top:16px"></div>';
  A.chain($('[data-c]', stage), { list: [
    { pre: pre('Đèn chiếu sáng tuyến đường liên ấp đoạn trước trường tiểu học (giả định) bị tắt 3 trụ liên tiếp từ tối 18/11, đi lại ban đêm nguy hiểm.', 'Ảnh rõ 3 trụ đèn tắt'), q: 'Đánh giá:', o: O, a: 0, e: 'Có vị trí, thời điểm, nội dung, ảnh.' },
    { pre: pre('Đường bị ổ gà lớn khoảng 1 m, nước đọng, xe máy dễ té.', 'Ảnh rõ ổ gà'), q: 'Đánh giá:', o: O, a: 1, e: 'Không biết ổ gà ở đâu – cần nêu tuyến đường, mốc gần đó hoặc gắn vị trí trên bản đồ.' },
    { pre: pre('Có vấn đề ở gần nhà tôi, Ấp Mẫu 2. Xử lý giúp.', 'Ảnh mặt đường'), q: 'Đánh giá:', o: O, a: 2, e: '“Có vấn đề” là gì? Cần mô tả cụ thể sự việc, từ khi nào.' },
    { pre: pre('Nhà ông Nguyễn Văn X, số điện thoại 0123 xxx xxx, đổ rác ra kênh mỗi tối.', 'Ảnh chụp rõ mặt ông X'), q: 'Đánh giá:', o: O, a: 3, e: 'Không đăng tên, số điện thoại, ảnh mặt người khác. Mô tả hành vi, vị trí, thời điểm; cơ quan chức năng sẽ xác minh.' },
    { pre: pre('Cống thoát nước cạnh chợ (giả định) Ấp Mẫu 1 bị tắc từ ngày 20/11, nước tràn lên mặt đường khoảng 20 m.', 'Ảnh rõ, gắn vị trí'), q: 'Đánh giá:', o: O, a: 0, e: 'Đủ 4 yếu tố.' },
    { pre: pre('Bọn quản lý ăn hại, rác đầy ra mà không ai làm!!!', 'Ảnh mờ'), q: 'Đánh giá:', o: O, a: 3, e: 'Lời lẽ xúc phạm làm phản ánh khó được tiếp nhận. Viết văn minh, nêu vị trí, thời điểm, ảnh rõ.' }
  ], onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Hãy hướng dẫn người dân theo công thức: **Vị trí – Thời điểm – Nội dung – Ảnh rõ**.') });
};
})();
