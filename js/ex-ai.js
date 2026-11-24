/* =========================================================
   PHẦN 1 – BÀI THỰC HÀNH AI CƠ BẢN (chạy hoàn toàn trên trình duyệt)
   "AI mô phỏng" là bộ quy tắc viết sẵn để minh hoạ hệ quả của câu lệnh,
   không gửi dữ liệu đi đâu cả.
   ========================================================= */
(function(){
const A = window.APP, $ = A.$, $$ = A.$$, esc = A.esc, I = window.ICON, EX = window.EX, F = window.FAKE;
const SC = window.COURSE.scenario;
const phieu = () => '<div class="card pad-s" style="background:#fffbeb;border-color:#fde68a"><h4 style="display:flex;gap:8px;align-items:center">' + I('file') + 'Phiếu thông tin gốc</h4><table class="tbl">' + SC.rows.map(r => '<tr><td style="width:36%"><b>' + r[0] + '</b></td><td>' + r[1] + '</td></tr>').join('') + '</table></div>';

/* 1. Phân loại dữ liệu */
EX.phanloai = function(stage, ctx){
  stage.innerHTML = A.mission(['Đọc từng thẻ dữ liệu.', 'Xếp vào ô **Được phép**, **Cần cân nhắc** hoặc **Tuyệt đối cấm** đưa lên chatbot AI công cộng.', 'Bấm **Kiểm tra** – thẻ sai sẽ hiện lý do.'], 'Mẹo: nếu thông tin giúp nhận ra một người cụ thể hoặc chưa được công bố – hãy dừng lại.') + '<div data-s style="margin-top:16px"></div>';
  A.sorter($('[data-s]', stage), {
    bins: [{ k: 'ok', t: 'Được phép', cls: 'b-ok', ic: 'check' }, { k: 'can', t: 'Cần cân nhắc', cls: 'b-warn', ic: 'alert' }, { k: 'cam', t: 'Tuyệt đối cấm', cls: 'b-no', ic: 'ban' }],
    items: [
      { x: 'Tình huống giả định “Tổng vệ sinh môi trường” dùng trên lớp', k: 'ok' },
      { x: 'Mẫu thông báo đã đăng công khai trên cổng thông tin xã', k: 'ok' },
      { x: 'Toàn văn Nghị định 30/2020/NĐ-CP', k: 'ok', why: 'Văn bản pháp luật đã ban hành công khai.' },
      { x: 'Bảng số liệu thu gom rác đã xoá tên, địa chỉ hộ dân (ẩn danh)', k: 'ok' },
      { x: 'Dự thảo tờ trình nội bộ chưa được thông qua', k: 'can', why: 'Chưa công bố – chỉ dùng chế độ tạm thời, bỏ chi tiết nhạy cảm.' },
      { x: 'Số liệu thống kê kinh tế của xã chưa công bố chính thức', k: 'can' },
      { x: 'Ảnh chụp tài liệu họp nội bộ của ngành', k: 'can' },
      { x: 'Danh sách cử tri chưa kiểm duyệt', k: 'can' },
      { x: 'Hồ sơ xin trợ cấp của một hộ dân kèm ảnh căn cước', k: 'cam', why: 'Dữ liệu cá nhân của công dân.' },
      { x: 'Danh sách số điện thoại thật của người dân trong ấp', k: 'cam' },
      { x: 'Công văn đóng dấu MẬT', k: 'cam' },
      { x: 'Mật khẩu hộp thư công vụ để AI “đăng nhập giúp”', k: 'cam', why: 'Mật khẩu, chữ ký số không bao giờ đưa cho bất kỳ ai.' }
    ],
    onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Bạn xếp đúng **' + ok + '/' + n + '** thẻ. Nguyên tắc: dữ liệu công dân, tài liệu mật, mật khẩu – **không bao giờ** đưa lên AI công cộng.')
  });
};

/* 2. Cài đặt quyền riêng tư */
EX.caidat = function(stage, ctx){
  const S = [
    { t: 'Dùng nội dung trò chuyện của tôi để huấn luyện, cải thiện mô hình', want: false, why: 'Tắt để nội dung công việc không được dùng làm dữ liệu huấn luyện.' },
    { t: 'Trò chuyện tạm thời cho phiên đang soạn dự thảo nội bộ', want: true, why: 'Phiên tạm thời không lưu vào lịch sử.' },
    { t: 'Cho phép ai có đường link cũng xem được cuộc trò chuyện', want: false, why: 'Không chia sẻ công khai nội dung công vụ.' },
    { t: 'Đăng nhập bằng một tài khoản dùng chung cho cả bộ phận', want: false, why: 'Mỗi người một tài khoản để quản lý trách nhiệm.' },
    { t: 'Xác thực hai lớp khi đăng nhập', want: true, why: 'Chống chiếm tài khoản khi lộ mật khẩu.' },
    { t: 'Tự ghi nhớ thông tin cá nhân tôi kể trong các cuộc trò chuyện', want: false, why: 'Hạn chế lưu thông tin cá nhân khi làm việc công vụ.' }
  ];
  const H = [
    { t: 'Gợi ý bố cục infographic tổng vệ sinh', del: false },
    { t: 'Tóm tắt danh sách hộ nghèo Ấp Mẫu 1 (có số CCCD)', del: true },
    { t: 'Sửa lỗi chính tả thông báo họp dân', del: false }
  ];
  const on = S.map(() => Math.random() > .5), dl = H.map(() => false);
  stage.innerHTML = A.mission(['Đây là bảng cài đặt của một **chatbot AI mô phỏng**.', 'Bật/tắt từng tuỳ chọn cho an toàn khi làm việc công vụ.', 'Trong lịch sử trò chuyện, **xoá** phiên có dữ liệu nhạy cảm.', 'Bấm **Lưu cài đặt** để chấm.']) +
    '<div class="two" style="margin-top:16px"><div class="card"><h3>' + I('lock') + ' Cài đặt dữ liệu</h3><div data-sw></div></div><div class="card"><h3>' + I('clock') + ' Lịch sử trò chuyện</h3><div data-hi></div></div></div><div class="btnrow" style="margin-top:14px"><button class="btn big" data-chk>' + I('check') + 'Lưu cài đặt</button></div><div data-res style="margin-top:16px"></div>';
  const sw = (v) => '<span style="width:52px;height:30px;border-radius:99px;background:' + (v ? '#0f766e' : '#cbd5e1') + ';position:relative;flex:none;transition:.2s"><i style="position:absolute;top:3px;left:' + (v ? 25 : 3) + 'px;width:24px;height:24px;border-radius:50%;background:#fff;transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.3)"></i></span>';
  const draw = () => {
    $('[data-sw]', stage).innerHTML = S.map((s, i) => '<button class="listrow" data-t="' + i + '" style="justify-content:space-between;border-radius:14px"><span>' + esc(s.t) + '</span>' + sw(on[i]) + '</button>').join('');
    $('[data-hi]', stage).innerHTML = H.map((h, i) => '<div class="listrow" style="cursor:default;' + (dl[i] ? 'opacity:.4;text-decoration:line-through' : '') + '"><span style="flex:1">' + I('message') + ' ' + esc(h.t) + '</span><button class="btn small ' + (dl[i] ? 'ghost' : 'danger') + '" data-d="' + i + '">' + (dl[i] ? 'Hoàn tác' : 'Xoá') + '</button></div>').join('');
  };
  draw();
  stage.addEventListener('click', e => {
    const t = e.target.closest('[data-t]'); if (t) { on[+t.dataset.t] = !on[+t.dataset.t]; A.SND.tap(); draw(); }
    const d = e.target.closest('[data-d]'); if (d) { dl[+d.dataset.d] = !dl[+d.dataset.d]; A.SND.flip(); draw(); }
  });
  $('[data-chk]', stage).onclick = () => {
    let ok = 0; const fb = [];
    S.forEach((s, i) => { if (on[i] === s.want) ok++; else fb.push('• ' + s.t + ': nên **' + (s.want ? 'BẬT' : 'TẮT') + '** – ' + s.why); });
    H.forEach((h, i) => { if (dl[i] === h.del) ok++; else fb.push('• Phiên “' + h.t + '”: ' + (h.del ? 'cần **xoá** vì chứa dữ liệu cá nhân.' : 'không cần xoá.')); });
    A.showResult($('[data-res]', stage), ctx, ok, S.length + H.length, fb.length ? fb.join('<br>') : 'Mọi cài đặt đều an toàn. Lưu ý: tên các tuỳ chọn khác nhau giữa các công cụ AI – hãy tìm đúng ý nghĩa.');
  };
};

/* 3. Xưởng prompt 6 thành phần + AI mô phỏng */
EX.prompt6 = function(stage, ctx){
  const C = [
    { k: 'role', t: 'Vai trò', ph: 'Bạn là / Tôi là…', ch: ['Tôi là cán bộ văn phòng UBND xã.', 'Bạn là chuyên gia viết quảng cáo.'], test: s => /(cán bộ|công chức|văn phòng|ubnd|chuyên trách)/i.test(s) },
    { k: 'task', t: 'Nhiệm vụ', ph: 'Hãy soạn…', ch: ['Hãy soạn dự thảo THÔNG BÁO tổ chức tổng vệ sinh môi trường.', 'Viết gì đó về vệ sinh.'], test: s => /(soạn|viết|lập|tạo).*(thông báo|kế hoạch|tờ trình|dự thảo)/i.test(s) },
    { k: 'input', t: 'Dữ liệu vào', ph: 'Dựa duy nhất vào…', ch: ['Dựa duy nhất vào phiếu thông tin đính kèm dưới đây.', 'Tự tìm thông tin trên mạng.'], test: s => /(dựa|theo|căn cứ).*(phiếu|dữ liệu|thông tin).*(đính kèm|dưới|sau)/i.test(s) && !/trên mạng/i.test(s) },
    { k: 'aud', t: 'Đối tượng đọc', ph: 'Người đọc là…', ch: ['Người đọc là người dân và trưởng các ấp trong xã.', ''], test: s => /(người dân|nhân dân|trưởng ấp|cán bộ|lãnh đạo|hộ gia đình)/i.test(s) },
    { k: 'fmt', t: 'Định dạng', ph: 'Trình bày dạng…', ch: ['Trình bày đúng thể thức thông báo hành chính, nội dung chia mục rõ ràng.', 'Viết thật dài.'], test: s => /(thể thức|mục|bảng|đầu dòng|gạch đầu|trình bày)/i.test(s) },
    { k: 'con', t: 'Ràng buộc', ph: 'Không được…', ch: ['Không thêm thông tin ngoài dữ liệu; chỗ thiếu (số hiệu, người ký, số điện thoại) ghi [Cần bổ sung].', 'Viết sao cho hay là được.'], test: s => /(không).*(bịa|thêm|suy diễn|tự)/i.test(s) || /cần bổ sung/i.test(s) }
  ];
  const val = {}; C.forEach(c => val[c.k] = '');
  stage.innerHTML = A.mission(['Ghép câu lệnh từ **6 thành phần** – chọn gợi ý hoặc tự gõ.', 'Đồng hồ chấm điểm cập nhật ngay khi bạn gõ.', 'Bấm **Gửi cho AI mô phỏng** để xem bản nháp. Chỗ <span style="background:#fee2e2">đỏ</span> là AI bịa; chỗ <span style="background:#fef9c3">vàng</span> là AI đánh dấu cần bổ sung.', 'Đạt khi câu lệnh có **ít nhất 5/6** thành phần và bản nháp **không còn lỗi bịa**.'], 'Thử cố tình gửi câu lệnh thiếu Ràng buộc để thấy AI “sáng tác” ra sao!') +
    '<div class="two wide" style="margin-top:16px"><div><div data-f></div></div><div>' + phieu() + '<div class="scorebox" style="margin-top:14px"><b>Độ chặt của câu lệnh</b><div class="ring" data-ring style="--v:0"><b data-sc>0/6</b></div><div class="small" data-miss></div></div></div></div>' +
    '<div class="card" style="margin-top:16px"><div class="ph" style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><h3 style="margin:0">' + I('message') + ' Câu lệnh hoàn chỉnh</h3><div class="btnrow"><button class="btn small ghost" data-cp>' + I('copy') + 'Chép câu lệnh</button><button class="btn sun" data-go>' + I('bot') + 'Gửi cho AI mô phỏng</button></div></div><pre data-full style="white-space:pre-wrap;font:500 .95rem/1.6 var(--f);background:#f8fafc;border-radius:12px;padding:12px;margin:10px 0 0;min-height:60px"></pre></div>' +
    '<div class="aibox" style="margin-top:16px" hidden data-ai><div class="aih"><span class="dot"></span>AI mô phỏng đang viết… (bộ quy tắc minh hoạ, không phải AI thật)</div><div class="out" data-out></div></div><div data-audit style="margin-top:14px"></div><div data-res style="margin-top:16px"></div>';
  $('[data-f]', stage).innerHTML = C.map((c, i) => '<div class="card pad-s" style="margin-bottom:10px"><div class="field" style="margin:0"><label for="pf' + c.k + '"><span class="chip vio">' + (i + 1) + '</span> ' + c.t + ' <span data-ok="' + c.k + '"></span></label><textarea id="pf' + c.k + '" data-k="' + c.k + '" rows="2" style="min-height:56px" placeholder="' + c.ph + '"></textarea><div class="chips">' + c.ch.filter(Boolean).map(x => '<button data-ch="' + c.k + '">' + esc(x) + '</button>').join('') + '</div></div></div>').join('');
  const full = () => C.map(c => val[c.k].trim()).filter(Boolean).join('\n');
  let cnt = 0;
  const upd = () => {
    cnt = 0; const miss = [];
    C.forEach(c => { const g = c.test(val[c.k]); if (g) cnt++; else miss.push(c.t); $('[data-ok="' + c.k + '"]', stage).innerHTML = g ? '<span class="chip ok">✓ đạt</span>' : (val[c.k].trim() ? '<span class="chip warn">chưa rõ</span>' : ''); });
    $('[data-ring]', stage).style.setProperty('--v', Math.round(cnt * 100 / 6)); $('[data-sc]', stage).textContent = cnt + '/6';
    $('[data-miss]', stage).textContent = miss.length ? 'Chưa đạt: ' + miss.join(', ') : 'Câu lệnh rất chặt chẽ!';
    $('[data-full]', stage).textContent = full() || '(Câu lệnh sẽ hiện ở đây)';
  };
  stage.addEventListener('input', e => { const t = e.target.closest('[data-k]'); if (t) { val[t.dataset.k] = t.value; upd(); } });
  stage.addEventListener('click', e => { const b = e.target.closest('[data-ch]'); if (b) { const k = b.dataset.ch, ta = $('[data-k="' + k + '"]', stage); ta.value = b.textContent; val[k] = b.textContent; A.SND.tap(); upd(); } });
  $('[data-cp]', stage).onclick = () => A.copy(full());
  upd();
  let stop = null;
  $('[data-go]', stage).onclick = () => {
    if (!full()) { A.toast('Hãy viết câu lệnh trước'); return; }
    const has = {}; C.forEach(c => has[c.k] = c.test(val[c.k]));
    const P = [], errs = [];
    const H = (x, why, fix) => { P.push({ x, c: 'hl' }); errs.push([x, why, fix]); }, G = x => P.push({ x, c: 'gap' }), T = x => P.push({ x });
    if (!has.role) { T('Chào cả nhà ơi!!! 🎉 '); H('Sự kiện siêu hoành tráng sắp diễn ra', 'Giọng văn quảng cáo, không phải văn bản hành chính', 'Vai trò'); T('!\n\n'); }
    T('ỦY BAN NHÂN DÂN XÃ '); if (has.con) G('[Cần bổ sung tên xã]'); else T('TÂN XUÂN'); T('\n');
    if (has.con) { T('Số: '); G('[Cần bổ sung]'); T('/TB-UBND\n\n'); } else { T('Số: '); H('125/TB-UBND', 'AI tự đặt số hiệu văn bản', 'Ràng buộc'); T('\n\n'); }
    T('THÔNG BÁO\nVề việc tổ chức tổng vệ sinh môi trường\n\n');
    if (!has.con) { H('Căn cứ Nghị định số 110/2004/NĐ-CP về công tác văn thư;', 'Viện dẫn nghị định đã hết hiệu lực (thay bằng NĐ 30/2020)', 'Ràng buộc'); T('\n'); }
    T('Thời gian: '); if (has.input) T('07 giờ 00 phút, ngày 25 tháng 07 năm 2026.\n'); else { H('07 giờ 30 phút, Chủ nhật ngày 27/7/2026', 'AI tự đặt ngày giờ vì không có dữ liệu gốc', 'Dữ liệu vào'); T('.\n'); }
    T('Địa điểm: '); if (has.input) T('Các tuyến đường và khu dân cư trên toàn địa bàn xã.\n'); else { H('Tập trung tại Nhà văn hoá xã', 'AI tự đổi địa điểm', 'Dữ liệu vào'); T('.\n'); }
    if (has.fmt) T('\n1. Người dân tự quét dọn vỉa hè trước nhà.\n2. Trưởng ấp điều phối và thông báo điểm gom rác tập kết.\n'); else T('\nNgười dân quét dọn trước nhà, trưởng ấp điều phối, mọi người cùng làm cho sạch đẹp quê hương và nhiều hoạt động bổ ích khác.\n');
    if (!has.con) { H('Khẩu hiệu: “Xanh – Sạch – Đẹp – Văn minh – Hiện đại”', 'AI tự thêm khẩu hiệu không có trong dữ liệu', 'Ràng buộc'); T('\n'); }
    T('Liên hệ: '); if (has.con) { G('[Cần bổ sung số điện thoại]'); T('\n'); } else { H('Đường dây nóng 0123.456.000', 'AI bịa số điện thoại', 'Ràng buộc'); T('\n'); }
    T('\nKT. CHỦ TỊCH\nPHÓ CHỦ TỊCH\n'); if (has.con) G('[Cần bổ sung người ký]'); else H('Trần Văn B', 'AI tự đặt tên người ký', 'Ràng buộc');
    if (!has.aud) T('\n\n(Ghi chú: chưa rõ đối tượng đọc nên văn phong chung chung.)');
    if (has.con && has.input) { T('\n\n— Danh sách thông tin còn thiếu: số hiệu văn bản, người ký, số điện thoại liên hệ, tên xã đầy đủ.'); }
    $('[data-ai]', stage).hidden = false; $('[data-audit]', stage).innerHTML = '';
    stop && stop(); A.SND.tap();
    $('[data-ai]', stage).scrollIntoView({ behavior: 'smooth', block: 'start' });
    stop = A.typeOut($('[data-out]', stage), P, 12, () => {
      $('[data-audit]', stage).innerHTML = errs.length
        ? '<div class="card"><h3>' + I('search') + ' Soi lỗi: ' + errs.length + ' chỗ AI bịa hoặc sai</h3><div class="tblw"><table class="tbl"><tr><th>Đoạn AI viết</th><th>Vấn đề</th><th>Thành phần còn thiếu</th></tr>' + errs.map(e => '<tr><td><span style="background:#fee2e2;padding:0 4px;border-radius:4px">' + esc(e[0]) + '</span></td><td>' + esc(e[1]) + '</td><td><span class="chip vio">' + esc(e[2]) + '</span></td></tr>').join('') + '</table></div><p class="small" style="margin:8px 0 0">Bổ sung thành phần còn thiếu rồi gửi lại.</p></div>'
        : '<div class="note ok">' + I('check') + '<div><b>Không còn chỗ bịa!</b> AI chỉ dùng dữ liệu gốc và đánh dấu <span style="background:#fef9c3">[Cần bổ sung]</span> để bạn tự điền. Đây chính là “Prompt vạn năng” của khoá học.</div></div>';
      if (cnt >= 5 && !errs.length) A.showResult($('[data-res]', stage), ctx, cnt, 6, 'Câu lệnh của bạn đạt **' + cnt + '/6** thành phần. Hãy lưu nó vào thư viện prompt với mã **PR-TB-01**.');
    });
  };
  return () => stop && stop();
};

/* 4. Chọn kỹ thuật phù hợp */
EX.kythuat = function(stage, ctx){
  stage.innerHTML = A.mission(['Mỗi thẻ là một yêu cầu công việc thường gặp ở xã.', 'Xếp vào kỹ thuật phù hợp nhất: **Tóm tắt**, **Phân tích**, **Ví dụ mẫu (few-shot)**, **Chia nhỏ tài liệu**.']) + '<div data-s style="margin-top:16px"></div>';
  A.sorter($('[data-s]', stage), {
    bins: [{ k: 'tt', t: 'Tóm tắt', cls: 'b-info', ic: 'list' }, { k: 'pt', t: 'Phân tích', cls: 'b-vio', ic: 'chart' }, { k: 'fs', t: 'Ví dụ mẫu (few-shot)', cls: 'b-ok', ic: 'copy' }, { k: 'cn', t: 'Chia nhỏ tài liệu', cls: 'b-warn', ic: 'layers' }],
    items: [
      { x: 'Rút biên bản họp 6 trang thành 5 ý chính cho lãnh đạo, giữ nguyên số liệu', k: 'tt' },
      { x: 'Làm bản tin nhanh 1 trang từ báo cáo tháng', k: 'tt' },
      { x: 'Giải thích vì sao số hộ đăng ký tài khoản tháng này giảm', k: 'pt' },
      { x: 'So sánh hai phương án bố trí điểm tập kết rác và nêu ưu nhược điểm', k: 'pt' },
      { x: 'Đề xuất giải pháp tăng số phản ánh hiện trường có ảnh rõ nét', k: 'pt' },
      { x: 'Muốn thông báo mới có giọng văn giống các thông báo xã đã ban hành', k: 'fs', why: 'Dán 1–2 mẫu đã xoá thông tin thật để AI học cấu trúc.' },
      { x: 'Soạn kế hoạch theo đúng khung mục của kế hoạch năm trước', k: 'fs' },
      { x: 'Tệp PDF 80 trang, cần số liệu trong bảng ở trang 7', k: 'cn', why: 'Chỉ rõ trang hoặc tách riêng phần cần xử lý.' },
      { x: 'AI báo “đã đọc xong” nhưng chỉ tóm tắt mấy trang đầu', k: 'cn' },
      { x: 'Tổng hợp ý kiến từ 15 biên bản họp ấp dài', k: 'cn', why: 'Tóm tắt từng biên bản trước, rồi mới tổng hợp.' }
    ],
    onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Tóm tắt giữ nguyên ý và số liệu; phân tích cần con người kiểm tra lập luận; ví dụ mẫu giúp đồng bộ văn phong; tài liệu dài thì chia nhỏ.')
  });
};

/* 5. Dàn trang thể thức (NĐ 30/2020) */
EX.thethuc = function(stage, ctx){
  const P = [
    { k: 'cq', x: 'ỦY BAN NHÂN DÂN<br><b>XÃ TÂN XUÂN</b>', n: 'Tên cơ quan ban hành' },
    { k: 'qh', x: '<b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b><u>Độc lập – Tự do – Hạnh phúc</u></b>', n: 'Quốc hiệu và Tiêu ngữ' },
    { k: 'so', x: 'Số: [Cần bổ sung]/TB-UBND', n: 'Số, ký hiệu' },
    { k: 'dd', x: '<i>Tân Xuân, ngày … tháng 7 năm 2026</i>', n: 'Địa danh, thời gian' },
    { k: 'tl', x: '<b>THÔNG BÁO</b><br><b>Về việc tổ chức tổng vệ sinh môi trường</b>', n: 'Tên loại và trích yếu' },
    { k: 'nd', x: 'Ủy ban nhân dân xã thông báo tổ chức tổng vệ sinh môi trường vào 07 giờ 00 phút, ngày 25/7/2026…', n: 'Nội dung' },
    { k: 'nn', x: '<b><i>Nơi nhận:</i></b><br>- Như trên;<br>- Lưu: VT.', n: 'Nơi nhận' },
    { k: 'ky', x: '<b>KT. CHỦ TỊCH<br>PHÓ CHỦ TỊCH</b><br><br>[Chữ ký, dấu]<br><b>[Cần bổ sung họ tên]</b>', n: 'Quyền hạn, chức vụ, người ký' }
  ];
  const slots = [['cq', '1 / 1 / 2 / 2', 'center'], ['qh', '1 / 2 / 2 / 3', 'center'], ['so', '2 / 1 / 3 / 2', 'center'], ['dd', '2 / 2 / 3 / 3', 'center'], ['tl', '3 / 1 / 4 / 3', 'center'], ['nd', '4 / 1 / 5 / 3', 'left'], ['nn', '5 / 1 / 6 / 2', 'left'], ['ky', '5 / 2 / 6 / 3', 'center']];
  const put = {}; let pick = null, checked = false;
  stage.innerHTML = A.mission(['Chạm một **thành phần thể thức** ở khay bên dưới.', 'Chạm vào **ô trống** trên trang giấy nơi thành phần đó cần đặt.', 'Đủ 8 ô thì bấm **Kiểm tra**.'], 'Nhớ quy tắc trên trang chiếu: AI không tự đặt số văn bản, không tự điền người ký.') +
    '<div class="two wide" style="margin-top:16px"><div class="paper" style="display:grid;grid-template-columns:1fr 1.35fr;gap:10px;min-height:520px" data-paper>' + slots.map(s => '<div data-slot="' + s[0] + '" style="grid-area:' + s[1] + ';text-align:' + s[2] + ';border:2px dashed #cbd5e1;border-radius:8px;padding:8px;min-height:' + (s[0] === 'nd' ? 150 : 58) + 'px;cursor:pointer;font-size:13.5px;display:flex;flex-direction:column;justify-content:center"></div>').join('') + '</div>' +
    '<div><div class="card pad-s"><h4>' + I('layers') + ' Khay thành phần</h4><div class="chips" data-tray style="flex-direction:column;align-items:stretch"></div></div><div class="btnrow" style="margin-top:12px"><button class="btn big" data-chk>' + I('check') + 'Kiểm tra</button><button class="btn ghost" data-clr>' + I('refresh') + 'Xếp lại</button></div></div></div><div data-res style="margin-top:16px"></div>';
  const draw = () => {
    $('[data-tray]', stage).innerHTML = P.filter(p => !Object.values(put).includes(p.k)).map(p => '<button data-p="' + p.k + '" class="' + (pick === p.k ? 'on' : '') + '" style="text-align:left;border-radius:14px">' + esc(p.n) + '</button>').join('') || '<span class="small">Đã đặt đủ – bấm Kiểm tra.</span>';
    $$('[data-slot]', stage).forEach(el => { const k = put[el.dataset.slot]; const p = P.find(x => x.k === k); el.innerHTML = p ? p.x : '<span class="small" style="font-family:var(--f)">Chạm để đặt</span>'; el.style.borderStyle = p ? 'solid' : 'dashed'; el.style.borderColor = pick && !p ? '#f59e0b' : (p ? '#e2e8f0' : '#cbd5e1'); });
  };
  draw();
  stage.addEventListener('click', e => {
    if (checked) return;
    const b = e.target.closest('[data-p]'); if (b) { pick = pick === b.dataset.p ? null : b.dataset.p; A.SND.flip(); draw(); return; }
    const s = e.target.closest('[data-slot]'); if (s) { if (put[s.dataset.slot] && !pick) { delete put[s.dataset.slot]; draw(); return; } if (!pick) { A.toast('Chọn một thành phần trong khay trước'); return; } put[s.dataset.slot] = pick; pick = null; A.SND.tap(); draw(); }
  });
  $('[data-clr]', stage).onclick = () => { if (checked) return; Object.keys(put).forEach(k => delete put[k]); draw(); };
  $('[data-chk]', stage).onclick = () => {
    if (Object.keys(put).length < 8) { A.toast('Hãy đặt đủ 8 thành phần'); A.SND.no(); return; }
    checked = true; let ok = 0;
    $$('[data-slot]', stage).forEach(el => { const g = put[el.dataset.slot] === el.dataset.slot; if (g) ok++; el.style.borderColor = g ? '#4ade80' : '#f87171'; el.style.background = g ? '#f0fdf4' : '#fef2f2'; if (!g) { const right = P.find(p => p.k === el.dataset.slot); el.insertAdjacentHTML('beforeend', '<div class="small" style="font-family:var(--f);color:#b91c1c;margin-top:4px">Ô này dành cho: ' + right.n + '</div>'); } });
    A.showResult($('[data-res]', stage), ctx, ok, 8, 'Bố cục chuẩn: tên cơ quan và số ký hiệu bên trái; quốc hiệu – tiêu ngữ, địa danh – thời gian bên phải; tên loại, trích yếu ở giữa; nơi nhận bên trái, chữ ký bên phải.');
  };
};

/* 6. Săn ảo giác */
EX.aogiac = function(stage, ctx){
  const D = [
    ['ỦY BAN NHÂN DÂN XÃ TÂN XUÂN', 0], ['\n'], ['Số: ', null], ['125/TB-UBND', 1, 'Số hiệu do AI tự đặt – phải để [Cần bổ sung] cho văn thư cấp số.'],
    ['\n\nTHÔNG BÁO\nVề việc tổ chức tổng vệ sinh môi trường\n\n'],
    ['Căn cứ Nghị định số 110/2004/NĐ-CP về công tác văn thư;', 1, 'Nghị định đã hết hiệu lực từ 05/3/2020 (thay bằng NĐ 30/2020/NĐ-CP).'], ['\n'],
    ['Ủy ban nhân dân xã tổ chức tổng vệ sinh môi trường vào lúc ', null], ['07 giờ 30 phút, Chủ nhật ngày 27/7/2026', 1, 'Phiếu gốc: 07 giờ 00 phút, ngày 25/07/2026.'], ['.\n'],
    ['Địa điểm: ', null], ['tập trung tại Nhà văn hoá xã', 1, 'Phiếu gốc: các tuyến đường và khu dân cư trên toàn địa bàn xã.'], ['.\n'],
    ['Đề nghị ', null], ['người dân tự quét dọn vỉa hè trước nhà', 0], ['; ', null], ['Trưởng ấp điều phối và thông báo điểm gom rác tập kết', 0], ['.\n'],
    ['Khẩu hiệu hưởng ứng: “Xanh – Sạch – Đẹp – Văn minh – Hiện đại”', 1, 'Khẩu hiệu không có trong dữ liệu gốc.'], ['.\n'],
    ['Mọi thắc mắc liên hệ ', null], ['đường dây nóng 0123.456.000', 1, 'Số điện thoại do AI bịa.'], ['.\n\n'],
    ['KT. CHỦ TỊCH\nPHÓ CHỦ TỊCH\n', null], ['Trần Văn B', 1, 'Tên người ký do AI tự đặt.']
  ];
  const total = D.filter(d => d[1] === 1).length;
  stage.innerHTML = A.mission(['Đọc **phiếu thông tin gốc** bên phải.', 'Bấm vào những chỗ trong bản nháp AI **không khớp** hoặc **do AI tự bịa**.', 'Có **' + total + ' lỗi**. Bấm nhầm chỗ đúng sẽ bị trừ điểm.', 'Xong thì bấm **Nộp kết quả**.']) +
    '<div class="two wide" style="margin-top:16px"><div class="paper" data-paper style="white-space:pre-wrap">' + D.map((d, i) => d[1] == null ? esc(d[0]) : '<span class="span" data-i="' + i + '" tabindex="0">' + esc(d[0]) + '</span>').join('') + '</div><div>' + phieu() +
    '<div class="scorebox" style="margin-top:14px"><b>Đã tìm thấy</b><div class="ring" data-ring style="--v:0"><b data-sc>0/' + total + '</b></div><div class="small">Bấm nhầm: <b data-wr>0</b></div></div><div class="btnrow" style="margin-top:12px"><button class="btn big" data-chk>' + I('check') + 'Nộp kết quả</button></div></div></div><div data-why style="margin-top:14px"></div><div data-res style="margin-top:16px"></div>';
  let found = 0, wrong = 0, done = false; const log = [];
  stage.addEventListener('click', e => {
    const s = e.target.closest('.span[data-i]'); if (!s || done || s.classList.contains('found')) return;
    const d = D[+s.dataset.i];
    if (d[1] === 1) { s.classList.add('found'); found++; A.SND.ok(); log.push(d); }
    else { wrong++; s.classList.remove('wrongpick'); void s.offsetWidth; s.classList.add('wrongpick'); A.SND.no(); A.toast('Chỗ này khớp với phiếu gốc'); }
    $('[data-sc]', stage).textContent = found + '/' + total; $('[data-ring]', stage).style.setProperty('--v', Math.round(found * 100 / total)); $('[data-wr]', stage).textContent = wrong;
    $('[data-why]', stage).innerHTML = log.length ? '<div class="card"><h4>' + I('search') + ' Lỗi đã phát hiện</h4><ul class="checks">' + log.map(d => '<li class="bad"><span class="d">!</span><span><b>' + esc(d[0]) + '</b> – ' + esc(d[2]) + '</span></li>').join('') + '</ul></div>' : '';
    if (found === total) $('[data-chk]', stage).click();
  });
  $('[data-chk]', stage).onclick = () => {
    if (done) return; done = true;
    $$('.span[data-i]', stage).forEach(s => { const d = D[+s.dataset.i]; if (d[1] === 1 && !s.classList.contains('found')) s.classList.add('miss'); });
    const miss = D.filter((d, i) => d[1] === 1 && !$('.span[data-i="' + i + '"]', stage).classList.contains('found'));
    const score = Math.max(0, found - wrong);
    A.showResult($('[data-res]', stage), ctx, score, total, (miss.length ? 'Còn sót (viền nét đứt): ' + miss.map(d => '“' + d[0] + '”').join(', ') + '. ' : '') + 'Đây đúng là 5 kiểu ảo giác: bịa số hiệu, viện dẫn văn bản hết hiệu lực, đổi ngày giờ – địa điểm, bịa người ký – số điện thoại, thêm khẩu hiệu.');
  };
};

/* 7. Bảng theo dõi việc */
EX.bangviec = function(stage, ctx){
  const NG = ['Người dân', 'Trưởng ấp', 'Đoàn Thanh niên xã', 'UBND xã', '[Chưa xác định]'];
  const TH = ['07 giờ 00, ngày 25/7/2026', 'Sáng 25/7/2026', 'Trước ngày 24/7/2026', '[Chưa xác định]'];
  const R = [
    ['Quét dọn vỉa hè trước nhà', 0, 0], ['Thông báo điểm gom rác tập kết cho người dân', 1, 2],
    ['Ra quân dọn các tuyến đường chính', 4, 1, 'Đoàn Thanh niên chỉ **phối hợp** – văn bản chưa nêu ai chủ trì.'],
    ['Thu gom, vận chuyển rác về nơi xử lý', 4, 3, 'Văn bản không nêu người phụ trách và thời hạn.'], ['Tổng hợp kết quả, báo cáo UBND xã', 4, 3, 'Không nêu ai tổng hợp, hạn khi nào.']
  ];
  stage.innerHTML = A.mission(['Đọc đoạn trích thông báo.', 'Với mỗi việc, chọn **Người phụ trách** và **Thời hạn** đúng như văn bản.', 'Văn bản không nói rõ → chọn **[Chưa xác định]**, không tự đoán.'], 'Bẫy thường gặp: biến người phối hợp thành người chịu trách nhiệm chính.') +
    '<div class="card" style="margin-top:16px;background:#fffbeb;border-color:#fde68a"><h4>' + I('file') + ' Trích thông báo (giả định)</h4><ol style="margin:0;padding-left:20px"><li>Người dân tự quét dọn vỉa hè trước nhà, bắt đầu từ 07 giờ 00 ngày 25/7/2026.</li><li>Trưởng ấp điều phối và thông báo điểm gom rác tập kết cho người dân trước ngày 24/7/2026.</li><li>Đoàn Thanh niên xã phối hợp ra quân dọn các tuyến đường chính trong buổi sáng 25/7/2026.</li><li>Thu gom, vận chuyển rác về nơi xử lý sau buổi ra quân.</li><li>Tổng hợp kết quả, báo cáo Ủy ban nhân dân xã.</li></ol></div>' +
    '<div class="tblw" style="margin-top:14px"><table class="tbl"><tr><th>STT</th><th>Việc cần làm</th><th>Người phụ trách</th><th>Thời hạn</th></tr>' + R.map((r, i) => '<tr data-r="' + i + '"><td>' + (i + 1) + '</td><td>' + esc(r[0]) + '<div data-n="' + i + '"></div></td><td><select data-a="' + i + '" class="field" style="padding:8px;border-radius:10px;border:2px solid var(--line);font:inherit;width:100%"><option value="">– chọn –</option>' + NG.map((x, k) => '<option value="' + k + '">' + x + '</option>').join('') + '</select></td><td><select data-b="' + i + '" style="padding:8px;border-radius:10px;border:2px solid var(--line);font:inherit;width:100%"><option value="">– chọn –</option>' + TH.map((x, k) => '<option value="' + k + '">' + x + '</option>').join('') + '</select></td></tr>').join('') + '</table></div>' +
    '<div class="btnrow" style="margin-top:12px"><button class="btn big" data-chk>' + I('check') + 'Kiểm tra bảng</button></div><div data-res style="margin-top:16px"></div>';
  $('[data-chk]', stage).onclick = () => {
    if ($$('select', stage).some(s => s.value === '')) { A.toast('Hãy chọn đủ các ô'); A.SND.no(); return; }
    let ok = 0;
    R.forEach((r, i) => {
      const a = $('[data-a="' + i + '"]', stage), b = $('[data-b="' + i + '"]', stage), ga = +a.value === r[1], gb = +b.value === r[2];
      ok += ga + gb; a.style.borderColor = ga ? '#4ade80' : '#f87171'; b.style.borderColor = gb ? '#4ade80' : '#f87171';
      $('[data-n="' + i + '"]', stage).innerHTML = (!ga || !gb) ? '<div class="small" style="color:#b91c1c">Đúng: ' + NG[r[1]] + ' · ' + TH[r[2]] + (r[3] ? ' – ' + A.mdRaw(r[3]) : '') + '</div>' : '';
    });
    A.showResult($('[data-res]', stage), ctx, ok, R.length * 2, 'Các việc thiếu đầu mối hoặc thời hạn được đánh dấu **[Chưa xác định]** để lãnh đạo hội ý – đúng câu hỏi thứ 6 của quản lý tiến độ.');
  };
};

/* 8. Tin Zalo */
EX.zalo = function(stage, ctx){
  const start = 'Căn cứ kế hoạch của UBND xã, kính gửi toàn thể nhân dân thông báo về việc tổ chức tổng vệ sinh môi trường trên địa bàn xã theo quy định.';
  const sample = '🌿 CHUNG TAY LÀM SẠCH XÓM ẤP 🌿\n\nBà con thân mến, UBND xã tổ chức Tổng vệ sinh môi trường:\n\n⏰ Thời gian: 07 giờ 00, ngày 25/7/2026\n📍 Địa điểm: các tuyến đường và khu dân cư toàn xã\n🧹 Mỗi nhà quét dọn vỉa hè trước nhà mình\n🗑️ Trưởng ấp sẽ thông báo điểm gom rác tập kết\n\n👉 Mời bà con cùng tham gia đúng giờ, rủ thêm hàng xóm nhé! Xóm sạch – nhà mình khoẻ!';
  const T = [
    ['Độ dài từ 40 đến 250 chữ', s => { const n = A.countWords(s); return n >= 40 && n <= 250; }, s => A.countWords(s) + ' chữ'],
    ['Giữ đúng giờ: 07 giờ 00 / 7h', s => /(0?7\s*(giờ|h|:00))/i.test(s)],
    ['Giữ đúng ngày: 25/7/2026', s => /25\s*[\/\-.]\s*0?7/.test(s) || /25 tháng 0?7/i.test(s)],
    ['Có địa điểm / việc cần làm (tuyến đường, khu dân cư, trước nhà)', s => /(tuyến đường|khu dân cư|trước nhà|vỉa hè)/i.test(s)],
    ['Có 3–5 đầu dòng', s => { const n = s.split('\n').filter(l => /^\s*([-•*+✅✔️👉⏰📍🧹🗑️🌿]|\d+[.)]|\p{Extended_Pictographic})/u.test(l)).length; return n >= 3 && n <= 6; }],
    ['Có lời kêu gọi hành động', s => /(hãy|mời|cùng|chung tay|tham gia|rủ)/i.test(s)],
    ['Không tự thêm số điện thoại', s => !/\d[\d .]{8,}\d/.test(s.replace(/25\s*\/\s*0?7\s*\/\s*2026/g, ''))],
    ['Bỏ từ hành chính rườm rà (căn cứ, kính gửi, nghị định)', s => !/(căn cứ|kính gửi|nghị định|theo quy định)/i.test(s)]
  ];
  stage.innerHTML = A.mission(['Viết lại thông báo thành **tin nhắn Zalo cho người dân** (bản nháp bên dưới còn rất “hành chính”).', 'Máy kiểm tra **8 tiêu chí** ngay khi bạn gõ; xem trước tin trên điện thoại.', 'Đạt ít nhất **7/8** tiêu chí thì bấm **Hoàn thành**.'], 'Dùng biểu tượng cảm xúc ở đầu dòng giúp tin dễ đọc trên điện thoại.') +
    '<div class="simwrap" style="margin-top:16px"><div>' + A.phoneHTML('app-svl', 'Nhóm Tin Ấp Mẫu 1', 'Nhóm trò chuyện – mô phỏng') + '</div><div class="simside"><div class="field"><label for="zt">Nội dung tin nhắn</label><textarea id="zt" data-t style="min-height:240px">' + esc(start) + '</textarea></div><div class="btnrow" style="margin-bottom:10px"><button class="btn small ghost" data-smp>' + I('sparkle') + 'Xem bài mẫu</button><button class="btn small ghost" data-cp>' + I('copy') + 'Chép</button></div><div class="card pad-s"><h4>Kiểm tra tự động <span class="chip" data-cnt></span></h4><ul class="checks" data-ck></ul></div><div class="btnrow" style="margin-top:12px"><button class="btn big sun" data-fin disabled>' + I('check') + 'Hoàn thành</button></div></div></div><div data-res style="margin-top:16px"></div>';
  const body = $('[data-sbody]', stage); body.style.background = '#e2e8f0'; $('[data-dots]', stage).remove();
  const ta = $('[data-t]', stage);
  let pass = 0;
  const upd = () => {
    const s = ta.value; pass = 0;
    $('[data-ck]', stage).innerHTML = T.map(t => { const g = t[1](s); if (g) pass++; return '<li class="' + (g ? 'on' : 'bad') + '"><span class="d">' + (g ? '✓' : '✕') + '</span><span>' + t[0] + (t[2] ? ' <span class="small">(' + t[2](s) + ')</span>' : '') + '</span></li>'; }).join('');
    $('[data-cnt]', stage).textContent = pass + '/8'; $('[data-fin]', stage).disabled = pass < 7;
    body.innerHTML = '<div class="chatlog"><div class="small" style="text-align:center;color:#64748b">Hôm nay</div><div class="bub in" style="opacity:1;animation:none;white-space:pre-wrap;max-width:92%"><b style="color:#0d9488;font-size:.75rem">Cán bộ văn phòng xã</b><br>' + esc(s || '…') + '</div></div>';
  };
  ta.addEventListener('input', upd); upd();
  $('[data-smp]', stage).onclick = () => { if (confirmReplace()) { ta.value = sample; upd(); A.toast('Đã chèn bài mẫu – hãy sửa theo cách của bạn'); } };
  function confirmReplace(){ return true; }
  $('[data-cp]', stage).onclick = () => A.copy(ta.value);
  $('[data-fin]', stage).onclick = () => A.showResult($('[data-res]', stage), ctx, pass, 8, 'Nhớ: tin Zalo chỉ đăng **sau khi** văn bản chính thức đã ký ban hành, và thông tin phải khớp văn bản đó.');
};

/* 9. Đèn xanh – vàng – đỏ */
EX.daoduc = function(stage, ctx){
  stage.innerHTML = A.mission(['Đọc từng tình huống công vụ.', 'Chọn **Phù hợp** (xanh), **Cân nhắc** (vàng – được nhưng phải có điều kiện) hoặc **Không được** (đỏ).']) + '<div data-c style="margin-top:16px"></div>';
  A.chain($('[data-c]', stage), { lights: true, list: [
    { q: 'Nhờ AI gợi ý bố cục infographic “Tổng vệ sinh môi trường” từ thông báo đã ký.', a: 'g', e: 'Nội dung đã công khai, AI chỉ hỗ trợ trình bày.' },
    { q: 'Dùng AI tạo hình con dấu đỏ của UBND xã để chèn vào thông báo gửi qua Zalo.', a: 'r', e: 'Cấm tạo, giả mạo con dấu, chữ ký số, quốc huy.' },
    { q: 'Dùng ảnh chân dung một cụ bà trong ấp (chưa hỏi ý kiến) làm ảnh minh hoạ tuyên truyền.', a: 'r', e: 'Phải có sự đồng ý của người trong ảnh.' },
    { q: 'Dán dự thảo kế hoạch nội bộ chưa thông qua vào chatbot để sửa câu chữ.', a: 'y', e: 'Cân nhắc: bỏ chi tiết nhạy cảm, dùng chế độ trò chuyện tạm thời, tắt huấn luyện.' },
    { q: 'Gửi thẳng bản nháp AI viết cho lãnh đạo ký mà không đọc lại.', a: 'r', e: 'AI chỉ tạo bản nháp – cán bộ phải rà soát trước khi trình ký.' },
    { q: 'Dùng AI tạo ảnh minh hoạ xóm ấp sạch đẹp, ghi chú “Ảnh minh hoạ do AI tạo”.', a: 'g', e: 'Minh bạch nội dung do AI tạo – phù hợp tinh thần Luật Trí tuệ nhân tạo.' },
    { q: 'Nhờ AI phân tích nguyên nhân số phản ánh tăng, rồi dùng nguyên văn kết luận đó trong báo cáo.', a: 'y', e: 'Phân tích cần con người kiểm tra chặt lập luận và số liệu trước khi dùng.' },
    { q: 'Dùng AI tạo đoạn ghi âm giả giọng Chủ tịch xã đọc thông báo.', a: 'r', e: 'Giả lập giọng nói người thật để phát ngôn thay là vi phạm đạo đức công vụ và dễ bị lợi dụng.' }
  ], onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Trách nhiệm cuối cùng luôn thuộc về cán bộ thực hiện và người ký ban hành.') });
};

/* 10. Quy trình 6 bước */
EX.quytrinh = function(stage, ctx){
  stage.innerHTML = A.mission(['Các bước của quy trình an toàn dùng AI soạn thảo đang bị xáo trộn.', 'Đưa về đúng thứ tự từ **chuẩn bị dữ liệu** đến **ban hành**.']) + '<div data-o style="margin-top:16px"></div>';
  A.orderer($('[data-o]', stage), { items: ['**Dữ liệu** – chuẩn bị thông tin sạch, bỏ dữ liệu nhạy cảm', '**Ra lệnh** – dùng prompt mẫu có ràng buộc chặt', '**Rà soát** – đối chiếu thủ công với dữ liệu nguồn', '**Thể thức** – chỉnh định dạng theo NĐ 30/2020', '**Trình ký** – nộp dự thảo cho lãnh đạo duyệt', '**Ban hành** – văn thư đóng dấu, phát hành'],
    onDone: (ok, n, res) => A.showResult(res, ctx, ok, n, 'Thứ tự: Dữ liệu → Ra lệnh → Rà soát → Thể thức → Trình ký → Ban hành.') });
};

/* 11. Đặt tên tệp prompt */
EX.thuvien = function(stage, ctx){
  const S = [
    { q: 'Bạn vừa tạo **mới** câu lệnh soạn Thông báo “Họp dân về đường giao thông nông thôn” trong **tháng 11/2026**.', code: 'PR-TB', ver: 'v1.0', ym: '2026-11' },
    { q: 'Bạn **sửa** bản `PR-Zalo_TongVeSinh_v1.2_2026-07.txt` để thêm ràng buộc “không tự thêm số điện thoại”, vào **tháng 08/2026** (sửa nhỏ).', code: 'PR-Zalo', ver: 'v1.3', ym: '2026-08' },
    { q: 'Bộ phận Một cửa tạo **mới** câu lệnh lập quy trình “Tiếp nhận phản ánh hiện trường”, **tháng 12/2026**.', code: 'PR-QT', ver: 'v1.0', ym: '2026-12' }
  ];
  let k = 0, ok = 0;
  const draw = () => {
    const s = S[k];
    $('[data-w]', stage).innerHTML = '<div class="sitcard"><div class="small">Tình huống ' + (k + 1) + '/3</div><div class="sq"><span class="n">' + (k + 1) + '</span><span>' + A.mdRaw(s.q.replace(/`(.+?)`/g, '<code>$1</code>')) + '</span></div>' +
      '<div class="grid g4"><div class="field"><label>Mã nhiệm vụ</label><select data-x="code">' + ['PR-TB', 'PR-Zalo', 'PR-BC', 'PR-QT'].map(x => '<option>' + x + '</option>').join('') + '</select></div><div class="field"><label>Tên prompt (viết liền, không dấu)</label><input data-x="name" placeholder="VD: HopDanDuongGiaoThong"></div><div class="field"><label>Phiên bản</label><select data-x="ver">' + ['v1.0', 'v1.2', 'v1.3', 'v2.0'].map(x => '<option>' + x + '</option>').join('') + '</select></div><div class="field"><label>Năm-tháng</label><input data-x="ym" placeholder="YYYY-MM"></div></div>' +
      '<div class="prompt" style="margin:6px 0 10px"><div class="ph"><b>Tên tệp</b></div><pre data-fn></pre></div><ul class="checks" data-ck></ul><div class="btnrow" style="margin-top:12px"><button class="btn" data-ok>' + I('check') + 'Lưu tên tệp</button></div><div data-fb></div></div>';
    upd();
  };
  const get = x => ($('[data-x="' + x + '"]', stage) || {}).value || '';
  const checks = () => { const s = S[k], nm = get('name'); return [['Đúng mã nhiệm vụ', get('code') === s.code], ['Tên viết liền, không dấu, không khoảng trắng', /^[A-Za-z0-9]{4,}$/.test(nm)], ['Phiên bản phù hợp (' + (s.ver === 'v1.0' ? 'tạo mới' : 'sửa nhỏ tăng số sau dấu chấm') + ')', get('ver') === s.ver], ['Năm-tháng đúng dạng và đúng thời điểm', get('ym') === s.ym]]; };
  const upd = () => { const fn = get('code') + '_' + (get('name') || 'TenPrompt') + '_' + get('ver') + '_' + (get('ym') || 'YYYY-MM') + '.txt'; $('[data-fn]', stage).textContent = fn; $('[data-ck]', stage).innerHTML = checks().map(c => '<li class="' + (c[1] ? 'on' : '') + '"><span class="d">' + (c[1] ? '✓' : '') + '</span>' + c[0] + '</li>').join(''); };
  stage.innerHTML = A.mission(['Với mỗi tình huống, ghép tên tệp theo quy ước **MãNhiệmVụ_TênPrompt_vPhiênBản_NămTháng.txt**.', 'Danh sách kiểm tra bên dưới sáng xanh khi từng phần đạt.']) + '<div data-w style="margin-top:16px"></div><div data-res></div>';
  stage.addEventListener('input', e => { if (e.target.closest('[data-x]')) upd(); });
  stage.addEventListener('change', e => { if (e.target.closest('[data-x]')) upd(); });
  stage.addEventListener('click', e => {
    if (!e.target.closest('[data-ok]')) return;
    const c = checks(), all = c.every(x => x[1]); if (all) ok++;
    const s = S[k]; A.SND[all ? 'ok' : 'no']();
    $('[data-fb]', stage).innerHTML = '<div class="fb ' + (all ? 'ok' : 'no') + '">' + I(all ? 'check' : 'alert') + '<div>' + (all ? 'Chuẩn! ' : 'Chưa chuẩn. Gợi ý: ') + '<code>' + s.code + '_…_' + s.ver + '_' + s.ym + '.txt</code></div></div><div class="btnrow" style="margin-top:10px"><button class="btn" data-nx>' + (k < 2 ? 'Tình huống tiếp' : 'Xem kết quả') + '</button></div>';
    $('[data-ok]', stage).disabled = true;
    $('[data-nx]', stage).onclick = () => { if (k < 2) { k++; draw(); } else { $('[data-w]', stage).innerHTML = ''; A.showResult($('[data-res]', stage), ctx, ok, 3, 'Ghi nhật ký thay đổi kèm mỗi lần nâng phiên bản và chuyển bản cũ vào thư mục Lưu trữ.'); } };
  });
  draw();
};
})();
