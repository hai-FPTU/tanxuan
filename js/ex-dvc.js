/* =========================================================
   PHẦN 3 – DỊCH VỤ CÔNG TRỰC TUYẾN
   "Cổng DVC mô phỏng": giao diện trung tính, có dải cảnh báo MÔ PHỎNG,
   không dùng quốc huy, logo hay bố cục của cổng thật.
   ========================================================= */
(function(){
const A = window.APP, st = A.st, $ = A.$, $$ = A.$$, esc = A.esc, I = window.ICON, EX = window.EX, F = window.FAKE;

A.browserSim = function(stage, ctx, cfg){
  stage.innerHTML = A.mission(cfg.mission, cfg.tip) +
    '<div class="two wide" style="margin-top:16px;align-items:start"><div class="browser app-dvc"><div class="bbar"><span class="dots"><i></i><i></i><i></i></span><div class="url"><span class="lock" data-lk>' + I('lock') + '</span><span data-url>about:blank</span></div></div><div class="bribbon">TRANG MÔ PHỎNG TẬP HUẤN – KHÔNG PHẢI CỔNG DỊCH VỤ CÔNG THẬT</div><div data-ph></div><div class="bview" data-bv></div></div>' +
    '<div><div class="card"><div class="small" data-sn></div><h3 data-st style="margin:4px 0 10px"></h3><div data-coach></div><div class="meter" style="margin-top:12px"><i data-pg style="background:var(--sun)"></i></div><p class="small" style="margin:8px 0 0">Thao tác sai: <b data-mis>0</b></p></div><div data-side style="margin-top:14px"></div></div></div><div data-res style="margin-top:16px"></div>';
  const body = $('[data-bv]', stage), steps = cfg.steps; let k = 0, miss = 0, T = [], alive = true;
  const api = {
    body, side: $('[data-side]', stage), F,
    url(u, secure){ $('[data-url]', stage).textContent = u; $('[data-lk]', stage).style.visibility = secure === false ? 'hidden' : 'visible'; },
    head(on){ $('[data-ph]', stage).innerHTML = on ? '<div class="portal-h"><span class="seal">DVC</span><div>CỔNG DỊCH VỤ CÔNG<br><small style="font-weight:600;opacity:.8">Bản mô phỏng tập huấn</small></div><span style="margin-left:auto;font-size:.8rem" data-who>' + (st.forms.dvcLogin ? I('user') + ' ' + F.name : '') + '</span></div>' : ''; },
    ok(){ if (!alive) return; A.SND.ok(); k++; show(); },
    fail(msg){ miss++; A.SND.no(); $('[data-mis]', stage).textContent = miss; A.coach($('[data-coach]', stage), msg, 'no'); $$('[data-good]', body).forEach(g => g.classList.add('glow')); },
    later(fn, ms){ T.push(setTimeout(() => alive && fn(), ms)); },
    coach(h, kd){ A.coach($('[data-coach]', stage), h, kd); },
    btn(l, good, cls, ic){ return '<button class="dvc-btn ' + (cls || '') + '" ' + (good ? 'data-good' : 'data-bad') + '>' + (ic ? I(ic) : '') + esc(l) + '</button>'; },
    on(sel, fn){ $$(sel, body).forEach(el => el.addEventListener('click', fn)); },
    bad(msg){ $$('[data-bad]', body).forEach(el => el.addEventListener('click', () => api.fail(el.dataset.msg || msg))); },
    pop(html, ms){ const n = document.createElement('div'); n.className = 'notif'; n.style.position = 'absolute'; n.style.top = '10px'; n.innerHTML = html; body.appendChild(n); if (ms !== 0) api.later(() => n.remove(), ms || 9000); return n; }
  };
  function show(){
    $('[data-pg]', stage).style.width = (k * 100 / steps.length) + '%';
    if (k >= steps.length) return finish();
    const s = steps[k]; $('[data-sn]', stage).textContent = 'Bước ' + (k + 1) + '/' + steps.length; $('[data-st]', stage).textContent = s.t;
    A.coach($('[data-coach]', stage), s.c); body.innerHTML = ''; api.side.innerHTML = cfg.side || ''; s.r(api);
  }
  function finish(){
    const n = steps.length; body.innerHTML = A.okSVG + '<h3 style="text-align:center">' + esc(cfg.doneTitle || 'Hoàn thành') + '</h3>';
    A.showResult($('[data-res]', stage), ctx, Math.max(0, n - miss), n, 'Hoàn thành **' + n + ' bước**, **' + miss + '** thao tác sai. ' + (cfg.lesson || ''));
  }
  show();
  return () => { alive = false; T.forEach(clearTimeout); };
};
const fin = (id, label, ph, type) => '<div class="field" data-w="' + id + '"><label for="d' + id + '">' + label + '</label><input id="d' + id + '" data-in="' + id + '" ' + (type ? 'type="' + type + '"' : '') + ' placeholder="' + (ph || '') + '" autocomplete="off"><span class="em"></span></div>';
const gv = (b, id) => ($('[data-in="' + id + '"]', b) || {}).value || '';
const ge = (b, id, m) => { const w = $('[data-w="' + id + '"]', b); if (!w) return; w.classList.toggle('err', !!m); $('.em', w).textContent = m || ''; };
const cap = () => Array.from({ length: 5 }, () => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join('');
const otp6 = () => String(Math.floor(100000 + Math.random() * 899999));

/* ---------- Đăng nhập ---------- */
EX['dvc-login'] = function(stage, ctx){
  let otp = '';
  return A.browserSim(stage, ctx, { mission: ['Hướng dẫn công dân giả định đăng nhập Cổng DVC bằng **tài khoản định danh điện tử**.', 'Bắt đầu bằng việc **tự gõ đúng địa chỉ** trên thanh trình duyệt.'], tip: 'Mật khẩu, OTP, passcode trong bài là giả định – người dân thật luôn tự nhập.',
    lesson: 'Luôn kiểm tra tên miền trước khi nhập mật khẩu.', doneTitle: 'Đã đăng nhập',
    side: '<div class="card pad-s"><h4>' + I('card') + ' Tài khoản giả định</h4>Số định danh: <b>' + F.idShow + '</b><br>Mật khẩu: <b>Mau@2026tx</b><br>Passcode: <b>730518</b></div>',
    steps: [
      { t: 'Gõ địa chỉ cổng', c: 'Gõ địa chỉ chính thức vào ô bên dưới (không bấm đường link lạ).', r(s){ s.url('about:blank'); s.head(false);
        s.body.innerHTML = '<h3>Nhập địa chỉ trang web</h3>' + fin('u', 'Địa chỉ', 'vd: https://…') + '<div class="chips" style="margin-bottom:10px"><span class="small">Gợi ý trình duyệt tự hiện:</span><button data-sg="dichvucong-gov.vn.com">dichvucong-gov.vn.com</button><button data-sg="dichvucong.gov.vn">dichvucong.gov.vn</button><button data-sg="dvc-vneid.top">dvc-vneid.top</button></div>' + s.btn('Truy cập', true, '', 'right');
        $$('[data-sg]', s.body).forEach(b => b.onclick = () => { $('[data-in=u]', s.body).value = b.dataset.sg; });
        s.on('[data-good]', () => { const u = gv(s.body, 'u').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, ''); if (u === 'dichvucong.gov.vn') s.ok(); else s.fail('“' + (u || '(trống)') + '” không phải địa chỉ cổng chính thức. Tên miền đúng: dichvucong.gov.vn'); }); } },
      { t: 'Bấm Đăng nhập', c: 'Trên điện thoại: bấm biểu tượng menu ☰ rồi chọn **Đăng nhập**.', r(s){ s.url('https://dichvucong.gov.vn'); s.head(true);
        s.body.innerHTML = '<div style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:12px"><button class="dvc-btn alt" data-menu>☰ Menu</button></div><div class="pcard"><b>Tìm kiếm thủ tục</b><div class="field" style="margin:8px 0 0"><input placeholder="Nhập từ khoá…" disabled></div></div><div data-mn></div>';
        $('[data-menu]', s.body).onclick = () => { $('[data-mn]', s.body).innerHTML = '<div class="pcard">' + s.btn('Đăng nhập', true) + ' ' + s.btn('Đăng ký', false, 'alt') + ' ' + s.btn('Hỏi đáp', false, 'alt') + '</div>'; s.on('[data-good]', () => s.ok()); s.bad('Chọn “Đăng nhập”.'); }; } },
      { t: 'Chọn phương thức đăng nhập', c: 'Công dân chọn **Tài khoản định danh điện tử cấp bởi Bộ Công an (VNeID)**.', r(s){
        s.body.innerHTML = '<h3>Chọn phương thức đăng nhập</h3>' + ['Tài khoản định danh điện tử cấp bởi Bộ Công an (VNeID)', 'Đăng nhập bằng mạng xã hội', 'Chứng thư số / USB ký số của doanh nghiệp'].map((x, i) => '<div class="pcard" style="cursor:pointer" ' + (i ? 'data-bad' : 'data-good') + '>' + I(i ? 'link' : 'shield') + ' ' + x + '</div>').join('');
        s.bad('Công dân dùng tài khoản định danh điện tử (VNeID).'); s.on('[data-good]', () => s.ok()); } },
      { t: 'Kiểm tra trang chuyển tiếp', c: 'Hệ thống chuyển sang trang định danh quốc gia. **Nhìn thanh địa chỉ** rồi mới nhập mật khẩu.', r(s){ s.url('https://sso.dancuquocgia.gov.vn'); s.head(false);
        s.body.innerHTML = '<h3>Đăng nhập tài khoản định danh</h3><p class="small">Địa chỉ trang hiện tại: <b>sso.dancuquocgia.gov.vn</b> – có đúng là trang chính thức?</p>' + s.btn('Đúng, tên miền kết thúc .gov.vn – tiếp tục', true) + ' ' + s.btn('Không đúng', false, 'alt');
        s.bad('Đây là trang chuyển tiếp chính thức (sso.dancuquocgia.gov.vn) được nêu trong hướng dẫn.');
        s.on('[data-good]', () => { s.body.innerHTML = '<h3>Đăng nhập</h3>' + fin('id', 'Số định danh cá nhân (12 số)', '') + fin('pw', 'Mật khẩu', '', 'password') + s.btn('Đăng nhập', true);
          s.on('[data-good]', () => { const a = gv(s.body, 'id').replace(/\s/g, '') === F.id, b = gv(s.body, 'pw') === 'Mau@2026tx'; ge(s.body, 'id', a ? '' : 'Không khớp'); ge(s.body, 'pw', b ? '' : 'Không khớp'); a && b ? s.ok() : s.fail('Dùng tài khoản giả định ở khung bên phải.'); }); }); } },
      { t: 'Nhận và nhập OTP', c: 'Chọn hình thức nhận mã (ứng dụng định danh hoặc SMS), rồi nhập mã.', r(s){
        s.body.innerHTML = '<h3>Xác thực</h3><p>Nhận mã OTP qua:</p>' + s.btn('Ứng dụng định danh trên điện thoại', true, '', 'phone') + ' ' + s.btn('Tin nhắn SMS', true, 'alt', 'sms');
        s.on('[data-good]', () => { otp = otp6(); s.pop('<span class="nic">' + I('phone') + '</span><div><b>Điện thoại của bạn · mô phỏng</b>Mã OTP: <span class="code">' + otp + '</span></div>');
          s.body.insertAdjacentHTML('beforeend', '<div style="margin-top:12px">' + fin('ot', 'Nhập mã OTP', '6 chữ số') + '<button class="dvc-btn" data-cf>Xác nhận</button></div>');
          $('[data-cf]', s.body).onclick = () => gv(s.body, 'ot').trim() === otp ? s.ok() : s.fail('Mã chưa đúng.'); }); } },
      { t: 'Đồng ý chia sẻ thông tin', c: 'Màn hình hiện các thông tin sẽ chia sẻ cho cổng DVC. Tích **Tôi đồng ý** rồi **Xác nhận chia sẻ**.', r(s){
        s.body.innerHTML = '<h3>Yêu cầu chia sẻ thông tin</h3><div class="pcard">Cổng Dịch vụ công yêu cầu: Họ tên, Ngày sinh, Số định danh cá nhân, Nơi thường trú.</div><label style="display:flex;gap:8px;margin:10px 0"><input type="checkbox" data-ag> Tôi đồng ý</label>' + s.btn('Xác nhận chia sẻ', true);
        s.on('[data-good]', () => $('[data-ag]', s.body).checked ? s.ok() : s.fail('Cần tích “Tôi đồng ý” trước.')); } },
      { t: 'Nhập passcode', c: 'Nhập passcode 6 số để hoàn tất (giả định 730518).', r(s){
        s.body.innerHTML = '<h3>Nhập passcode</h3>' + fin('pc', 'Passcode', '6 chữ số', 'password') + s.btn('Hoàn tất', true);
        s.on('[data-good]', () => { if (gv(s.body, 'pc') !== '730518') return s.fail('Passcode chưa đúng.'); st.forms.dvcLogin = true; A.save(); s.url('https://dichvucong.gov.vn'); s.head(true); s.ok(); }); } }
    ] });
};

/* ---------- Thật hay giả: đường link ---------- */
EX.link = function(stage, ctx){
  stage.innerHTML = A.mission(['Xếp 10 địa chỉ vào **Trang chính thức** hoặc **Giả mạo / không an toàn**.'], 'Đọc tên miền từ phải sang trái: phần ngay trước “/” đầu tiên quyết định trang thuộc về ai.') + '<div data-s style="margin-top:16px"></div>';
  A.sorter($('[data-s]', stage), { showWhy: true,
    bins: [{ k: 'ok', t: 'Trang chính thức', cls: 'b-ok', ic: 'check' }, { k: 'no', t: 'Giả mạo / không an toàn', cls: 'b-no', ic: 'ban' }],
    items: [
      { x: '`https://dichvucong.gov.vn`', k: 'ok', why: 'Cổng Dịch vụ công quốc gia.' },
      { x: '`https://sso.dancuquocgia.gov.vn`', k: 'ok', why: 'Trang đăng nhập định danh chuyển tiếp.' },
      { x: '`https://vbpl.moj.gov.vn`', k: 'ok', why: 'CSDL quốc gia về văn bản pháp luật.' },
      { x: '`https://congbao.chinhphu.vn`', k: 'ok', why: 'Công báo Chính phủ.' },
      { x: '`dichvucong-gov.vn.com`', k: 'no', why: 'Tên miền thật là “vn.com”, chỉ mượn chữ “gov”.' },
      { x: '`https://dichvucong.gov.vn.dangnhap-vneid.com`', k: 'no', why: 'Phần cuối “dangnhap-vneid.com” mới là chủ trang.' },
      { x: '`http://dichvucongvn.top`', k: 'no', why: 'Đuôi .top, không có https.' },
      { x: '`https://dichvucong.gov.vn@trang-lua.net`', k: 'no', why: 'Ký tự @ – trình duyệt sẽ mở trang-lua.net.' },
      { x: '`bit.ly/vneid-moi`', k: 'no', why: 'Link rút gọn che giấu trang thật.' },
      { x: '`vneid-capnhat.com`', k: 'no', why: 'Không phải tên miền của cơ quan nhà nước.' }
    ],
    onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Trang cơ quan nhà nước kết thúc đúng bằng **.gov.vn**. Tốt nhất: tự gõ địa chỉ hoặc dùng dấu trang đã lưu, không bấm link trong tin nhắn.')
  });
};

/* ---------- Nộp hồ sơ khai sinh ---------- */
EX['dvc-nop'] = function(stage, ctx){
  let cp = '';
  const XA = ['Xã Ba Tri', 'Xã Bảo Thạnh', 'Xã Mỹ Chánh Hòa', 'Xã Tân Thủy', 'Xã Tân Xuân', 'Xã Thạnh Phước', 'Phường Long Châu'];
  return A.browserSim(stage, ctx, { mission: ['Nộp hồ sơ **Đăng ký khai sinh** trực tuyến cho con của công dân giả định.', 'Chọn đúng cơ quan tiếp nhận: **Tỉnh Vĩnh Long → Xã Tân Xuân** (không còn cấp huyện).', 'Khai e-Form, đính kèm đúng tệp, nhập captcha, nộp và lưu mã hồ sơ.'],
    lesson: 'Sau sắp xếp đơn vị hành chính chỉ còn hai cấp: tỉnh và xã.', doneTitle: 'Nộp hồ sơ thành công',
    side: '<div class="card pad-s"><h4>' + I('file') + ' Thông tin giả định</h4>Người đi khai: ' + F.name + ' (cha)<br>Trẻ: <b>NGUYỄN MẪU BÉ</b>, nam<br>Ngày sinh: <b>15/11/2026</b><br>Nơi sinh: Trạm y tế xã (giả định)</div>',
    steps: [
      { t: 'Tìm thủ tục', c: 'Gõ từ khoá ngắn **khai sinh** rồi bấm tìm kiếm.', r(s){ s.url('https://dichvucong.gov.vn'); s.head(true); st.forms.dvcLogin = true;
        s.body.innerHTML = '<div class="pcard"><b>Tìm kiếm thủ tục hành chính</b><div style="display:flex;gap:8px;margin-top:8px"><input data-in="q" class="field" style="flex:1;padding:10px;border:2px solid #cbd5e1;border-radius:10px;font:inherit" placeholder="Nhập từ khoá"><button class="dvc-btn" data-go>' + I('search') + '</button></div></div><div data-rs></div>';
        $('[data-go]', s.body).onclick = () => { if (!/khai\s*sinh/i.test(gv(s.body, 'q'))) return s.fail('Gõ từ khoá ngắn gọn: “khai sinh”.');
          $('[data-rs]', s.body).innerHTML = [['Đăng ký khai sinh', 'Cấp Xã', 1], ['Đăng ký khai sinh có yếu tố nước ngoài', 'Cấp Tỉnh', 0], ['Cấp bản sao trích lục hộ tịch', 'Cấp Xã', 0]].map(r => '<div class="pcard" style="cursor:pointer" ' + (r[2] ? 'data-good' : 'data-bad') + '><b>' + r[0] + '</b> <span class="badge ' + (r[1] === 'Cấp Xã' ? 'ok' : 'info') + '">' + r[1] + '</span></div>').join('');
          s.bad('Chọn đúng thủ tục “Đăng ký khai sinh” thuộc thẩm quyền UBND cấp xã.'); s.on('[data-good]', () => s.ok()); }; } },
      { t: 'Đọc thông tin thủ tục', c: 'Đọc trình tự, thành phần hồ sơ, phí – lệ phí, rồi bấm **Nộp trực tuyến**.', r(s){
        s.body.innerHTML = '<h3>Đăng ký khai sinh <span class="badge ok">Cấp Xã</span></h3><table class="tbl"><tr><th>Thành phần hồ sơ</th><td>Tờ khai (e-Form); Giấy chứng sinh hoặc giấy tờ thay thế</td></tr><tr><th>Thời hạn</th><td>Theo quy định của thủ tục (xem trên cổng)</td></tr><tr><th>Lệ phí</th><td>Theo nghị quyết HĐND tỉnh Vĩnh Long; nhiều trường hợp được miễn</td></tr></table><div style="margin-top:12px">' + s.btn('Nộp trực tuyến', true, '', 'upload') + '</div>';
        s.on('[data-good]', () => s.ok()); } },
      { t: 'Chọn cơ quan tiếp nhận', c: 'Chọn **Tỉnh Vĩnh Long**, rồi **Xã Tân Xuân**. Hộp thoại mới **không còn ô Huyện**.', r(s){
        s.body.innerHTML = '<h3>Chọn cơ quan thực hiện</h3><div class="field"><label>Tỉnh / Thành phố</label><select data-in="tinh"><option value="">– Chọn –</option><option>Tỉnh Vĩnh Long</option><option>Tỉnh Bến Tre (trước 01/7/2025)</option><option>Tỉnh Trà Vinh (trước 01/7/2025)</option></select></div><div class="field"><label>Phường / Xã</label><select data-in="xa" disabled><option value="">– Chọn tỉnh trước –</option></select></div>' + s.btn('Đồng ý', true);
        const t = $('[data-in=tinh]', s.body), x = $('[data-in=xa]', s.body);
        t.onchange = () => { if (t.value === 'Tỉnh Vĩnh Long') { x.disabled = false; x.innerHTML = '<option value="">– Chọn –</option>' + XA.map(a => '<option>' + a + '</option>').join(''); } else { x.disabled = true; if (t.value) s.fail('Từ 01/7/2025 Bến Tre, Trà Vinh, Vĩnh Long đã hợp nhất thành tỉnh Vĩnh Long. Chọn “Tỉnh Vĩnh Long”.'); } };
        s.on('[data-good]', () => { if (t.value !== 'Tỉnh Vĩnh Long') return s.fail('Chọn “Tỉnh Vĩnh Long”.'); if (x.value !== 'Xã Tân Xuân') return s.fail('Người dân cư trú tại Xã Tân Xuân – chọn đúng xã.'); s.ok(); }); } },
      { t: 'Khai tờ khai điện tử (e-Form)', c: 'Thông tin người đi khai được **điền sẵn** từ tài khoản định danh. Khai thông tin của trẻ theo khung bên phải.', r(s){ s.url('https://dichvucong.gov.vn/…/eform');
        s.body.innerHTML = '<h3>Tờ khai đăng ký khai sinh</h3><div class="pcard" style="background:#f8fafc"><b>Người đi khai (tự điền từ VNeID)</b><br>' + F.name + ' · ' + F.idShow + '</div>' + fin('ht', 'Họ, chữ đệm, tên của trẻ', '') + '<div class="grid g3">' + fin('ns', 'Ngày sinh (dd/mm/yyyy)', '') + '<div class="field" data-w="gt"><label>Giới tính</label><select data-in="gt"><option value="">– Chọn –</option><option>Nam</option><option>Nữ</option></select><span class="em"></span></div><div class="field" data-w="qh"><label>Quan hệ với trẻ</label><select data-in="qh"><option value="">– Chọn –</option><option>Cha</option><option>Mẹ</option><option>Ông/Bà</option><option>Khác</option></select><span class="em"></span></div></div>' + s.btn('Lưu và tiếp tục', true);
        s.on('[data-good]', () => { let bad = 0; const ht = gv(s.body, 'ht').trim().toUpperCase(), ns = gv(s.body, 'ns').trim();
          ge(s.body, 'ht', ht === 'NGUYỄN MẪU BÉ' ? '' : (bad++, 'Ghi đúng: NGUYỄN MẪU BÉ'));
          const m = ns.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); const d = m && new Date(+m[3], +m[2] - 1, +m[1]);
          ge(s.body, 'ns', (m && ns.replace(/^0/, '') .length && +m[1] === 15 && +m[2] === 11 && +m[3] === 2026) ? '' : (bad++, (!m ? 'Sai định dạng dd/mm/yyyy' : (d > new Date() ? 'Ngày sinh ở tương lai' : 'Không khớp 15/11/2026'))));
          ge(s.body, 'gt', gv(s.body, 'gt') === 'Nam' ? '' : (bad++, 'Chọn đúng giới tính')); ge(s.body, 'qh', gv(s.body, 'qh') === 'Cha' ? '' : (bad++, 'Người đi khai là cha'));
          bad ? s.fail('Có ' + bad + ' ô chưa đúng – xem chữ đỏ dưới từng ô.') : s.ok(); }); } },
      { t: 'Đính kèm Giấy chứng sinh', c: 'Chọn **một** tệp hợp lệ: đúng định dạng (pdf, doc, docx, jpg, png), **≤ 20 MB**, rõ nét, đủ trang.', r(s){
        const FL = [['giay-chung-sinh-chup-nghieng.jpg', '1,8 MB', 'jpg', 'Ảnh nghiêng, mờ chữ', 0], ['video-giay-chung-sinh.mp4', '48 MB', 'mp4', 'Video', 0], ['giay-chung-sinh-scan.pdf', '0,9 MB', 'pdf', 'Bản scan rõ nét, đủ trang', 1], ['giay-chung-sinh.heic', '3,1 MB', 'heic', 'Ảnh định dạng HEIC', 0]];
        const col = { jpg: '#0ea5e9', mp4: '#7c3aed', pdf: '#dc2626', heic: '#64748b' };
        s.body.innerHTML = '<h3>Thành phần hồ sơ</h3><div class="pcard"><b>Giấy chứng sinh</b> <span class="badge wait">Bắt buộc</span><p class="small" style="margin:6px 0">Chọn tệp từ máy:</p>' + FL.map((f, i) => '<div class="filechip" style="cursor:pointer" ' + (f[4] ? 'data-good' : 'data-bad data-msg="Tệp “' + f[0] + '” không hợp lệ: ' + f[3] + (f[2] === 'mp4' ? ' – sai định dạng và quá 20 MB' : f[2] === 'heic' ? ' – định dạng chưa hỗ trợ' : ' – không đạt chất lượng') + '."') + '><span class="fi" style="background:' + col[f[2]] + '">' + f[2].toUpperCase() + '</span><span><b>' + f[0] + '</b><br><small>' + f[1] + ' · ' + f[3] + '</small></span></div>').join('') + '</div>';
        s.bad(); s.on('[data-good]', e => { e.currentTarget.classList.add('ok'); s.later(() => s.ok(), 500); }); } },
      { t: 'Cam kết, captcha và nộp', c: 'Tích ô cam kết, nhập đúng **mã xác nhận** rồi bấm **Nộp hồ sơ**.', r(s){ cp = cap();
        s.body.innerHTML = '<h3>Xác nhận</h3><label style="display:flex;gap:8px;margin:8px 0"><input type="checkbox" data-cm> Tôi chắc chắn rằng các thông tin khai báo trên là hoàn toàn chính xác</label><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="captcha" data-cp>' + cp + '</span><button class="dvc-btn alt" data-rf>' + I('refresh') + '</button></div>' + fin('cp', 'Nhập mã xác nhận', '') + s.btn('Nộp hồ sơ', true, '', 'upload');
        $('[data-rf]', s.body).onclick = () => { cp = cap(); $('[data-cp]', s.body).textContent = cp; };
        s.on('[data-good]', () => { if (!$('[data-cm]', s.body).checked) return s.fail('Cần tích ô cam kết thông tin chính xác.'); if (gv(s.body, 'cp').trim().toUpperCase() !== cp) return s.fail('Mã xác nhận chưa đúng – chú ý chữ hoa.'); s.ok(); }); } },
      { t: 'Lưu mã hồ sơ', c: 'Nộp thành công! Việc **cần làm ngay** là gì?', r(s){
        const ma = 'MP-TX-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + String(Math.floor(1000 + Math.random() * 8999));
        st.forms.mahs = ma; A.save();
        s.body.innerHTML = A.okSVG + '<h3 style="text-align:center">Nộp hồ sơ thành công</h3><div class="pcard" style="text-align:center">Mã hồ sơ (mô phỏng): <b style="font-size:1.2rem;letter-spacing:.05em">' + ma + '</b><br><small>Cơ quan tiếp nhận: UBND Xã Tân Xuân, Tỉnh Vĩnh Long</small></div><p><b>Việc cần làm ngay:</b></p>' + s.btn('Chụp màn hình / ghi lại mã hồ sơ', true) + ' ' + s.btn('Đóng trình duyệt là xong', false, 'alt') + ' ' + s.btn('Nộp thêm bản giấy ngay', false, 'alt');
        s.bad('Cần lưu mã hồ sơ để tra cứu tiến độ, nhận kết quả.'); s.on('[data-good]', () => s.ok()); } }
    ] });
};

/* ---------- Tệp hợp lệ? ---------- */
EX.tep = function(stage, ctx){
  stage.innerHTML = A.mission(['Theo hướng dẫn: định dạng **.pdf .doc .docx .jpg .png**, mỗi tệp **≤ 20 MB**, rõ nét, đủ trang.', 'Xếp 10 tệp vào **Hợp lệ** hoặc **Không hợp lệ**.']) + '<div data-s style="margin-top:16px"></div>';
  A.sorter($('[data-s]', stage), {
    bins: [{ k: 'ok', t: 'Hợp lệ', cls: 'b-ok', ic: 'check' }, { k: 'no', t: 'Không hợp lệ', cls: 'b-no', ic: 'x' }],
    items: [
      { x: 'to-khai.pdf · 0,8 MB', k: 'ok' }, { x: 'giay-chung-sinh.jpg · 2,4 MB · rõ nét', k: 'ok' }, { x: 'don-de-nghi.docx · 120 KB', k: 'ok' }, { x: 'ban-ve.png · 6 MB', k: 'ok' }, { x: 'van-ban.doc · 1 MB', k: 'ok' },
      { x: 'video-giay-to.mp4 · 45 MB', k: 'no', why: 'Sai định dạng, quá 20 MB.' }, { x: 'anh-chup-nghieng.jpg · 1,2 MB · mờ, mất góc', k: 'no', why: 'Định dạng đúng nhưng không rõ nét, thiếu góc.' },
      { x: 'giay-to.heic · 3 MB', k: 'no', why: 'Định dạng chưa có trong danh sách – đổi sang JPG.' }, { x: 'scan-50-trang.pdf · 32 MB', k: 'no', why: 'Quá 20 MB – tách tệp hoặc giảm độ phân giải.' }, { x: 'ho-so.rar · 5 MB', k: 'no', why: 'Tệp nén không được chấp nhận.' }
    ],
    onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Mẹo: dùng chức năng quét tài liệu của điện thoại để xuất PDF thẳng, rõ nét. Giới hạn định dạng, dung lượng có thể thay đổi – xem thông báo trên cổng khi nộp.')
  });
};

/* ---------- Theo dõi, thanh toán, kết quả ---------- */
EX['dvc-theodoi'] = function(stage, ctx){
  const ma = st.forms.mahs || 'MP-TX-261124-0001';
  let cp = '';
  return A.browserSim(stage, ctx, { mission: ['Tra cứu hồ sơ bằng **mã hồ sơ**, thực hiện **nghĩa vụ tài chính** bằng QR mẫu, tải **biên lai**, nhận **kết quả** và **đánh giá**.'], tip: 'Mọi số tiền, mã giao dịch trong bài là giả định.',
    lesson: 'Biên lai và kết quả điện tử có chữ ký số – lưu lại để đối chiếu khi cần.', doneTitle: 'Đã nhận kết quả và đánh giá',
    side: '<div class="card pad-s"><h4>' + I('file') + ' Mã hồ sơ của bạn</h4><b style="font-size:1.1rem">' + ma + '</b><p class="small" style="margin:6px 0 0">' + (st.forms.mahs ? 'Lấy từ bài “Nộp hồ sơ khai sinh”.' : 'Mã giả định (bạn chưa làm bài nộp hồ sơ).') + '</p></div>',
    steps: [
      { t: 'Tra cứu hồ sơ', c: 'Vào **Tra cứu hồ sơ**, nhập mã hồ sơ và mã bảo mật.', r(s){ s.url('https://dichvucong.gov.vn/…/tra-cuu'); s.head(true); cp = cap();
        s.body.innerHTML = '<h3>Tra cứu hồ sơ</h3>' + fin('ma', 'Mã hồ sơ', '') + '<span class="captcha">' + cp + '</span>' + fin('cp', 'Mã bảo mật', '') + s.btn('Tra cứu', true, '', 'search');
        s.on('[data-good]', () => { if (gv(s.body, 'ma').trim().toUpperCase() !== ma.toUpperCase()) return s.fail('Nhập đúng mã hồ sơ ở khung bên phải.'); if (gv(s.body, 'cp').trim().toUpperCase() !== cp) return s.fail('Mã bảo mật chưa đúng.'); s.ok(); }); } },
      { t: 'Theo dõi trạng thái', c: 'Xem trạng thái cập nhật. Khi đến **Yêu cầu thực hiện nghĩa vụ tài chính** thì bấm **Thanh toán**.', r(s){
        const S = ['Đã tiếp nhận', 'Đang xử lý', 'Yêu cầu thực hiện nghĩa vụ tài chính', 'Đã trả kết quả'];
        s.body.innerHTML = '<h3>Hồ sơ ' + ma + '</h3><ul class="timeline">' + S.map(x => '<li><span class="dt"></span><b>' + x + '</b></li>').join('') + '</ul><div data-pay></div>';
        const li = $$('.timeline li', s.body); [0, 1, 2].forEach(i => s.later(() => { li.forEach(l => l.classList.remove('cur')); li[i].classList.add('on'); if (i === 2) { li[i].classList.add('cur'); $('[data-pay]', s.body).innerHTML = '<div class="pcard"><b>Bảng kê nghĩa vụ tài chính</b><br>Khoản thu: Phí cấp 02 bản sao trích lục (giả định)<br>Số tiền: <b>xx.000 đ (giả định)</b><br>Đơn vị thụ hưởng: UBND Xã Tân Xuân</div>' + s.btn('Thanh toán', true, '', 'pay'); s.on('[data-good]', () => s.ok()); } A.SND.tick(); }, 700 + i * 900)); } },
      { t: 'Chọn phương thức thanh toán', c: 'Cách nhanh nhất: **quét mã QR** bằng ứng dụng ngân hàng.', r(s){ s.url('https://dichvucong.gov.vn/…/thanh-toan');
        s.body.innerHTML = '<h3>Phương thức thanh toán</h3>' + [['Quét mã QR', 'qr', 1], ['Thẻ ATM nội địa / thẻ quốc tế', 'pay', 1], ['Ví điện tử', 'card', 1], ['Chuyển khoản cho số tài khoản cá nhân được nhắn qua Zalo', 'alert', 0]].map(m => '<div class="pcard" style="cursor:pointer" ' + (m[2] ? (m[1] === 'qr' ? 'data-good' : 'data-alt') : 'data-bad data-msg="Không bao giờ chuyển tiền vào tài khoản cá nhân! Chỉ thanh toán trong cổng."') + '>' + I(m[1]) + ' ' + m[0] + '</div>').join('');
        s.bad(); $$('[data-alt]', s.body).forEach(e => e.onclick = () => s.coach('Phương thức này cũng hợp lệ. Trong bài, hãy thử **quét mã QR**.'));
        s.on('[data-good]', () => { s.body.innerHTML = '<h3>Quét mã để thanh toán</h3><div class="qrpay"></div><p class="small" style="text-align:center">Mã QR mẫu – không thanh toán được</p>' + s.btn('Đã quét bằng ứng dụng ngân hàng (mô phỏng)', true);
          s.on('[data-good]', e => { e.currentTarget.disabled = true; s.coach('Đang xử lý giao dịch…'); s.later(() => { s.body.innerHTML = A.okSVG + '<h3 style="text-align:center">Giao dịch của bạn đã được xử lý thành công</h3><div class="pcard">Mã giao dịch: MP' + Date.now().toString().slice(-8) + '<br>Thời gian: ' + new Date().toLocaleString('vi-VN') + '</div>' + s.btn('Tiếp tục', true); s.on('[data-good]', () => s.ok()); }, 1500); }); }); } },
      { t: 'Lấy biên lai điện tử', c: 'Vào **Lịch sử thanh toán**, tìm đúng mã hồ sơ, bấm **Xem biên lai**.', r(s){
        s.body.innerHTML = '<h3>Lịch sử thanh toán</h3><table class="tbl"><tr><th>Mã hồ sơ</th><th>Số tiền</th><th></th></tr><tr><td>MP-TX-260901-0042</td><td>giả định</td><td><button class="dvc-btn alt" data-bad>Xem biên lai</button></td></tr><tr><td><b>' + ma + '</b></td><td>giả định</td><td><button class="dvc-btn" data-good>Xem biên lai</button></td></tr></table>';
        s.bad('Đó là hồ sơ khác – tìm đúng mã ' + ma + '.');
        s.on('[data-good]', () => { s.body.innerHTML = '<div class="pcard" style="border:2px dashed #94a3b8"><b>BIÊN LAI THU PHÍ, LỆ PHÍ ĐIỆN TỬ (MẪU)</b><br>Hồ sơ: ' + ma + '<br>Đơn vị thu: UBND Xã Tân Xuân<br><span class="badge ok">Đã ký số (mô phỏng)</span></div>' + s.btn('Tải PDF biên lai', true, '', 'download'); s.on('[data-good]', () => { A.toast('Đã “tải” biên lai mẫu'); s.ok(); }); }); } },
      { t: 'Nhận kết quả', c: 'Trạng thái **Đã trả kết quả** → **Xem chi tiết** → tải tệp kết quả có chữ ký số.', r(s){
        s.body.innerHTML = '<h3>Dịch vụ công của tôi</h3><div class="pcard"><b>' + ma + '</b> – Đăng ký khai sinh <span class="badge ok">Đã trả kết quả</span><div style="margin-top:8px">' + s.btn('Xem chi tiết', true) + '</div></div>';
        s.on('[data-good]', () => { s.body.innerHTML = '<div class="pcard" style="border:2px solid #86efac"><b>TRÍCH LỤC KHAI SINH (BẢN ĐIỆN TỬ MẪU)</b><br>Họ tên: NGUYỄN MẪU BÉ<br>Nơi đăng ký: UBND Xã Tân Xuân<br><span class="badge ok">Chữ ký số hợp lệ (mô phỏng)</span></div>' + s.btn('Tải tệp kết quả (.pdf)', true, '', 'download'); s.on('[data-good]', () => s.ok()); }); } },
      { t: 'Đánh giá mức độ hài lòng', c: 'Chọn số sao và mức hài lòng để góp phần nâng chất lượng phục vụ.', r(s){
        s.body.innerHTML = '<h3>Đánh giá</h3><div class="stars">' + [1, 2, 3, 4, 5].map(i => '<button data-sr="' + i + '" aria-label="' + i + ' sao">★</button>').join('') + '</div><div class="chips" style="justify-content:center;margin:12px 0">' + ['Rất hài lòng', 'Hài lòng', 'Chưa hài lòng'].map(x => '<button data-lv>' + x + '</button>').join('') + '</div>' + s.btn('Gửi đánh giá', true);
        let sr = 0, lv = ''; $$('[data-sr]', s.body).forEach(b => b.onclick = () => { sr = +b.dataset.sr; $$('[data-sr]', s.body).forEach(x => x.classList.toggle('on', +x.dataset.sr <= sr)); A.SND.tap(); });
        $$('[data-lv]', s.body).forEach(b => b.onclick = () => { lv = b.textContent; $$('[data-lv]', s.body).forEach(x => x.classList.toggle('on', x === b)); });
        s.on('[data-good]', () => (sr && lv) ? s.ok() : s.fail('Chọn số sao và mức hài lòng.')); } }
    ] });
};
})();
