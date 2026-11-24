/* =========================================================
   PHẦN 2 – VNeID & SỔ SỨC KHỎE ĐIỆN TỬ
   Điện thoại mô phỏng trung tính – KHÔNG phải ứng dụng thật, không logo thật.
   ========================================================= */
(function(){
const A = window.APP, $ = A.$, $$ = A.$$, esc = A.esc, I = window.ICON, EX = window.EX, F = window.FAKE;

/* ---------- bộ máy mô phỏng điện thoại theo bước ---------- */
A.phoneSim = function(stage, ctx, cfg){
  stage.innerHTML = A.mission(cfg.mission, cfg.tip) +
    '<div class="simwrap" style="margin-top:16px"><div>' + A.phoneHTML(cfg.cls || 'app-id', cfg.title, cfg.sub) + '</div><div class="simside"><div class="card"><div class="small" data-sn></div><h3 data-st style="margin:4px 0 10px"></h3><div data-coach></div><div class="meter" style="margin-top:12px"><i data-pg style="background:var(--sun)"></i></div><p class="small" style="margin:8px 0 0">Thao tác sai: <b data-mis>0</b> · Dữ liệu dùng trong bài là giả định</p></div><div data-side style="margin-top:14px"></div></div></div><div data-res style="margin-top:16px"></div>';
  const body = $('[data-sbody]', stage), screen = $('.screen', stage), dots = $('[data-dots]', stage), steps = cfg.steps;
  let k = 0, miss = 0, T = [], alive = true;
  const api = {
    body, screen, side: $('[data-side]', stage), F,
    ok(){ if (!alive) return; A.SND.ok(); k++; show(); },
    fail(msg){ miss++; A.SND.no(); $('[data-mis]', stage).textContent = miss; A.coach($('[data-coach]', stage), msg, 'no'); $$('[data-good]', body).forEach(g => g.classList.add('glow')); screen.animate && screen.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300 }); },
    later(fn, ms){ T.push(setTimeout(() => alive && fn(), ms)); },
    coach(html, kind){ A.coach($('[data-coach]', stage), html, kind); },
    btn(label, good, cls, ic){ return '<button class="sbtn ' + (cls || '') + '" ' + (good ? 'data-good' : 'data-bad') + '>' + (ic ? I(ic) : '') + esc(label) + '</button>'; },
    on(sel, fn){ $$(sel, body).forEach(el => el.addEventListener('click', fn)); },
    bad(msg){ $$('[data-bad]', body).forEach(el => el.addEventListener('click', () => api.fail(el.dataset.msg || msg))); }
  };
  function show(){
    A.dots(dots, steps.length, k);
    $('[data-pg]', stage).style.width = (k * 100 / steps.length) + '%';
    if (k >= steps.length) return finish();
    const s = steps[k];
    $('[data-sn]', stage).textContent = 'Bước ' + (k + 1) + '/' + steps.length; $('[data-st]', stage).textContent = s.t;
    A.coach($('[data-coach]', stage), s.c);
    $$('.notif,.sheet,.sheet-bg,.callscr', screen).forEach(n => n.remove());
    body.innerHTML = ''; body.scrollTop = 0; s.r(api);
  }
  function finish(){
    const n = steps.length, score = Math.max(0, n - miss);
    body.innerHTML = A.okSVG + '<h5 style="text-align:center">' + esc(cfg.doneTitle || 'Hoàn thành!') + '</h5><p style="text-align:center">' + (cfg.doneText || '') + '</p>';
    A.showResult($('[data-res]', stage), ctx, score, n, 'Bạn hoàn thành **' + n + ' bước** với **' + miss + '** thao tác sai. ' + (cfg.lesson || ''));
  }
  show();
  return () => { alive = false; T.forEach(clearTimeout); };
};
/* ô nhập trong điện thoại */
const sin = (id, label, ph, type) => '<div class="sin" data-w="' + id + '"><label for="s' + id + '">' + label + '</label><input id="s' + id + '" data-in="' + id + '" ' + (type ? 'type="' + type + '" inputmode="' + (type === 'tel' ? 'numeric' : 'text') + '"' : '') + ' placeholder="' + (ph || '') + '" autocomplete="off"><span class="em"></span></div>';
const val = (body, id) => ($('[data-in="' + id + '"]', body) || {}).value || '';
const err = (body, id, msg) => { const w = $('[data-w="' + id + '"]', body); if (!w) return; w.classList.toggle('err', !!msg); $('.em', w).textContent = msg || ''; };
const otpHTML = '<div class="otpbox">' + Array.from({ length: 6 }, (_, i) => '<input maxlength="1" inputmode="numeric" data-o="' + i + '" aria-label="Số thứ ' + (i + 1) + '">').join('') + '</div>';
function bindOTP(body){ const os = $$('[data-o]', body); os.forEach((o, i) => { o.addEventListener('input', () => { o.value = o.value.replace(/\D/g, '').slice(-1); if (o.value && os[i + 1]) os[i + 1].focus(); }); o.addEventListener('keydown', e => { if (e.key === 'Backspace' && !o.value && os[i - 1]) os[i - 1].focus(); }); }); return () => os.map(o => o.value).join(''); }
const rnd6 = () => String(Math.floor(100000 + Math.random() * 899999));
const fakeCard = () => '<div class="card pad-s"><h4>' + I('card') + ' Thẻ căn cước mẫu (giả định)</h4><div class="idcard"><span class="mau">MẪU</span><div class="ph">' + I('user') + '</div><b>CĂN CƯỚC – MẪU TẬP HUẤN</b><br>Số định danh: <b>' + F.idShow + '</b><br>Họ tên: ' + F.name + '<br>Ngày sinh: ' + F.dob + '<div class="qr"></div><div style="clear:both"></div></div><p class="small" style="margin:8px 0 0">SĐT giả định: <b>' + F.phoneShow + '</b><br>' + esc(F.note) + '</p></div>';
const pwRules = [['8–20 ký tự', s => s.length >= 8 && s.length <= 20], ['Có chữ hoa', s => /[A-Z]/.test(s)], ['Có chữ thường', s => /[a-z]/.test(s)], ['Có chữ số', s => /\d/.test(s)], ['Có ký tự đặc biệt', s => /[^A-Za-z0-9]/.test(s)], ['Không chứa tên, ngày sinh', s => s && !/(mau|nguyen|1990|0101)/i.test(s)]];
function pcWeak(p){
  if (!/^\d{6}$/.test(p)) return 'Passcode phải gồm đúng 6 chữ số';
  if (/^(\d)\1{5}$/.test(p)) return 'Không dùng 6 số giống nhau';
  const d = p.split('').map(Number), up = d.every((x, i) => !i || x === (d[i - 1] + 1) % 10), dn = d.every((x, i) => !i || x === (d[i - 1] + 9) % 10);
  if (up || dn) return 'Không dùng dãy số liên tiếp';
  if (/^(\d\d)\1\1$/.test(p) || /^(\d{3})\1$/.test(p)) return 'Không dùng cụm số lặp lại';
  if (['010190', '199001', '900101', '011990', '010119'].includes(p)) return 'Không dùng ngày sinh';
  return '';
}
A.pwRules = pwRules; A.pcWeak = pcWeak;
const pwList = s => '<ul class="checks" style="margin-top:6px">' + pwRules.map(r => '<li class="' + (r[1](s) ? 'on' : '') + '" style="padding:3px 8px;font-size:.74rem"><span class="d" style="width:16px;height:16px">' + (r[1](s) ? '✓' : '') + '</span>' + r[0] + '</li>').join('') + '</ul>';
const home = (items, good) => '<div class="homegrid">' + items.map(x => '<button ' + (x[0] === good ? 'data-good' : 'data-bad data-msg="Chưa đúng mục. ' + esc(x[2] || 'Hãy đọc lại hướng dẫn ở bên phải.') + '"') + '>' + I(x[1]) + esc(x[0]) + '</button>').join('') + '</div>';

/* ---------- Quầy hỗ trợ ---------- */
EX.hotro = function(stage, ctx){
  stage.innerHTML = A.mission(['Bạn là cán bộ trực quầy hỗ trợ của xã.', 'Đọc lời người dân, chọn **câu trả lời chuẩn mực** nhất.'], 'Ba nguyên tắc: không cầm máy làm thay, không hỏi OTP – passcode, chuyển đúng đầu mối.') + '<div data-c style="margin-top:16px"></div>';
  const pre = t => '<div class="chatlog" style="margin-bottom:12px"><div class="bub in" style="opacity:1">' + I('user') + ' <b>Người dân:</b> ' + esc(t) + '</div></div>';
  A.chain($('[data-c]', stage), { list: [
    { pre: pre('Cháu ơi, cô không rành, cháu cầm máy làm giùm cô cho nhanh nha.'), q: 'Bạn trả lời:', o: ['Dạ, cô đưa máy cháu làm luôn cho lẹ.', 'Dạ cô cứ cầm máy, cháu chỉ từng nút để cô tự bấm và nhớ cách làm ạ.', 'Cô về nhà nhờ con cháu làm giùm.'], a: 1, e: 'Cán bộ chỉ hướng dẫn, để người dân tự thao tác.' },
    { pre: pre('Có mã gửi về điện thoại nè, để cô đọc cho cháu nhập: 4 – 8 – 2…'), q: 'Bạn nói:', o: ['Dạ cô đọc chậm thôi, cháu ghi lại.', 'Cô dừng lại ạ – mã này cô tự che màn hình và tự nhập, không đọc cho ai, kể cả cán bộ.', 'Cô chụp màn hình gửi Zalo cho cháu.'], a: 1, e: 'Tuyệt đối không yêu cầu người dân đọc to OTP, mật khẩu, passcode.' },
    { pre: pre('Sao trong máy cô không thấy cái Sổ sức khỏe?'), q: 'Câu hỏi nên hỏi trước tiên:', o: ['Tài khoản định danh của mình đã được Công an kích hoạt lên Mức 2 chưa cô?', 'Chắc máy cô bị hư rồi.', 'Cô gỡ ra cài ứng dụng khác thử.'], a: 0, e: 'Sổ SKĐT cần tài khoản mức 2 – câu nói chuẩn số 2.' },
    { pre: pre('Tên trên thẻ BHYT của chú bị sai dấu nên hệ thống từ chối.'), q: 'Hướng xử lý đúng:', o: ['Cháu sửa tên trên ứng dụng giúp chú.', 'Chú liên hệ cơ quan BHXH đang phục vụ địa bàn để điều chỉnh thông tin, rồi gửi lại yêu cầu.', 'Thôi chú cứ dùng thẻ giấy, khỏi tích hợp.'], a: 1, e: 'Lỗi dữ liệu gốc thuộc thẩm quyền BHXH – chuyển đúng đầu mối.' },
    { pre: pre('Chú mới đi khám hôm qua mà chưa thấy trong Sổ sức khỏe.'), q: 'Bạn giải thích:', o: ['Dữ liệu cần thời gian đồng bộ từ cơ sở khám chữa bệnh lên hệ thống, chú đợi vài ngày ạ.', 'Do chú chưa đóng tiền ứng dụng.', 'Chắc bệnh viện không làm cho chú.'], a: 0, e: 'Câu nói chuẩn số 5.' },
    { pre: pre('Hôm qua có người xưng công an gọi bảo chú cài ứng dụng qua đường link cho nhanh, có đúng không cháu?'), q: 'Bạn trả lời:', o: ['Đúng rồi chú, làm theo đi.', 'Chú gửi link qua đây, cháu cài giúp.', 'Không đúng ạ. Công an không gửi link cài ứng dụng; VNeID chỉ tải từ App Store, Google Play. Nghi ngờ thì chú cúp máy, đến Công an xã.'], a: 2, e: 'Đây là thủ đoạn lừa đảo phổ biến được Công an cảnh báo.' }
  ], onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Hãy luyện thuộc **5 câu nói chuẩn** ở quầy hỗ trợ.') });
};

/* ---------- Mức 1 hay Mức 2 ---------- */
EX.mucdo = function(stage, ctx){
  stage.innerHTML = A.mission(['Xếp từng đặc điểm vào **Mức 1** hoặc **Mức 2**.']) + '<div data-s style="margin-top:16px"></div>';
  A.sorter($('[data-s]', stage), {
    bins: [{ k: 'm1', t: 'Tài khoản Mức 1', cls: 'b-info', ic: 'phone' }, { k: 'm2', t: 'Tài khoản Mức 2', cls: 'b-ok', ic: 'shield' }],
    items: [
      { x: 'Tự đăng ký trên ứng dụng, không cần đến cơ quan Công an', k: 'm1' }, { x: 'Chỉ có thông tin cá nhân cơ bản', k: 'm1' }, { x: 'Chưa xem được Sổ sức khỏe điện tử', k: 'm1' },
      { x: 'Cấp trực tiếp tại Công an cấp xã', k: 'm2', why: 'NQ 22/2026: không còn cấp ở cấp bộ, tỉnh.' }, { x: 'Chụp ảnh chân dung, lấy vân tay', k: 'm2' }, { x: 'Tích hợp được thẻ BHYT', k: 'm2' },
      { x: 'Xem Sổ sức khỏe điện tử, thông tin cư trú', k: 'm2' }, { x: 'Đăng nhập Cổng DVC để nộp hồ sơ trực tuyến', k: 'm2' }, { x: 'Điều kiện hưởng chính sách “công dân số”', k: 'm2' },
      { x: 'Có giá trị tương đương xuất trình thẻ căn cước trong giao dịch', k: 'm2', why: 'Trang chiếu gốc đặt nhầm ý này ở cột Mức 1.' }
    ],
    onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Muốn tích hợp BHYT, xem Sổ SKĐT, nộp hồ sơ – người dân cần **Mức 2** tại Công an xã.')
  });
};

/* ---------- Đăng ký tài khoản ---------- */
EX['vneid-dk'] = function(stage, ctx){
  let otp = '';
  return A.phoneSim(stage, ctx, { title: 'Ứng dụng định danh', sub: 'Mô phỏng – không phải VNeID thật', mission: ['Hướng dẫn công dân giả định **' + F.name + '** đăng ký tài khoản trên điện thoại mô phỏng.', 'Làm theo hướng dẫn ở khung bên phải; dữ liệu cần nhập có trên **thẻ mẫu**.', 'Cẩn thận: sẽ có **tình huống bất ngờ** giữa chừng!'],
    lesson: 'Nhớ thứ tự: Tải đúng ứng dụng → Đăng ký → Quét QR → OTP → Mật khẩu.',
    doneTitle: 'Đăng ký thành công', doneText: 'Người dân có thể đăng nhập lần đầu bằng số định danh và mật khẩu.',
    steps: [
      { t: 'Tải đúng ứng dụng', c: 'Trên kho ứng dụng có nhiều kết quả. Chọn ứng dụng **chính thức của Bộ Công an** (trong bài: “VNeID – Bộ Công an”). Ứng dụng giả thường có chữ “Pro”, “cập nhật nhanh”, “mức 3”.', r(s){
        s.body.innerHTML = '<div class="sin"><input value="VNeID" readonly></div>' + [['VNeID Pro – Cập nhật định danh nhanh', 'Nhà phát triển: VN Support Team', 0], ['VNeID – Bộ Công an', 'Nhà phát triển: Trung tâm dữ liệu quốc gia về dân cư (mô phỏng)', 1], ['Định danh mức 3 – Kích hoạt tại nhà', 'Nhà phát triển: eID Online', 0]].map(a => '<button class="listrow" ' + (a[2] ? 'data-good' : 'data-bad') + '>' + I('phone') + '<span><b>' + a[0] + '</b><br><small>' + a[1] + '</small></span></button>').join('');
        s.on('[data-good]', () => s.ok()); s.bad('Đây là ứng dụng giả mạo! Ứng dụng thật do cơ quan thuộc Bộ Công an phát hành – không có “Pro”, “mức 3”.'); } },
      { t: 'Chọn Đăng ký', c: 'Người dân **chưa có tài khoản** → chọn **Đăng ký**.', r(s){
        s.body.innerHTML = '<div style="text-align:center;padding:20px 0">' + I('shield', 'big') + '<h5>Chào mừng</h5></div>' + s.btn('Đăng nhập', false, 'alt') + s.btn('Đăng ký', true) + s.btn('Kích hoạt tài khoản định danh điện tử', false, 'alt');
        s.on('[data-good]', () => s.ok()); s.bad('Chưa có tài khoản thì chọn “Đăng ký”.'); } },
      { t: 'Nhập số định danh và số điện thoại', c: 'Để người dân **tự nhập** số định danh 12 số và số điện thoại chính chủ (xem thẻ mẫu bên dưới).', r(s){
        s.side.innerHTML = fakeCard();
        s.body.innerHTML = '<h5>Đăng ký tài khoản</h5>' + sin('id', 'Số định danh cá nhân', '12 chữ số', 'tel') + sin('ph', 'Số điện thoại', '10 chữ số', 'tel') + s.btn('Tiếp tục', true);
        s.on('[data-good]', () => { const id = val(s.body, 'id').replace(/\s/g, ''), ph = val(s.body, 'ph').replace(/\s/g, ''); let bad = 0;
          err(s.body, 'id', id === F.id ? '' : (bad = 1, /^\d{12}$/.test(id) ? 'Không khớp thẻ mẫu' : 'Cần đúng 12 chữ số')); err(s.body, 'ph', ph === F.phone ? '' : (bad = 1, 'Không khớp số giả định'));
          if (bad) s.fail('Kiểm tra lại số trên thẻ mẫu: ' + F.idShow + ' và SĐT ' + F.phoneShow + '.'); else s.ok(); }); } },
      { t: 'Quét mã QR trên thẻ', c: 'Đặt mã QR mặt trước thẻ căn cước vào khung để hệ thống đối chiếu thông tin.', r(s){
        s.body.innerHTML = '<div class="scanner"><div class="frame"><div class="line"></div></div></div><p class="small" style="text-align:center;margin-top:8px">Đưa mã QR trên thẻ vào khung</p>' + s.btn('Quét mã QR trên thẻ', true, '', 'qr');
        s.on('[data-good]', e => { e.target.closest('button').disabled = true; s.coach('Đang đọc mã QR…'); s.later(() => { s.body.innerHTML = '<div class="pcard" style="border-color:#86efac;background:#f0fdf4">' + I('check') + ' <b>Đã đọc thông tin</b><br>Họ tên: ' + F.name + '<br>Ngày sinh: ' + F.dob + '<br>Số định danh: ' + F.idShow + '</div>' + s.btn('Xác nhận thông tin', true); s.on('[data-good]', () => s.ok()); }, 1800); }); } },
      { t: 'Nhập mã OTP – có cuộc gọi lạ!', c: 'Mã OTP vừa gửi về tin nhắn. Hãy để người dân tự nhập. **Nếu có ai hỏi mã – xử lý thế nào?**', r(s){
        otp = rnd6();
        s.body.innerHTML = '<h5>Nhập mã xác thực</h5><p>Mã OTP gồm 6 chữ số đã gửi tới số ' + F.phoneShow + '</p>' + otpHTML + s.btn('Xác nhận', true);
        const get = bindOTP(s.body);
        A.notif(s.screen, '<span class="nic">' + I('sms') + '</span><div><b>Tin nhắn · mô phỏng</b>Mã OTP của bạn: <span class="code">' + otp + '</span><br>Tuyệt đối không cung cấp mã này cho bất kỳ ai.</div>', '', 9000);
        let called = false;
        s.later(() => { called = true; const c = document.createElement('div'); c.className = 'callscr'; c.innerHTML = '<div class="av">' + I('user') + '</div><b>Số lạ đang gọi…</b><p style="font-size:.85rem">“Tôi là cán bộ hỗ trợ định danh. Anh/chị đọc mã OTP vừa nhận để tôi kích hoạt giúp nhé!”</p><button class="sbtn" data-x="give" style="background:#16a34a">Đọc mã cho họ</button><button class="sbtn" data-x="no">Từ chối, cúp máy</button>'; s.screen.appendChild(c);
          c.addEventListener('click', e => { const b = e.target.closest('[data-x]'); if (!b) return; if (b.dataset.x === 'give') { s.fail('Không bao giờ đọc OTP cho người khác – đây là thủ đoạn chiếm đoạt tài khoản!'); } else { s.coach('Chính xác: cúp máy, không cung cấp mã. Giờ người dân tự nhập OTP vào ô.', 'ok'); A.SND.ok(); } c.remove(); }); }, 2600);
        s.on('[data-good]', () => { if (!called) { s.coach('Chờ một chút…'); return; } if (get() === otp) s.ok(); else s.fail('Mã OTP chưa đúng. Xem lại tin nhắn (bấm “Gửi lại mã” nếu đã tắt).'); });
        s.body.insertAdjacentHTML('beforeend', '<button class="sbtn alt" data-re>Gửi lại mã</button>');
        $('[data-re]', s.body).onclick = () => A.notif(s.screen, '<span class="nic">' + I('sms') + '</span><div><b>Tin nhắn · mô phỏng</b>Mã OTP của bạn: <span class="code">' + otp + '</span></div>', '', 9000); } },
      { t: 'Đặt mật khẩu', c: 'Mật khẩu **8–20 ký tự**, có chữ hoa, chữ thường, số, ký tự đặc biệt; không chứa tên, ngày sinh. Người dân tự đặt và tự ghi nhớ.', r(s){
        s.body.innerHTML = '<h5>Thiết lập mật khẩu</h5>' + sin('p1', 'Mật khẩu', '', 'password') + '<div data-rl></div>' + sin('p2', 'Nhập lại mật khẩu', '', 'password') + s.btn('Hoàn tất', true);
        const i1 = $('[data-in=p1]', s.body); const up = () => $('[data-rl]', s.body).innerHTML = pwList(i1.value); i1.addEventListener('input', up); up();
        s.on('[data-good]', () => { const p = val(s.body, 'p1'); if (!pwRules.every(r => r[1](p))) { s.fail('Mật khẩu chưa đạt đủ quy tắc – xem các dòng chưa sáng xanh.'); return; } if (p !== val(s.body, 'p2')) { err(s.body, 'p2', 'Không khớp'); s.fail('Hai lần nhập mật khẩu chưa khớp.'); return; } s.ok(); }); } }
    ] });
};

/* ---------- Kích hoạt + passcode ---------- */
EX['vneid-kh'] = function(stage, ctx){
  let otp = '', pc = '';
  return A.phoneSim(stage, ctx, { title: 'Ứng dụng định danh', sub: 'Mô phỏng – không phải VNeID thật', mission: ['Công dân giả định đã được **Công an xã cấp tài khoản mức 2**. Hướng dẫn kích hoạt trên điện thoại.', 'Đặt mật khẩu và **passcode 6 số** an toàn.'], tip: 'Passcode tránh dãy liên tiếp (123456), số lặp (111111), ngày sinh.',
    lesson: 'Mật khẩu dùng để đăng nhập; passcode dùng để mở ví giấy tờ, Sổ SKĐT.', doneTitle: 'Đã kích hoạt', doneText: 'Tài khoản định danh điện tử mức 2 đã sẵn sàng.',
    steps: [
      { t: 'Chọn chức năng kích hoạt', c: 'Tài khoản đã được cấp tại Công an xã → chọn **Kích hoạt tài khoản định danh điện tử**.', r(s){
        s.body.innerHTML = '<div style="text-align:center;padding:20px 0">' + I('shield') + '<h5>Chào mừng</h5></div>' + s.btn('Đăng nhập', false, 'alt') + s.btn('Đăng ký', false, 'alt') + s.btn('Kích hoạt tài khoản định danh điện tử', true);
        s.on('[data-good]', () => s.ok()); s.bad('Tài khoản đã được cấp – cần chọn “Kích hoạt tài khoản định danh điện tử”.'); } },
      { t: 'Chọn đối tượng', c: 'Người dân là **công dân Việt Nam**.', r(s){
        s.body.innerHTML = '<h5>Bạn là</h5>' + s.btn('Công dân Việt Nam', true) + s.btn('Người nước ngoài', false, 'alt');
        s.on('[data-good]', () => s.ok()); s.bad('Chọn “Công dân Việt Nam”.'); } },
      { t: 'Nhập thông tin', c: 'Số định danh cá nhân và **số điện thoại chính chủ** đã đăng ký khi làm thủ tục ở Công an xã.', r(s){
        s.side.innerHTML = fakeCard() + '<div class="note warn" style="margin-top:12px">' + I('alert') + '<div>Từ 28/9/2026, nếu số thuê bao không còn chính chủ, tài khoản có thể bị <b>tự động khoá</b> (NĐ 320/2026/NĐ-CP).</div></div>';
        s.body.innerHTML = '<h5>Kích hoạt tài khoản</h5>' + sin('id', 'Số định danh cá nhân', '', 'tel') + sin('ph', 'Số điện thoại', '', 'tel') + s.btn('Gửi yêu cầu', true);
        s.on('[data-good]', () => { const ok1 = val(s.body, 'id').replace(/\s/g, '') === F.id, ok2 = val(s.body, 'ph').replace(/\s/g, '') === F.phone; err(s.body, 'id', ok1 ? '' : 'Không khớp'); err(s.body, 'ph', ok2 ? '' : 'Không khớp'); if (ok1 && ok2) s.ok(); else s.fail('Xem lại số định danh và số điện thoại giả định trên thẻ mẫu.'); }); } },
      { t: 'Nhập OTP', c: 'Để người dân **tự tay** nhập mã OTP 6 số.', r(s){
        otp = rnd6(); s.body.innerHTML = '<h5>Mã xác thực</h5>' + otpHTML + s.btn('Xác nhận', true) + '<button class="sbtn alt" data-re>Gửi lại mã</button>';
        const get = bindOTP(s.body); const n = () => A.notif(s.screen, '<span class="nic">' + I('sms') + '</span><div><b>Tin nhắn · mô phỏng</b>Mã kích hoạt: <span class="code">' + otp + '</span><br>Không cung cấp mã cho bất kỳ ai.</div>', '', 9000);
        n(); $('[data-re]', s.body).onclick = n;
        s.on('[data-good]', () => get() === otp ? s.ok() : s.fail('Mã chưa đúng.')); } },
      { t: 'Đặt mật khẩu', c: 'Mật khẩu 8–20 ký tự, đủ chữ hoa, thường, số, ký tự đặc biệt.', r(s){
        s.body.innerHTML = '<h5>Mật khẩu đăng nhập</h5>' + sin('p1', 'Mật khẩu', '', 'password') + '<div data-rl></div>' + sin('p2', 'Nhập lại', '', 'password') + s.btn('Tiếp tục', true);
        const i1 = $('[data-in=p1]', s.body); const up = () => $('[data-rl]', s.body).innerHTML = pwList(i1.value); i1.addEventListener('input', up); up();
        s.on('[data-good]', () => { const p = val(s.body, 'p1'); if (!pwRules.every(r => r[1](p))) return s.fail('Mật khẩu chưa đủ mạnh.'); if (p !== val(s.body, 'p2')) return s.fail('Hai lần nhập chưa khớp.'); s.ok(); }); } },
      { t: 'Tạo passcode 6 số', c: 'Passcode mở **Ví giấy tờ**, **Sổ SKĐT**. Không dùng 123456, 111111, 121212, ngày sinh.', r(s){
        s.body.innerHTML = '<h5>Tạo passcode</h5><p class="small">Nhập 6 chữ số</p>' + otpHTML + '<div class="sin"><span class="em" data-pe></span></div>' + s.btn('Tiếp tục', true);
        const get = bindOTP(s.body);
        s.on('[data-good]', () => { const p = get(), w = pcWeak(p); if (w) { $('[data-pe]', s.body).textContent = w; s.fail('Passcode yếu: ' + w + '.'); return; } pc = p;
          s.body.innerHTML = '<h5>Nhập lại passcode</h5>' + otpHTML + s.btn('Xác nhận', true); const g2 = bindOTP(s.body);
          s.on('[data-good]', () => g2() === pc ? s.ok() : s.fail('Chưa khớp với passcode vừa tạo.')); }); } },
      { t: 'Kiểm tra trên màn hình chính', c: 'Màn hình chính hiện **Mức 2**. Bấm “Ví giấy tờ” để xác nhận passcode hoạt động.', r(s){
        s.body.innerHTML = '<div class="pcard" style="display:flex;gap:10px;align-items:center">' + I('user') + '<div><b>' + F.name + '</b><br><span class="badge ok">Định danh mức 2</span></div></div>' + home([['Ví giấy tờ', 'card'], ['Hồ sơ sức khỏe', 'hospital'], ['Thủ tục hành chính', 'file'], ['Thông báo', 'mail'], ['Cá nhân', 'user'], ['Tiện ích', 'puzzle']], 'Ví giấy tờ');
        s.bad(); s.on('[data-good]', () => { s.body.innerHTML = '<h5>Nhập passcode</h5>' + otpHTML + s.btn('Mở ví', true); const g = bindOTP(s.body); s.on('[data-good]', () => g() === pc ? s.ok() : s.fail('Passcode chưa đúng.')); }); } }
    ] });
};

/* ---------- Máy đo mật khẩu, passcode ---------- */
EX.matkhau = function(stage, ctx){
  stage.innerHTML = A.mission(['Gõ thử một **mật khẩu** và một **passcode** – máy chấm ngay theo quy tắc đã học.', 'Cả hai đạt thì trả lời 4 câu: khi nào dùng mật khẩu, khi nào dùng passcode.'], 'Đây chỉ là bài tập – đừng gõ mật khẩu thật của bạn.') +
    '<div class="two" style="margin-top:16px"><div class="card"><h3>' + I('key') + ' Mật khẩu đăng nhập</h3><div class="field"><input data-pw placeholder="Gõ thử mật khẩu" autocomplete="off"></div><div class="meter"><i data-m1></i></div><div data-r1></div></div><div class="card"><h3>' + I('lock') + ' Passcode 6 số</h3><div class="field"><input data-pc inputmode="numeric" maxlength="6" placeholder="6 chữ số" autocomplete="off"></div><div class="meter"><i data-m2></i></div><p data-r2 class="small"></p></div></div><div data-q style="margin-top:16px"></div><div data-res></div>';
  let okA = false, okB = false, started = false;
  const upd = () => {
    const p = $('[data-pw]', stage).value, n = pwRules.filter(r => r[1](p)).length; okA = n === pwRules.length;
    $('[data-m1]', stage).style.width = (n * 100 / pwRules.length) + '%'; $('[data-m1]', stage).style.background = okA ? '#16a34a' : n > 3 ? '#f59e0b' : '#ef4444'; $('[data-r1]', stage).innerHTML = pwList(p);
    const c = $('[data-pc]', stage).value.replace(/\D/g, ''); $('[data-pc]', stage).value = c; const w = pcWeak(c); okB = !w;
    $('[data-m2]', stage).style.width = (okB ? 100 : c.length * 12) + '%'; $('[data-m2]', stage).style.background = okB ? '#16a34a' : '#ef4444'; $('[data-r2]', stage).innerHTML = c ? (okB ? '<b style="color:#16a34a">✓ Passcode khó đoán</b>' : '✕ ' + w) : 'Tránh: 123456 · 111111 · 121212 · ngày sinh';
    if (okA && okB && !started) { started = true; A.SND.ok(); quiz(); }
  };
  stage.addEventListener('input', e => { if (e.target.matches('[data-pw],[data-pc]')) upd(); }); upd();
  function quiz(){
    $('[data-q]', stage).innerHTML = '<h3>Dùng mật khẩu hay passcode?</h3><div data-c></div>';
    A.chain($('[data-c]', stage), { list: [
      { q: 'Đăng nhập ứng dụng trên **điện thoại mới**', o: ['Mật khẩu', 'Passcode'], a: 0, e: 'Mật khẩu dùng khi đăng nhập trên máy mới hoặc sau khi đăng xuất.' },
      { q: 'Mở **Ví giấy tờ** để xuất trình thẻ BHYT', o: ['Mật khẩu', 'Passcode'], a: 1, e: 'Passcode mở ví giấy tờ.' },
      { q: 'Xem **Sổ sức khỏe điện tử**', o: ['Mật khẩu', 'Passcode'], a: 1, e: 'Dữ liệu y tế yêu cầu passcode.' },
      { q: 'Đăng nhập lại **sau khi đã đăng xuất**', o: ['Mật khẩu', 'Passcode'], a: 0, e: 'Đăng nhập dùng mật khẩu.' }
    ], onDone: (ok, n, res) => A.showResult(res, ctx, ok + 2, n + 2, 'Mật khẩu và passcode do **chính người dân** đặt và giữ bí mật.') });
  }
};

/* ---------- Tích hợp BHYT + Sổ SKĐT ---------- */
EX.bhyt = function(stage, ctx){
  const PC = '730518';
  return A.phoneSim(stage, ctx, { title: 'Ứng dụng định danh', sub: 'Mô phỏng – không phải VNeID thật', mission: ['Tài khoản giả định đã là **mức 2**. Tích hợp thẻ BHYT, chờ xác thực rồi mở **Sổ sức khỏe điện tử**.', 'Passcode giả định của tài khoản: <b>' + PC + '</b> (người dân tự che màn hình khi nhập).'],
    lesson: '“Gửi yêu cầu thành công” ≠ đã tích hợp; chỉ dùng khi thẻ hiện “Đã xác thực”.', doneTitle: 'Đã mở Sổ sức khỏe điện tử', doneText: 'Dữ liệu y tế trong bài là giả định.',
    steps: [
      { t: 'Vào Ví giấy tờ', c: 'Từ màn hình chính chọn **Ví giấy tờ**.', r(s){ s.body.innerHTML = home([['Ví giấy tờ', 'card'], ['Hồ sơ sức khỏe', 'hospital', 'Thẻ BHYT tích hợp trong Ví giấy tờ trước.'], ['Thủ tục hành chính', 'file'], ['Thông báo', 'mail'], ['Cá nhân', 'user'], ['Tiện ích', 'puzzle']], 'Ví giấy tờ'); s.bad(); s.on('[data-good]', () => s.ok()); } },
      { t: 'Chọn Tích hợp thông tin', c: 'Trong Ví giấy tờ, bấm **Tích hợp thông tin**.', r(s){ s.body.innerHTML = '<div class="listrow">' + I('card') + ' Thẻ căn cước <span class="badge ok" style="margin-left:auto">Đã xác thực</span></div>' + s.btn('Tích hợp thông tin', true, '', 'plus') + s.btn('Chia sẻ giấy tờ', false, 'alt'); s.bad('Chọn “Tích hợp thông tin”.'); s.on('[data-good]', () => s.ok()); } },
      { t: 'Tạo mới yêu cầu', c: 'Bấm **Tạo mới yêu cầu**.', r(s){ s.body.innerHTML = '<p class="small">Danh sách yêu cầu: (trống)</p>' + s.btn('Tạo mới yêu cầu', true, '', 'plus') + s.btn('Tra cứu yêu cầu cũ', false, 'alt'); s.bad('Chưa có yêu cầu nào – hãy tạo mới.'); s.on('[data-good]', () => s.ok()); } },
      { t: 'Chọn loại giấy tờ', c: 'Chọn **Thẻ bảo hiểm y tế**.', r(s){ s.body.innerHTML = '<h5>Chọn loại giấy tờ</h5>' + ['Giấy phép lái xe', 'Thẻ bảo hiểm y tế', 'Đăng ký xe', 'Mã số thuế'].map(x => '<button class="listrow" ' + (x === 'Thẻ bảo hiểm y tế' ? 'data-good' : 'data-bad') + '>' + I(x === 'Thẻ bảo hiểm y tế' ? 'hospital' : 'file') + x + '</button>').join(''); s.bad('Chọn đúng “Thẻ bảo hiểm y tế”.'); s.on('[data-good]', () => s.ok()); } },
      { t: 'Nhập mã thẻ BHYT', c: 'Nhập đúng mã số in trên thẻ (giả định: <b>' + F.bhyt + '</b>), tích đồng ý, gửi yêu cầu.', r(s){
        s.body.innerHTML = '<h5>Thẻ bảo hiểm y tế</h5>' + sin('bh', 'Mã số thẻ BHYT', '15 ký tự') + '<label style="display:flex;gap:8px;font-size:.8rem;margin:6px 0"><input type="checkbox" data-agree> Tôi cam đoan thông tin là đúng và đồng ý tích hợp</label>' + s.btn('Gửi yêu cầu', true);
        s.on('[data-good]', () => { const ok1 = val(s.body, 'bh').trim().toUpperCase() === F.bhyt; err(s.body, 'bh', ok1 ? '' : 'Không khớp mã giả định'); if (!ok1) return s.fail('Mã thẻ chưa đúng: ' + F.bhyt + '.'); if (!$('[data-agree]', s.body).checked) return s.fail('Cần tích ô đồng ý trước khi gửi.'); s.ok(); }); } },
      { t: 'Hiểu đúng trạng thái', c: 'Ứng dụng báo **Gửi yêu cầu thành công**. Người dân hỏi: “Vậy dùng thẻ được chưa?”', r(s){
        s.body.innerHTML = A.okSVG + '<h5 style="text-align:center">Gửi yêu cầu thành công</h5><p class="small" style="text-align:center">Yêu cầu đang chờ cơ quan BHXH xác thực.</p><p><b>Trả lời người dân:</b></p>' + s.btn('Dùng được ngay rồi chú', false, 'alt') + s.btn('Chưa ạ, chờ thẻ hiện “Đã xác thực”', true);
        s.bad('Gửi thành công chỉ là hệ thống đã tiếp nhận – chưa phải đã tích hợp xong.'); s.on('[data-good]', () => {
          s.body.innerHTML = '<div class="listrow">' + I('hospital') + ' Thẻ BHYT <span class="badge wait" style="margin-left:auto" data-bdg>Đang xác thực</span></div><p class="small">Mô phỏng thời gian chờ:</p>' + s.btn('⏩ Tua nhanh – kiểm tra lại sau', true);
          s.on('[data-good]', e => { e.target.closest('button').disabled = true; s.later(() => { const b = $('[data-bdg]', s.body); b.className = 'badge ok'; b.textContent = 'Đã xác thực'; A.SND.ok(); s.coach('Thẻ BHYT đã hiện **Đã xác thực** màu xanh – giờ mở Sổ sức khỏe.', 'ok'); s.later(() => s.ok(), 1200); }, 1300); }); }); } },
      { t: 'Mở Hồ sơ sức khỏe', c: 'Về màn hình chính → **Hồ sơ sức khỏe** → **Sổ sức khỏe điện tử**.', r(s){
        s.body.innerHTML = home([['Ví giấy tờ', 'card'], ['Hồ sơ sức khỏe', 'hospital'], ['Thủ tục hành chính', 'file'], ['Thông báo', 'mail'], ['Cá nhân', 'user'], ['Tiện ích', 'puzzle']], 'Hồ sơ sức khỏe'); s.bad();
        s.on('[data-good]', () => { s.body.innerHTML = '<h5>Hồ sơ sức khỏe</h5>' + ['Sổ sức khỏe điện tử', 'Lịch sử tiêm chủng', 'Đặt lịch khám'].map(x => '<button class="listrow" ' + (x === 'Sổ sức khỏe điện tử' ? 'data-good' : 'data-bad') + '>' + I('hospital') + x + '</button>').join(''); s.bad('Chọn “Sổ sức khỏe điện tử”.'); s.on('[data-good]', () => s.ok()); }); } },
      { t: 'Nhập passcode để xem', c: 'Người dân tự che màn hình, nhập passcode (giả định ' + PC + ').', r(s){
        s.body.innerHTML = '<h5>Xác thực passcode</h5>' + otpHTML + s.btn('Xem sổ', true); const g = bindOTP(s.body);
        s.on('[data-good]', () => { if (g() !== PC) return s.fail('Passcode chưa đúng.'); s.body.innerHTML = '<h5>Sổ sức khỏe điện tử</h5><div class="pcard"><b>' + F.name + '</b><br><small>Dữ liệu minh hoạ – giả định</small></div><div class="pcard"><b>Lịch sử khám chữa bệnh</b><br>• 12/10/2026 – Trạm y tế xã (giả định) – Khám tổng quát<br>• 03/08/2026 – Bệnh viện khu vực (giả định) – Tái khám</div><div class="pcard"><b>Tiêm chủng</b><br>• Mũi nhắc lại – 2025 (giả định)</div>' + s.btn('Đóng', true); s.on('[data-good]', () => s.ok()); }); } }
    ] });
};

/* ---------- Ghép lỗi – cách xử lý ---------- */
EX.loi = function(stage, ctx){
  stage.innerHTML = A.mission(['Ghép mỗi **hiện tượng lỗi** với **cách hướng dẫn** đúng.']) + '<div data-m style="margin-top:16px"></div>';
  A.matcher($('[data-m]', stage), { lt: 'Hiện tượng', rt: 'Cách hướng dẫn', pairs: [
    ['Không thấy mục Sổ sức khỏe điện tử', 'Đến Công an xã để được cấp tài khoản mức 2'],
    ['Không thấy thẻ BHYT trong Ví', 'Ví giấy tờ → Tích hợp thông tin → Thẻ BHYT, gửi yêu cầu'],
    ['Quên passcode 6 số', 'Mục Cá nhân → Đổi/Lấy lại passcode'],
    ['Thẻ BHYT bị từ chối do lệch thông tin', 'Liên hệ cơ quan BHXH đang phục vụ địa bàn để điều chỉnh'],
    ['Đổi điện thoại, máy cũ đã hỏng', 'Xác thực bằng chip NFC trên thẻ căn cước, hoặc đến Công an xã'],
    ['Không nhận được mã OTP', 'Kiểm tra sóng, số chính chủ, chờ rồi bấm “Gửi lại mã”'],
    ['Lịch sử khám mới chưa hiện', 'Chờ vài ngày để dữ liệu đồng bộ từ cơ sở khám chữa bệnh']
  ], onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Điểm trừ khi ghép nhầm. Lỗi dữ liệu gốc luôn chuyển đúng cơ quan có thẩm quyền.') });
};

/* ---------- Đăng nhập thiết bị mới bằng NFC ---------- */
EX['vneid-nfc'] = function(stage, ctx){
  return A.phoneSim(stage, ctx, { title: 'Ứng dụng định danh', sub: 'Điện thoại MỚI – mô phỏng', mission: ['Người dân đổi điện thoại mới, **máy cũ bị hỏng**.', 'Giúp họ đăng nhập bằng cách xác thực **NFC trên thẻ căn cước**.'],
    lesson: 'Máy không có NFC → hướng dẫn đến Công an xã để được hỗ trợ.', doneTitle: 'Đăng nhập thành công trên máy mới',
    steps: [
      { t: 'Đăng nhập trên máy mới', c: 'Người dân nhập số định danh và mật khẩu đã đặt (bài này chỉ cần bấm Đăng nhập).', r(s){ s.body.innerHTML = '<h5>Đăng nhập</h5><div class="sin"><label>Số định danh</label><input value="' + F.idShow + '" readonly></div><div class="sin"><label>Mật khẩu</label><input type="password" value="matkhau-mau" readonly></div>' + s.btn('Đăng nhập', true); s.on('[data-good]', () => s.ok()); } },
      { t: 'Chọn cách xác thực', c: 'Hệ thống phát hiện **thiết bị mới**. Máy cũ đã hỏng – chọn cách phù hợp.', r(s){
        s.body.innerHTML = '<div class="pcard" style="background:#fffbeb">' + I('alert') + ' Phát hiện đăng nhập trên thiết bị mới. Vui lòng xác thực.</div>' + s.btn('Lấy mã xác thực trên máy cũ', false, 'alt') + s.btn('Xác thực bằng chip NFC trên thẻ căn cước', true, '', 'nfc') + s.btn('Nhờ dịch vụ trên mạng gỡ thiết bị cũ', false, 'alt');
        $$('[data-bad]', s.body)[0].dataset.msg = 'Máy cũ đã hỏng nên không lấy được mã.'; $$('[data-bad]', s.body)[1].dataset.msg = 'Không bao giờ nhờ “dịch vụ” trên mạng – nguy cơ lừa đảo, mất tài khoản.'; s.bad(); s.on('[data-good]', () => s.ok()); } },
      { t: 'Áp thẻ vào lưng điện thoại', c: 'Đặt thẻ căn cước **sát vùng lưng điện thoại**, giữ yên đến khi đọc xong.', r(s){
        s.body.innerHTML = '<div class="nfcanim"><div class="ph2"></div><div class="wave"></div><div class="card"></div></div><div class="meter"><i data-nf style="background:#22d3ee"></i></div><p class="small" style="text-align:center" data-nt>Nhấn và giữ nút bên dưới để mô phỏng áp thẻ</p>' + s.btn('Nhấn giữ để áp thẻ', true, '', 'nfc');
        const b = $('[data-good]', s.body), bar = $('[data-nf]', s.body); let v = 0, t = null;
        const start = e => { e.preventDefault(); clearInterval(t); t = setInterval(() => { v = Math.min(100, v + 4); bar.style.width = v + '%'; if (v >= 100) { clearInterval(t); $('[data-nt]', s.body).textContent = 'Đã đọc chip thành công'; s.later(() => s.ok(), 600); } }, 60); };
        const stop = () => { clearInterval(t); if (v < 100) { v = 0; bar.style.width = '0%'; $('[data-nt]', s.body).textContent = 'Thẻ bị nhấc ra sớm – giữ yên đến khi đầy thanh'; } };
        b.addEventListener('pointerdown', start); b.addEventListener('pointerup', stop); b.addEventListener('pointerleave', stop); b.addEventListener('click', e => e.preventDefault()); } },
      { t: 'Nếu máy không có NFC?', c: 'Một người khác có điện thoại **không hỗ trợ NFC**. Bạn hướng dẫn thế nào?', r(s){
        s.body.innerHTML = '<p><b>Máy không có NFC thì…</b></p>' + s.btn('Đến Công an xã để được hỗ trợ', true) + s.btn('Mua ứng dụng NFC trên mạng', false, 'alt') + s.btn('Gửi ảnh thẻ căn cước cho người quen làm giúp', false, 'alt');
        s.bad('Không gửi ảnh thẻ, không cài ứng dụng lạ. Đến Công an xã để được hỗ trợ.'); s.on('[data-good]', () => s.ok()); } }
    ] });
};

/* ---------- Công dân số: đủ 5 loại giấy tờ chưa? ---------- */
EX.congdanso = function(stage, ctx){
  const T5 = ['Giấy khai sinh', 'Thẻ ngân hàng / tài khoản thanh toán / ví điện tử', 'Tài khoản an sinh xã hội', 'Số thuê bao di động', 'Sổ sức khỏe điện tử'], NO2 = 'Chưa có tài khoản mức 2';
  const P = [
    { n: 'Ông Mẫu A (giả định)', lv: 2, has: [0, 1, 3, 4], miss: [2] },
    { n: 'Bà Mẫu B (giả định)', lv: 1, has: [3], miss: ['m2'] },
    { n: 'Chị Mẫu C (giả định)', lv: 2, has: [0, 1, 2, 3, 4], miss: [] }
  ];
  let k = 0, ok = 0; const sel = new Set();
  stage.innerHTML = A.mission(['Theo NQ 66.22/2026/NQ-CP, công dân số cần **tài khoản mức 2** và tích hợp đủ **5 loại thông tin, giấy tờ cơ bản**.', 'Với mỗi hồ sơ giả định, chọn **những gì còn thiếu** (không thiếu gì thì không chọn), rồi bấm Kiểm tra.']) + '<div data-w style="margin-top:16px"></div><div data-res></div>';
  const draw = () => {
    const p = P[k]; sel.clear();
    $('[data-w]', stage).innerHTML = '<div class="two"><div class="card"><div class="small">Hồ sơ ' + (k + 1) + '/3</div><h3>' + I('user') + ' ' + p.n + '</h3><p><span class="badge ' + (p.lv === 2 ? 'ok' : 'wait') + '">Tài khoản mức ' + p.lv + '</span></p><b>Ví giấy tờ hiện có:</b><ul class="checks" style="margin-top:6px">' + (p.has.length ? p.has.map(i => '<li class="on"><span class="d">✓</span>' + T5[i] + '</li>').join('') : '<li>(trống)</li>') + '</ul></div><div class="card"><h4>Còn thiếu gì?</h4><div class="chips" data-ch>' + T5.map((t, i) => '<button data-v="' + i + '">' + t + '</button>').join('') + '<button data-v="m2">' + NO2 + '</button></div><div class="btnrow" style="margin-top:12px"><button class="btn" data-ok>' + I('check') + 'Kiểm tra</button></div><div data-fb></div></div></div>';
  };
  stage.addEventListener('click', e => {
    const c = e.target.closest('[data-v]'); if (c && !c.disabled) { const v = c.dataset.v; sel.has(v) ? sel.delete(v) : sel.add(v); c.classList.toggle('on'); A.SND.tap(); return; }
    if (e.target.closest('[data-ok]')) {
      const p = P[k], want = new Set(p.miss.map(String)), good = want.size === sel.size && [...want].every(x => sel.has(x)); if (good) ok++;
      A.SND[good ? 'ok' : 'no'](); $$('[data-v]', stage).forEach(b => b.disabled = true); $('[data-ok]', stage).disabled = true;
      const ans = p.miss.length ? p.miss.map(m => m === 'm2' ? NO2 + ' (phải đến Công an xã trước)' : T5[m]).join(', ') : 'Không thiếu – đủ điều kiện xét hưởng chính sách';
      $('[data-fb]', stage).innerHTML = '<div class="fb ' + (good ? 'ok' : 'no') + '">' + I(good ? 'check' : 'alert') + '<div><b>' + (good ? 'Chính xác. ' : 'Chưa đúng. ') + '</b>Đáp án: ' + ans + '.</div></div><div class="btnrow" style="margin-top:10px"><button class="btn" data-nx>' + (k < 2 ? 'Hồ sơ tiếp' : 'Xem kết quả') + '</button></div>';
      $('[data-nx]', stage).onclick = () => { if (k < 2) { k++; draw(); } else { $('[data-w]', stage).innerHTML = ''; A.showResult($('[data-res]', stage), ctx, ok, 3, 'Chính sách áp dụng từ 15/8/2026 đến 28/02/2027; mức miễn, giảm cụ thể xem Thông tư 117/2026/TT-BTC.'); } };
    }
  });
  draw();
};

/* ---------- Thật hay lừa? ---------- */
EX.luadao = function(stage, ctx){
  const M = [
    { k: 'sms', f: 'BoCongAn-VNeID', x: 'Tài khoản định danh của bạn sắp bị KHOÁ do thông tin cư trú sai lệch sau sáp nhập xã. Cập nhật ngay tại: <span class="lnk">vneid-capnhat.com</span>', a: 'lua', e: 'Link lạ, thúc giục, lợi dụng sắp xếp đơn vị hành chính. Cơ quan Công an không gửi link cập nhật.' },
    { k: 'call', f: 'Số lạ', x: '“Tôi là cán bộ công an xã. Dấu vân tay của anh bị mờ, cần cài định danh MỨC 3, tôi gửi link qua Zalo.”', a: 'lua', e: 'Không có “định danh mức 3”; không cài ứng dụng qua link.' },
    { k: 'zalo', f: 'Cán bộ hộ tịch xã mới', x: 'Chào anh, xã mới cần cập nhật địa chỉ. Anh gửi ảnh 2 mặt căn cước và mã OTP vừa nhận để tôi cập nhật giúp.', a: 'lua', e: 'Không ai được hỏi OTP; không gửi ảnh căn cước cho người lạ.' },
    { k: 'loa', f: 'Thông báo dán tại nhà văn hoá ấp', x: 'Công an xã tổ chức đợt cấp tài khoản định danh mức 2 tại trụ sở Công an xã. Người dân mang theo thẻ căn cước gắn chip.', a: 'an', e: 'Mức 2 cấp trực tiếp tại Công an cấp xã – đúng quy trình.' },
    { k: 'sms', f: 'Tin nhắn ngay sau khi bạn TỰ bấm đăng ký', x: 'Mã OTP của bạn là 482913. Tuyệt đối không cung cấp mã này cho bất kỳ ai.', a: 'an', e: 'Tin OTP do chính bạn yêu cầu là bình thường – miễn là không đưa mã cho ai.' },
    { k: 'ad', f: 'Quảng cáo trên mạng xã hội', x: 'Hỗ trợ kích hoạt VNeID cho TRẺ EM tại nhà, chỉ 50.000đ! Nhắn tin ngay.', a: 'lua', e: 'Tài khoản mức 2 cho trẻ phải làm trực tiếp tại cơ quan Công an.' },
    { k: 'call', f: 'Số lạ', x: '“Hệ thống đang lỗi nên không cập nhật qua iPhone được. Anh chuẩn bị điện thoại Android, 15 phút nữa tôi gọi lại hướng dẫn.”', a: 'lua', e: 'Kịch bản quen thuộc để dụ cài ứng dụng giả chứa mã độc trên Android.' },
    { k: 'store', f: 'Kho ứng dụng Google Play / App Store', x: 'Ứng dụng VNeID – cập nhật phiên bản mới (nhà phát hành thuộc Bộ Công an).', a: 'an', e: 'VNeID chính thức chỉ cập nhật từ kho ứng dụng.' }
  ];
  let k = 0, ok = 0;
  stage.innerHTML = A.mission(['Lần lượt xem 8 tin nhắn, cuộc gọi, thông báo trên điện thoại mô phỏng.', 'Quyết định: **An toàn** hay **Lừa đảo**?'], 'Dấu hiệu lừa: thúc giục, link lạ, hỏi OTP – mật khẩu, “mức 3”, làm tại nhà, yêu cầu điện thoại Android.') +
    '<div class="simwrap" style="margin-top:16px"><div>' + A.phoneHTML('app-svl', 'Hộp thư & cuộc gọi', 'Điện thoại mô phỏng') + '</div><div class="simside"><div class="card"><div class="small" data-n></div><h3>Đây là…</h3><div class="verdict"><button class="btn" data-v="an" style="background:#16a34a">' + I('check') + 'An toàn</button><button class="btn danger" data-v="lua">' + I('alert') + 'Lừa đảo</button></div><div data-fb></div></div></div></div><div data-res style="margin-top:16px"></div>';
  const body = $('[data-sbody]', stage), screen = $('.screen', stage); $('[data-dots]', stage).remove(); body.classList.add('inbox');
  const ic = { sms: 'sms', call: 'phone', zalo: 'message', loa: 'megaphone', ad: 'flag', store: 'download' };
  const draw = () => {
    const m = M[k]; $('[data-n]', stage).textContent = 'Tình huống ' + (k + 1) + '/' + M.length; $('[data-fb]', stage).innerHTML = ''; $$('[data-v]', stage).forEach(b => b.disabled = false);
    $$('.callscr', screen).forEach(c => c.remove());
    if (m.k === 'call') { const c = document.createElement('div'); c.className = 'callscr'; c.innerHTML = '<div class="av">' + I('phone') + '</div><b>' + esc(m.f) + ' đang gọi…</b><p style="font-size:.86rem">' + m.x + '</p>'; screen.appendChild(c); body.innerHTML = ''; }
    else body.innerHTML = '<div class="msg" style="animation:pop .4s forwards;opacity:0"><b>' + I(ic[m.k]) + ' ' + esc(m.f) + '</b>' + m.x + '</div>';
    A.SND.flip();
  };
  stage.addEventListener('click', e => {
    const b = e.target.closest('[data-v]'); if (!b || b.disabled) return;
    const m = M[k], good = b.dataset.v === m.a; if (good) ok++; A.SND[good ? 'ok' : 'no']();
    $$('[data-v]', stage).forEach(x => x.disabled = true);
    $('[data-fb]', stage).innerHTML = '<div class="fb ' + (good ? 'ok' : 'no') + '">' + I(good ? 'check' : 'alert') + '<div><b>' + (m.a === 'lua' ? 'LỪA ĐẢO. ' : 'AN TOÀN. ') + '</b>' + esc(m.e) + '</div></div><div class="btnrow" style="margin-top:10px"><button class="btn" data-nx>' + (k < M.length - 1 ? 'Tiếp theo' : 'Xem kết quả') + '</button></div>';
    $('[data-nx]', stage).onclick = () => { if (k < M.length - 1) { k++; draw(); } else { $$('.callscr', screen).forEach(c => c.remove()); body.innerHTML = A.okSVG; A.showResult($('[data-res]', stage), ctx, ok, M.length, 'Nghi ngờ → cúp máy, không bấm link, đến **Công an xã** hỏi trực tiếp. Hãy chia sẻ các dấu hiệu này với người dân trong ấp.'); } };
  });
  draw();
};
})();
