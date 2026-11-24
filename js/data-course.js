/* =========================================================
   NỘI DUNG GIÁO TRÌNH – Kỹ năng số cho cán bộ Xã Tân Xuân, tỉnh Vĩnh Long
   Bám sát tài liệu tập huấn (78 trang chiếu) + cập nhật văn bản đến 24/11/2026.
   Mọi dữ liệu cá nhân dùng trong bài là GIẢ ĐỊNH.
   Kiểu khối: p, h, ul, flow, tbl, note(k), law, ex, prompt, cmp, quiz, demo
   ========================================================= */
window.DATA = { site: { key: 'tanxuan-vl-v1', name: 'Kỹ năng số cho cán bộ xã', place: 'Xã Tân Xuân, tỉnh Vĩnh Long', checked: '24/11/2026' } };

/* Dữ liệu giả định dùng chung trong mọi bài mô phỏng */
window.FAKE = {
  name: 'NGUYỄN VĂN MẪU', dob: '01/01/1990', id: '000190012345', idShow: '000 190 012 345',
  phone: '0123456789', phoneShow: '0123 456 789', bhyt: 'MP4000000000001', addr: 'Ấp Mẫu 1, Xã Tân Xuân, Tỉnh Vĩnh Long',
  note: 'Số định danh bắt đầu bằng 000 (không có mã tỉnh nào là 000), số điện thoại đầu 012 (đầu số cũ đã chuyển đổi), mã thẻ BHYT bắt đầu bằng MP (mô phỏng) – tất cả đều không thể là dữ liệu thật.'
};

window.COURSE = {
  goals: [
    ['cap', 'Kiến thức', 'Hiểu rõ năng lực và giới hạn của AI; nắm quy trình VNeID, dịch vụ công trực tuyến, Smart Vĩnh Long.'],
    ['wand', 'Thực hành', 'Bộ câu lệnh mẫu dùng lại được và các bài mô phỏng thao tác ngay trên web.'],
    ['book', 'Tự học', 'Học lại tại nhà theo từng bài, có chấm điểm tự động và giấy xác nhận hoàn thành.']
  ],
  outputs: [
    ['message', 'Viết yêu cầu', 'Viết câu lệnh chặt chẽ, đủ dữ liệu để AI không bịa đặt hoặc suy diễn.'],
    ['file', 'Soạn thảo', 'Tạo bản nháp thông báo, kế hoạch, thư công vụ đúng thể thức hành chính.'],
    ['list', 'Tổng hợp', 'Tóm tắt văn bản dài, lập bảng giao việc và theo dõi tiến độ.'],
    ['megaphone', 'Truyền thông', 'Soạn tin Zalo cho người dân, làm ảnh và infographic tuyên truyền.']
  ],
  rules: [
    ['Chỉ dùng dữ liệu giả định trên lớp', 'Mọi dữ liệu thực hành trong khoá học đều là giả định, không phản ánh thông tin thật của địa phương.'],
    ['Tuyệt đối không đưa tài liệu mật lên AI', 'Không đưa hồ sơ công dân, số CCCD, tài liệu chưa công bố hoặc thông tin mật lên chatbot công cộng.'],
    ['AI chỉ tạo bản nháp đầu tiên', 'Cán bộ phụ trách phải đối chiếu, rà soát pháp lý và trình ký trước khi phát hành.'],
    ['Không để AI tự vẽ số liệu', 'Thiếu dữ liệu thì yêu cầu AI ghi [Cần bổ sung], không để AI tự tạo con số.']
  ],
  scenario: {
    t: 'Tình huống xuyên suốt: Tổng vệ sinh môi trường',
    rows: [['Cơ quan tổ chức', 'UBND xã'], ['Thời gian', '07 giờ 00 phút, ngày 25 tháng 07 năm 2026'], ['Địa điểm', 'Các tuyến đường và khu dân cư trên toàn địa bàn xã'], ['Phân công', 'Người dân tự quét dọn vỉa hè trước nhà; Trưởng ấp điều phối và thông báo điểm gom rác tập kết']]
  }
};

window.PARTS = [
/* ======================= PHẦN 1 ======================= */
{ id: 1, code: 'Phần 1', t: 'Ứng dụng AI cơ bản trong công tác hành chính', short: 'AI cơ bản', ic: 'bot', col: 'p1',
  sub: 'Viết câu lệnh, soạn thảo văn bản, tổng hợp và truyền thông bằng AI – an toàn, đúng thể thức, không bịa đặt.',
  lessons: [
  { id: '1-1', t: 'Mục tiêu, năng lực đầu ra và quy ước an toàn', m: 15, b: [
    { t: 'p', x: 'Phần này giúp cán bộ xã dùng trí tuệ nhân tạo (AI) như một **trợ lý soạn nháp**, không phải người ra quyết định. Khoá học có 5 chuyên đề, mỗi chuyên đề có một sản phẩm thực hành cụ thể.' },
    { t: 'tbl', h: ['Chuyên đề', 'Nội dung trọng tâm', 'Sản phẩm thực hành'], r: [
      ['01. AI trong công vụ & an toàn dữ liệu', 'Giới hạn của AI, quy tắc bảo mật thông tin nội bộ', 'Checklist bảo mật'],
      ['02. Kỹ năng viết prompt', 'Cấu trúc câu lệnh chuẩn, ngăn AI bịa đặt', 'Prompt vạn năng'],
      ['03. Soạn thảo văn bản hành chính', 'Dự thảo thông báo, kế hoạch theo NĐ 30/2020/NĐ-CP', 'Dự thảo Thông báo'],
      ['04. Tổng hợp & xử lý thông tin', 'Rút tiến độ, phân nhóm ý kiến, lập bảng giao việc', 'Bảng theo dõi việc'],
      ['05. Truyền thông số', 'Bài đăng Zalo, ảnh minh hoạ, infographic', 'Tin Zalo / Infographic']] },
    { t: 'h', x: 'Bốn quy ước an toàn bắt buộc' },
    { t: 'rules' },
    { t: 'note', k: 'warn', x: 'Trong toàn bộ giáo trình này, tên người, số định danh, số điện thoại, mã thẻ BHYT đều là **dữ liệu giả định**. Ví dụ: số định danh 000 190 012 345 (không có mã tỉnh 000), số điện thoại 0123 456 789 (đầu số 012 đã chuyển đổi từ năm 2018).' },
    { t: 'scenario' },
    { t: 'ex', x: 'phanloai' }
  ]},
  { id: '1-2', t: 'AI trong công vụ và an toàn dữ liệu', m: 25, b: [
    { t: 'p', x: 'AI tạo sinh (chatbot) đoán chữ tiếp theo dựa trên dữ liệu đã học. Vì vậy AI viết rất trôi chảy nhưng **có thể bịa** khi thiếu dữ liệu. Trước khi dán bất cứ thứ gì vào chatbot, hãy tự hỏi: thông tin này thuộc nhóm nào?' },
    { t: 'tbl', h: ['Được phép đưa lên AI', 'Cần cân nhắc kỹ', 'Tuyệt đối cấm'], r: [
      ['Tình huống giả định dùng trên lớp', 'Dự thảo tờ trình nội bộ chưa thông qua', 'Hồ sơ, dữ liệu cá nhân của công dân'],
      ['Mẫu văn bản hành chính đã công khai', 'Số liệu thống kê chưa công bố chính thức', 'Số điện thoại thật, số CCCD công dân'],
      ['Văn bản pháp luật đã ban hành', 'Ảnh chụp tài liệu hội họp nội bộ', 'Tài liệu đóng dấu MẬT, TUYỆT MẬT'],
      ['Dữ liệu thô đã ẩn danh hoá', 'Danh sách cử tri chưa kiểm duyệt', 'Mật khẩu hệ thống công vụ, chữ ký số']] },
    { t: 'h', x: 'Giới hạn độ dài ngữ cảnh' },
    { t: 'cmp', a: ['Hiện tượng', ['Trôi ngữ cảnh: dán tài liệu quá dài, AI bỏ sót chi tiết ở giữa, hiểu sai bảng số liệu.', 'Bỏ sót tệp đính kèm: AI báo “đã đọc xong” nhưng thực chất chỉ tóm tắt vài trang đầu.']], b: ['Cách xử lý', ['Chia nhỏ văn bản dài thành từng chương mục, tóm tắt từng phần độc lập.', 'Chỉ rõ trang cần xử lý: “Hãy đọc kỹ bảng số liệu ở trang 7 của tệp PDF này”.']] },
    { t: 'h', x: 'Ba cài đặt bảo vệ quyền riêng tư' },
    { t: 'flow', x: [['Quản lý lịch sử chat', 'Xoá phiên trò chuyện nhạy cảm ngay khi xong việc.'], ['Tắt huấn luyện', 'Tắt tuỳ chọn “Dùng dữ liệu hội thoại để huấn luyện mô hình”.'], ['Chat tạm thời', 'Dùng chế độ trò chuyện tạm thời khi xử lý dự thảo nội bộ.']] },
    { t: 'note', k: 'law', x: 'Hai luật mới cần biết: **Luật Bảo vệ dữ liệu cá nhân** (91/2025/QH15, hiệu lực 01/01/2026) và **Luật Trí tuệ nhân tạo** (134/2025/QH15, hiệu lực 01/3/2026). Luật AI đặt nguyên tắc con người giữ quyền giám sát, kiểm soát hệ thống AI. Xem trạng thái hiệu lực ở mục Tra cứu.' },
    { t: 'law', x: ['bvdlcn', 'nd356', 'luatai', 'nd13'] },
    { t: 'ex', x: 'phanloai' }, { t: 'ex', x: 'caidat' }
  ]},
  { id: '1-3', t: 'Kỹ năng viết prompt hiệu quả', m: 35, b: [
    { t: 'p', x: 'Một câu lệnh (prompt) tốt giống một **phiếu giao việc** rõ ràng: ai làm, làm gì, dựa trên dữ liệu nào, cho ai đọc, trình bày ra sao, và không được làm gì.' },
    { t: 'h', x: 'Nguyên lý ba khối cốt lõi' },
    { t: 'flow', x: [['Nêu bối cảnh', 'Nêu vai trò của bạn (cán bộ văn phòng UBND xã) để AI dùng văn phong hành chính.'], ['Nêu dữ liệu gốc', 'Dán phiếu thông tin thô; không để AI tự tra nguồn không chính thống.'], ['Thiết lập giới hạn', '“Không tự ý bịa số liệu”, “Thiếu thì ghi [Cần bổ sung]”.']] },
    { t: 'h', x: 'Sáu thành phần vàng' },
    { t: 'tbl', h: ['Thành phần', 'Câu mẫu'], r: [
      ['1. Vai trò (Role)', '“Bạn là cán bộ chuyên trách công tác thi đua khen thưởng cấp cơ sở…”'],
      ['2. Nhiệm vụ (Task)', '“Hãy soạn thảo dự thảo tờ trình đề xuất khen thưởng…”'],
      ['3. Dữ liệu vào (Input)', '“Dựa duy nhất vào danh sách thành tích đính kèm dưới đây…”'],
      ['4. Đối tượng đọc (Audience)', '“Hướng tới người dân, dễ hiểu…”'],
      ['5. Định dạng (Format)', '“Xuất kết quả dạng bảng: Việc | Người | Hạn.”'],
      ['6. Ràng buộc (Constraint)', '“Không dùng từ giật gân, không tự bịa số điện thoại liên hệ.”']] },
    { t: 'ex', x: 'prompt6' },
    { t: 'h', x: 'Kỹ thuật nâng cao: ví dụ mẫu (few-shot)' },
    { t: 'ul', x: ['Đưa cho AI 1–2 văn bản mẫu đã ban hành để AI bắt chước cấu trúc và giọng văn của cơ quan.', 'Trước khi dán mẫu, **xoá thông tin thật** (số điện thoại, tên người ký).', 'Nhắc AI: “Chỉ học cấu trúc và phong cách của ví dụ, không chép dữ liệu của ví dụ sang bài mới.”'] },
    { t: 'h', x: 'Tóm tắt khác phân tích' },
    { t: 'cmp', a: ['Tóm tắt', ['Rút gọn tài liệu dài', 'Giữ nguyên ý chính và số liệu thô', 'Không đưa thêm ý kiến cá nhân', 'Hợp làm bản tin nhanh cho lãnh đạo']], b: ['Phân tích', ['Tìm quy luật, so sánh phương án', 'Giải thích nguyên nhân biến động số liệu', 'Đưa ra đề xuất, giải pháp mới', 'Cần con người kiểm tra chặt lập luận']] },
    { t: 'ex', x: 'kythuat' }
  ]},
  { id: '1-4', t: 'Soạn thảo văn bản hành chính với AI', m: 40, b: [
    { t: 'p', x: 'Dùng tình huống **Tổng vệ sinh môi trường** để tạo dự thảo Thông báo. AI giúp lập khung sườn nhanh; con người chịu trách nhiệm thể thức, nội dung và ký ban hành.' },
    { t: 'prompt', code: 'PR-TB-01', title: 'Prompt 1 – Dự thảo văn bản hành chính', x: 'Tôi là cán bộ văn phòng UBND xã.\nHãy soạn dự thảo THÔNG BÁO tổ chức tổng vệ sinh môi trường theo dữ liệu đính kèm.\nYêu cầu: văn phong hành chính chuẩn, câu ngắn gọn, không thêm thông tin nằm ngoài dữ liệu.\nPhần nào thiếu thông tin (số hiệu, người ký, số điện thoại) vui lòng ghi rõ [Cần bổ sung].' },
    { t: 'note', k: 'no', x: 'Tuyệt đối không dùng bản thô của AI để trình ký khi chưa qua bước rà soát thủ công của con người.' },
    { t: 'h', x: 'Thể thức theo Nghị định 30/2020/NĐ-CP' },
    { t: 'tbl', h: ['Thành phần thể thức', 'Kỹ thuật trình bày', 'Vai trò của AI'], r: [
      ['Tên cơ quan ban hành', 'UBND XÃ … (in hoa, cỡ 12–13, đứng, đậm)', 'Người dùng phải khai báo sẵn'],
      ['Số, ký hiệu văn bản', 'Số: …/TB-UBND (cỡ 13, đứng)', 'AI không tự đặt số'],
      ['Trích yếu nội dung', 'Tóm tắt ngắn chủ đề văn bản (đứng, đậm)', 'AI tóm tắt rất tốt'],
      ['Chức vụ, người ký', 'CHỦ TỊCH hoặc KT. CHỦ TỊCH – PHÓ CHỦ TỊCH', 'Để trống, không để AI bịa']] },
    { t: 'law', x: ['nd30', 'nd110'] },
    { t: 'ex', x: 'thethuc' },
    { t: 'h', x: 'Năm kiểu “ảo giác” AI hay mắc' },
    { t: 'ul', x: ['Tự bịa **số hiệu**, ký hiệu văn bản.', 'Tự viện dẫn **luật, nghị định đã hết hiệu lực**.', 'Tự ý **đổi ngày, giờ, địa điểm** cho “hợp lý”.', 'Tự đặt **tên người ký**, số điện thoại đường dây nóng lạ.', 'Tự thêm **khẩu hiệu**, tôn chỉ không có trong dữ liệu thô.'] },
    { t: 'h', x: 'Checklist rà soát bản nháp AI' },
    { t: 'flow', x: [['Ngày giờ, địa điểm', 'Khớp hoàn toàn với phiếu thông tin gốc?'], ['Thẩm quyền ký', 'Chức danh người ký đúng thẩm quyền?'], ['Căn cứ pháp lý', 'Văn bản viện dẫn còn hiệu lực?'], ['Từ ngữ tự bịa', 'Có số điện thoại, email, tên cán bộ do AI thêm vào?']] },
    { t: 'ex', x: 'aogiac' },
    { t: 'h', x: 'Kiểm soát ảo giác' },
    { t: 'ul', x: ['Ràng buộc dữ liệu gốc: “Chỉ viết dựa vào dữ liệu được cung cấp, không suy diễn.”', 'Yêu cầu liệt kê phần thiếu: “Cuối kết quả, lập danh sách thông tin còn thiếu để tôi bổ sung.”', 'Kiểm chứng chéo: nhờ cán bộ khác kiểm tra số liệu, thời hạn quan trọng.', 'Lưu lỗi lặp lại vào tệp prompt dùng chung của cơ quan.'] }
  ]},
  { id: '1-5', t: 'Tổng hợp, theo dõi việc và chuẩn hoá quy trình', m: 30, b: [
    { t: 'prompt', code: 'PR-BC-03', title: 'Prompt 3 – Tách tiến độ thành bảng việc', x: 'Hãy tóm tắt văn bản thông báo đính kèm thành bảng theo dõi công việc gồm:\nSTT | Việc cần làm | Người phụ trách | Thời hạn | Tài liệu chuẩn bị | Ghi chú\nYêu cầu:\n- Ngắn gọn, không suy diễn thông tin.\n- Nếu không có dữ liệu người phụ trách hoặc thời hạn, ghi [Chưa xác định], không tự ý đoán.' },
    { t: 'note', k: 'warn', x: 'Kiểm tra: không biến **người phối hợp** thành người chịu trách nhiệm chính; không nhầm **mốc chuẩn bị** với **mốc thực hiện**.' },
    { t: 'h', x: 'Sáu câu hỏi quản lý tiến độ' },
    { t: 'flow', x: [['Việc gì?', 'Bắt đầu bằng một động từ hành động.'], ['Ai chịu trách nhiệm chính?', 'Mỗi việc một đầu mối.'], ['Hạn khi nào?', 'Ngày, giờ báo cáo hoặc nộp kết quả.'], ['Cần tài liệu gì?', 'Hồ sơ, máy móc, thiết bị đi kèm.'], ['Kết quả đầu ra?', 'Bằng chứng: báo cáo, ảnh nghiệm thu, tệp dữ liệu.'], ['Việc nào thiếu thông tin?', 'Đánh dấu để lãnh đạo hội ý.']] },
    { t: 'ex', x: 'bangviec' },
    { t: 'prompt', code: 'PR-QT-04', title: 'Prompt 4 – Chuẩn hoá quy trình nghiệp vụ', x: 'Tôi muốn chuẩn hoá quy trình tiếp nhận và giải quyết phản ánh, kiến nghị của công dân tại xã.\nHãy lập bảng gồm các cột:\nBước thực hiện | Vai trò phụ trách | Hồ sơ yêu cầu | Thời gian xử lý | Checklist rà soát | Lỗi thường gặp | Cách kiểm tra kết quả\nYêu cầu: Không tự ý bịa đặt quy định pháp luật.' },
    { t: 'prompt', code: 'PR-RS-05', title: 'Prompt 5 – So sánh dữ liệu nguồn với bản nháp', x: 'Đóng vai người rà soát văn bản chuyên nghiệp.\nHãy so sánh dữ liệu nguồn [dán dữ liệu] và bản nháp [dán bản nháp] để tìm điểm khác biệt theo bảng:\nNội dung kiểm tra | Dữ liệu nguồn | Bản nháp | Kết luận | Cách sửa\nYêu cầu: Chỉ ra mọi lỗi tự ý bịa đặt hoặc thay đổi ngày giờ, số liệu.' },
    { t: 'prompt', code: 'PR-KT-06', title: 'Prompt 6 – Tìm khoảng trống dữ liệu', x: 'Hãy đọc dữ liệu thô đính kèm và lập danh sách các thông tin quan trọng còn thiếu để hoàn thiện một thông báo hành chính chính thức theo bảng:\nNội dung cần có | Đã có dữ liệu | Chưa có dữ liệu | Câu hỏi cần xác minh | Người cần liên hệ để hỏi\nYêu cầu: Không tự ý bịa thêm thông tin.' }
  ]},
  { id: '1-6', t: 'Truyền thông Zalo, infographic và đạo đức dùng AI', m: 30, b: [
    { t: 'prompt', code: 'PR-Zalo-02', title: 'Prompt 2 – Tạo nội dung truyền thông Zalo', x: 'Viết lại dự thảo thông báo tổng vệ sinh môi trường đính kèm thành bài đăng Zalo cho người dân.\nYêu cầu:\n- Thân thiện, câu ngắn gọn, dưới 250 chữ.\n- Trình bày 3–5 đầu dòng dễ nhớ.\n- Giữ nguyên ngày giờ, địa điểm, việc người dân cần chuẩn bị.\n- Có lời kêu gọi hành động thiết thực ở cuối bài.' },
    { t: 'tbl', h: ['Tiêu chí', 'Văn bản hành chính', 'Bài đăng Zalo'], r: [
      ['Giọng điệu', 'Trang trọng, chuẩn mực', 'Thân thiện, kêu gọi phối hợp'],
      ['Cấu trúc câu', 'Câu phức, đủ căn cứ pháp lý', 'Câu ngắn, đi thẳng vào việc dân cần làm'],
      ['Độ dài', 'Thường 1–2 trang', 'Dưới 250 chữ'],
      ['Tương tác', 'Ký tên, đóng dấu', 'Biểu tượng trực quan, lời kêu gọi hành động']] },
    { t: 'ex', x: 'zalo' },
    { t: 'h', x: 'Làm infographic nhanh (Canva hoặc công cụ tương tự)' },
    { t: 'ul', x: ['Một ảnh – một thông điệp: tiêu đề lớn, 3–5 ý, mỗi ý kèm một biểu tượng.', 'Luôn có: **ngày giờ – địa điểm – việc cần làm – đầu mối liên hệ** (lấy từ văn bản đã ký).', 'Chữ đủ lớn để đọc trên điện thoại; tương phản màu rõ.', 'Ảnh minh hoạ: dùng ảnh tự chụp được phép hoặc hình vẽ; **không dùng chân dung người dân khi chưa có sự đồng ý**.'] },
    { t: 'h', x: 'Ranh giới pháp lý và đạo đức công vụ' },
    { t: 'flow', x: [['Ranh giới pháp lý', 'Không dùng AI tạo, giả mạo, chỉnh sửa con dấu, chữ ký số, quốc huy, văn bản chính thức.'], ['Đạo đức công vụ', 'Không dùng ảnh chân dung thật của công dân, đồng nghiệp khi chưa được đồng ý bằng văn bản.'], ['Trách nhiệm cuối', 'Sai sót do bản nháp AI: cán bộ thực hiện và người ký ban hành chịu trách nhiệm.']] },
    { t: 'note', k: 'law', x: 'Luật Trí tuệ nhân tạo 2025 có quy định về minh bạch nội dung do AI tạo ra, nhất là hình ảnh, âm thanh, video giả lập người thật. Khi đăng ảnh do AI tạo, hãy ghi chú rõ “ảnh minh hoạ do AI tạo”.' },
    { t: 'ex', x: 'daoduc' }
  ]},
  { id: '1-7', t: 'Quy trình 6 bước và thư viện prompt của cơ quan', m: 20, b: [
    { t: 'flow', x: [['Dữ liệu', 'Chuẩn bị thông tin sạch, bỏ dữ liệu nhạy cảm.'], ['Ra lệnh', 'Dùng prompt mẫu có ràng buộc chặt.'], ['Rà soát', 'Đọc kỹ, đối chiếu thủ công với dữ liệu nguồn.'], ['Thể thức', 'Chỉnh phông chữ, định dạng theo NĐ 30.'], ['Trình ký', 'Nộp dự thảo hoàn thiện cho lãnh đạo duyệt.'], ['Ban hành', 'Văn thư đóng dấu, phát hành chính thức.']] },
    { t: 'ex', x: 'quytrinh' },
    { t: 'h', x: 'Thư viện prompt dùng chung' },
    { t: 'tbl', h: ['Mã lệnh', 'Mục đích', 'Dữ liệu đầu vào', 'Bộ phận phụ trách'], r: [
      ['PR-TB-01', 'Soạn Thông báo tổ chức', 'Phiếu thông tin thô đã ẩn danh hoá', 'Văn phòng HĐND – UBND'],
      ['PR-Zalo-02', 'Biên tập tin Zalo', 'Văn bản chính thức đã ký ban hành', 'Bộ phận truyền thông xã'],
      ['PR-BC-03', 'Tổng hợp báo cáo định kỳ', 'Bảng số liệu thô từ các ấp', 'Cán bộ chuyên môn'],
      ['PR-QT-04', 'Thiết lập quy trình nghiệp vụ', 'Hướng dẫn thủ tục hành chính', 'Bộ phận Một cửa']] },
    { t: 'h', x: 'Quản lý phiên bản prompt' },
    { t: 'ul', x: ['Đặt tên thống nhất: **MãNhiệmVụ_TênPrompt_vPhiênBản_NămTháng** – ví dụ `PR-TB_VeSinhMoiTruong_v1.2_2026-07.txt`.', 'Ghi nhật ký thay đổi: “15/7: thêm ràng buộc không tự bịa số điện thoại đường dây nóng”.', 'Lưu trên thư mục dùng chung có phân quyền của cơ quan.', 'Định kỳ chuyển bản cũ vào thư mục Lưu trữ để không ai chép nhầm.'] },
    { t: 'ex', x: 'thuvien' }
  ]}
  ]
},
/* ======================= PHẦN 2 ======================= */
{ id: 2, code: 'Phần 2', t: 'VNeID và Sổ sức khỏe điện tử', short: 'VNeID & Sổ SKĐT', ic: 'card', col: 'p2',
  sub: 'Hướng dẫn người dân đăng ký, kích hoạt tài khoản định danh điện tử, tích hợp thẻ BHYT, xem Sổ sức khỏe điện tử – và giữ an toàn trước lừa đảo.',
  lessons: [
  { id: '2-1', t: 'Bốn mục tiêu và quy tắc ứng xử của cán bộ hỗ trợ', m: 15, b: [
    { t: 'flow', x: [['Kích hoạt tài khoản', 'Nắm các bước đăng ký, kích hoạt tài khoản định danh điện tử trên điện thoại.'], ['Tích hợp giấy tờ', 'Hướng dẫn dân tự tích hợp thẻ BHYT, giấy phép lái xe, thông tin cư trú.'], ['Sổ sức khỏe điện tử', 'Mở Sổ SKĐT để theo dõi lịch sử khám chữa bệnh, tiêm chủng.'], ['An toàn cho dân', 'Nhận diện và cảnh báo lừa đảo giả danh cơ quan chức năng.']] },
    { t: 'h', x: 'Ba nguyên tắc ứng xử cốt lõi' },
    { t: 'cmp', a: ['Nên làm', ['Chỉ tay vào vị trí nút bấm để người dân **tự thao tác** và nhớ cách làm.', 'Để công dân tự che và nhập mật khẩu, OTP, passcode.', 'Lỗi dữ liệu gốc (BHXH, cư trú): hướng dẫn đến đúng cơ quan BHXH hoặc Công an xã.']], b: ['Không được làm', ['Cầm điện thoại của dân thao tác thay.', 'Yêu cầu người dân **đọc to** mật khẩu, mã OTP, passcode.', 'Hứa “sửa giúp” dữ liệu gốc không thuộc thẩm quyền.']] },
    { t: 'h', x: 'Năm câu nói chuẩn ở quầy hỗ trợ' },
    { t: 'ul', x: ['“Cô/chú ơi, mình đã đăng nhập thành công vào ứng dụng VNeID trên điện thoại chưa ạ?”', '“Tài khoản định danh điện tử của mình đã được Công an kích hoạt lên Mức 2 chưa cô/chú?”', '“Thẻ BHYT của mình đã tích hợp và hiện chữ ‘Đã xác thực’ màu xanh chưa ạ?”', '“Cô/chú tự tay nhập mã passcode giúp cháu nhé, cháu không được phép nhìn thông tin này đâu ạ.”', '“Dữ liệu lịch sử y tế cần thời gian đồng bộ từ cơ sở khám chữa bệnh lên hệ thống, cô/chú vui lòng đợi vài ngày ạ.”'] },
    { t: 'ex', x: 'hotro' }
  ]},
  { id: '2-2', t: 'Tài khoản Mức 1 và Mức 2 – chuẩn bị gì?', m: 20, b: [
    { t: 'cmp', a: ['Mức 1', ['Tự đăng ký trực tuyến trên ứng dụng VNeID.', 'Chỉ có thông tin cơ bản.', 'Chưa đủ điều kiện xem Sổ SKĐT, thông tin cư trú, tích hợp BHYT.']], b: ['Mức 2', ['Đăng ký **trực tiếp tại Công an cấp xã** (chụp ảnh chân dung, lấy vân tay).', 'Có giá trị như xuất trình thẻ căn cước khi thực hiện giao dịch.', 'Bắt buộc để tích hợp BHYT, xem Sổ SKĐT, dùng dịch vụ công.']] },
    { t: 'note', k: 'law', x: 'Từ 29/4/2026, theo **Nghị quyết 22/2026/NQ-CP**, thủ tục cấp tài khoản định danh điện tử mức 2 không còn thực hiện ở cấp bộ, cấp tỉnh – người dân làm tại **Công an cấp xã**. Mọi lời mời “kích hoạt mức 2 qua mạng”, “cài định danh mức 3” đều là lừa đảo.' },
    { t: 'h', x: 'Danh mục kiểm tra nhanh trước khi hướng dẫn' },
    { t: 'flow', x: [['Internet', 'Điện thoại bật 4G/5G hoặc Wi-Fi công vụ ổn định.'], ['Số điện thoại chính chủ', 'Số đã đăng ký đúng thông tin chủ thuê bao với nhà mạng.'], ['Thẻ căn cước gắn chip', 'Thẻ còn nguyên vẹn, rõ mã QR, **còn thời hạn**.'], ['Ứng dụng mới nhất', 'Cập nhật VNeID từ App Store hoặc Google Play.']] },
    { t: 'note', k: 'warn', x: 'Từ **28/9/2026** (Nghị định 320/2026/NĐ-CP), hệ thống tự động **khoá tài khoản** nếu số thuê bao dùng để đăng ký không còn đứng tên chủ tài khoản. Hãy nhắc người dân kiểm tra số điện thoại chính chủ.' },
    { t: 'law', x: ['nd69', 'nd320', 'nq22', 'luatcc'] },
    { t: 'ex', x: 'mucdo' }
  ]},
  { id: '2-3', t: 'Đăng ký, kích hoạt tài khoản – mật khẩu và passcode', m: 35, b: [
    { t: 'h', x: 'Quy trình đăng ký tài khoản' },
    { t: 'flow', x: [['Tải ứng dụng', 'Tìm “VNeID” trên App Store / Google Play (đúng nhà phát hành Bộ Công an).'], ['Đăng ký', 'Nhập số định danh cá nhân và số điện thoại.'], ['Quét QR', 'Quét mã QR trên thẻ căn cước để đối chiếu thông tin.'], ['Nhập OTP', 'Người dân tự nhập mã OTP nhận qua SMS.'], ['Đặt mật khẩu', 'Thiết lập mật khẩu và đăng nhập lần đầu.']] },
    { t: 'ex', x: 'vneid-dk' },
    { t: 'h', x: 'Kích hoạt tài khoản định danh (sau khi Công an xã đã cấp)' },
    { t: 'flow', x: [['Chọn chức năng', 'Mở ứng dụng, chọn “Kích hoạt tài khoản định danh điện tử”.'], ['Nhập thông tin', 'Số định danh cá nhân và số điện thoại chính chủ.'], ['Nhập OTP', 'Người dân tự tay nhập mã OTP 6 số.'], ['Tạo mật khẩu & passcode', 'Mật khẩu đăng nhập và passcode 6 số mở ví giấy tờ.'], ['Hoàn thành', 'Tài khoản sẵn sàng sử dụng.']] },
    { t: 'ex', x: 'vneid-kh' },
    { t: 'cmp', a: ['Mật khẩu đăng nhập', ['8–20 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt.', 'Dùng khi đăng nhập trên điện thoại mới hoặc sau khi đăng xuất.']], b: ['Passcode 6 số', ['Chuỗi 6 chữ số – không đặt dãy dễ đoán như 123456, 111111, ngày sinh.', 'Nhập mỗi khi mở ví giấy tờ, xem Sổ SKĐT, thông tin cư trú.']] },
    { t: 'ex', x: 'matkhau' }
  ]},
  { id: '2-4', t: 'Tích hợp thẻ BHYT và xem Sổ sức khỏe điện tử', m: 30, b: [
    { t: 'flow', x: [['Vào Ví giấy tờ', 'Đăng nhập, chọn “Ví giấy tờ”.'], ['Tích hợp thông tin', 'Chọn “Tích hợp thông tin” → “Tạo mới yêu cầu”.'], ['Chọn loại', 'Chọn “Thẻ bảo hiểm y tế”.'], ['Nhập mã thẻ', 'Nhập đúng mã số thẻ BHYT, đồng ý điều khoản.'], ['Chờ xác thực', 'Gửi yêu cầu, chờ hệ thống BHXH phê duyệt.'], ['Xem Sổ SKĐT', '“Hồ sơ sức khỏe” → “Sổ sức khỏe điện tử”, nhập passcode.']] },
    { t: 'note', k: 'warn', x: 'Thông báo **“Gửi yêu cầu thành công” chưa có nghĩa là đã tích hợp xong**. Chỉ khi thẻ BHYT hiện trạng thái “Đã xác thực” mới dùng được. Điều kiện: tài khoản mức 2, ứng dụng bản mới nhất, thẻ BHYT còn hiệu lực.' },
    { t: 'note', k: 'law', x: 'Bộ Y tế ban hành **Quyết định 31/QĐ-BYT ngày 06/01/2026** cho phép dùng dữ liệu Sổ sức khỏe điện tử trên VNeID thay thế sổ giấy trong giải quyết thủ tục hành chính.' },
    { t: 'ex', x: 'bhyt' },
    { t: 'h', x: 'Xử lý lỗi thường gặp' },
    { t: 'tbl', h: ['Hiện tượng', 'Nguyên nhân', 'Cách hướng dẫn'], r: [
      ['Không thấy mục Sổ SKĐT', 'Tài khoản chưa phải mức 2', 'Mang thẻ căn cước đến Công an xã để được cấp mức 2'],
      ['Không thấy thẻ BHYT', 'Chưa gửi yêu cầu tích hợp vào Ví', 'Làm lại quy trình tích hợp ở trên'],
      ['Quên passcode 6 số', 'Quên mã mở Ví giấy tờ', 'Vào mục Cá nhân → Đổi/Lấy lại passcode'],
      ['BHYT bị từ chối', 'Thông tin trên thẻ BHYT lệch với căn cước', 'Liên hệ cơ quan BHXH nơi tham gia để điều chỉnh*']] },
    { t: 'p', x: '<span class="small">* Trang chiếu gốc ghi “BHXH huyện”. Từ 01/7/2025 không còn đơn vị hành chính cấp huyện – hãy hướng dẫn theo đầu mối BHXH đang phục vụ địa bàn xã.</span>' },
    { t: 'ex', x: 'loi' }
  ]},
  { id: '2-5', t: 'Giấy tờ khác, xuất trình, thiết bị mới và “công dân số”', m: 30, b: [
    { t: 'tbl', h: ['Giấy tờ tích hợp', 'Lợi ích'], r: [
      ['Giấy phép lái xe, đăng ký xe', 'Xuất trình khi có yêu cầu kiểm tra, không cần mang bản giấy'],
      ['Người phụ thuộc', 'Khai báo thông tin con nhỏ, người già thuộc diện phụ thuộc'],
      ['Mã số thuế cá nhân', 'Kê khai thuế điện tử nhanh, minh bạch']] },
    { t: 'h', x: 'Xuất trình giấy tờ' },
    { t: 'flow', x: [['Đăng nhập', 'Mở VNeID bằng mật khẩu.'], ['Mở Ví', 'Chọn “Ví giấy tờ”.'], ['Nhập passcode', 'Xác thực bằng passcode 6 số.'], ['Chọn giấy tờ', 'Căn cước, BHYT, GPLX…'], ['Trình diện', 'Đưa màn hình cho cán bộ kiểm tra.']] },
    { t: 'note', k: 'law', x: 'Theo **Nghị định 320/2026/NĐ-CP** (hiệu lực 28/9/2026): cơ quan, tổ chức **không được yêu cầu nộp giấy tờ** khi dữ liệu đã được tích hợp trên ứng dụng định danh; bổ sung 206 loại giấy tờ được tích hợp; bổ sung **tài khoản hưởng an sinh xã hội** trên VNeID.' },
    { t: 'h', x: 'Đăng nhập trên điện thoại mới' },
    { t: 'demo', x: 'nfc' },
    { t: 'cmp', a: ['Tình huống', ['Đổi điện thoại, hệ thống gửi mã xác thực về máy cũ.', 'Máy cũ mất, hỏng → không lấy được mã.']], b: ['Giải pháp', ['Dùng chức năng quét chip NFC trên thẻ căn cước: áp thẻ sát lưng điện thoại mới.', 'Máy không có NFC → đến Công an xã để được hỗ trợ.']] },
    { t: 'ex', x: 'vneid-nfc' },
    { t: 'h', x: 'Chính sách “công dân số” (15/8/2026 – 28/02/2027)' },
    { t: 'p', x: 'Nghị quyết **66.22/2026/NQ-CP** về phát triển công dân số lấy ngày **15/10 hằng năm là Ngày Công dân số Việt Nam**. Công dân có tài khoản mức 2 và tích hợp đủ **5 loại thông tin, giấy tờ cơ bản** được hưởng chính sách miễn, giảm một số phí, lệ phí khi làm thủ tục trực tuyến (chi tiết tại Thông tư 117/2026/TT-BTC).' },
    { t: 'ul', x: ['Giấy khai sinh', 'Thẻ ngân hàng / tài khoản thanh toán / ví điện tử / tài khoản tiền di động', 'Tài khoản an sinh xã hội', 'Số thuê bao di động', 'Sổ sức khỏe điện tử'] },
    { t: 'law', x: ['nq6622', 'tt117'] },
    { t: 'ex', x: 'congdanso' }
  ]},
  { id: '2-6', t: 'Nhận diện lừa đảo giả danh – giữ an toàn cho dân', m: 25, b: [
    { t: 'p', x: 'Công an nhiều địa phương liên tục cảnh báo thủ đoạn **giả danh cán bộ Công an, cán bộ hộ tịch xã** gọi điện “hỗ trợ cập nhật định danh”, rồi gửi đường link qua Zalo, Facebook, SMS để người dân cài **ứng dụng VNeID giả mạo** chứa mã độc, chiếm quyền điện thoại và lấy tiền trong tài khoản ngân hàng.' },
    { t: 'h', x: 'Dấu hiệu nhận biết' },
    { t: 'ul', x: ['Gọi điện báo “thông tin căn cước sai lệch”, “tài khoản sắp bị khoá”, “dấu vân tay bị mờ”, yêu cầu cập nhật **ngay**.', 'Mời “kích hoạt mức 2 tại nhà”, “cài định danh mức 3” – thực tế mức 2 chỉ cấp trực tiếp tại Công an cấp xã.', 'Gửi đường link hoặc tệp cài đặt (.apk) để “tải VNeID phiên bản mới”.', 'Yêu cầu chuẩn bị điện thoại Android, đọc mã OTP, mật khẩu, passcode, hoặc chuyển tiền “xác minh”.', 'Lợi dụng việc sắp xếp đơn vị hành chính: “phải cập nhật địa chỉ xã mới”.'] },
    { t: 'note', k: 'ok', x: '**Ghi nhớ:** VNeID chính thức chỉ có trên App Store và Google Play. Cơ quan Công an **không** gọi điện hướng dẫn cài ứng dụng, **không** gửi link cài đặt, **không** bao giờ hỏi OTP hay mật khẩu. Nghi ngờ → cúp máy, đến trực tiếp Công an xã.' },
    { t: 'ex', x: 'luadao' },
    { t: 'h', x: 'Văn hoá báo cáo sự cố' },
    { t: 'ul', x: ['Đối chiếu chéo số liệu ít nhất 2 lần trước khi đưa thông báo lên hệ thống chính thức.', 'Không lưu mật khẩu, passcode, thông tin công dân trên chatbot công cộng.', 'Phát hiện lộ tài khoản công vụ hoặc rò rỉ dữ liệu: ngắt mạng thiết bị và **báo ngay đầu mối CNTT của xã/tỉnh** theo quy chế (trang chiếu gốc ghi “bộ phận CNTT của huyện” – nay không còn cấp huyện).'] }
  ]}
  ]
},
/* ======================= PHẦN 3 ======================= */
{ id: 3, code: 'Phần 3', t: 'Dịch vụ công trực tuyến', short: 'Dịch vụ công', ic: 'globe', col: 'p3',
  sub: 'Đăng nhập bằng VNeID, tra cứu thủ tục, khai e-Form, đính kèm hồ sơ, thanh toán không tiền mặt và theo dõi kết quả.',
  lessons: [
  { id: '3-1', t: 'Tổng quan Cổng Dịch vụ công quốc gia và quy trình 6 bước', m: 15, b: [
    { t: 'p', x: 'Cổng Dịch vụ công quốc gia (**dichvucong.gov.vn**) là đầu mối thống nhất toàn quốc, kết nối từ Trung ương đến cấp xã. Người dân nộp hồ sơ 24/7, theo dõi tiến độ từng khâu và nhận kết quả điện tử có chữ ký số.' },
    { t: 'flow', x: [['Đăng nhập', 'Tài khoản VNeID mức 2 qua đăng nhập một lần (SSO).'], ['Tra cứu', 'Tìm thủ tục cần nộp thuộc UBND xã.'], ['Điền mẫu', 'Kê khai biểu mẫu điện tử (e-Form).'], ['Đính kèm', 'Tải tệp giấy tờ (PDF, JPG, DOCX…).'], ['Thanh toán', 'Nộp phí, lệ phí không dùng tiền mặt.'], ['Theo dõi', 'Nhận mã hồ sơ, tra cứu tiến độ, nhận kết quả.']] },
    { t: 'note', k: 'ok', x: 'Dữ liệu dân cư được điền sẵn từ hệ thống định danh, người dân đỡ phải nhập lại.' },
    { t: 'note', k: 'warn', x: '**Lưu ý cập nhật:** từ 01/7/2025, tỉnh Vĩnh Long mới được thành lập trên cơ sở hợp nhất Bến Tre, Trà Vinh và Vĩnh Long; **không còn cấp huyện**. Xã Tân Xuân (mã đơn vị 29137) trực thuộc tỉnh. Khi chọn cơ quan tiếp nhận chỉ còn hai cấp: **Tỉnh Vĩnh Long → Xã Tân Xuân**. Trang chiếu cũ có bước chọn “Thành phố/Thị xã/Huyện” và “Phường Hòa Thuận” – không còn đúng.' },
    { t: 'law', x: ['nq202', 'nq1687', 'nd118', 'nd45'] }
  ]},
  { id: '3-2', t: 'Đăng nhập cổng DVC bằng tài khoản định danh', m: 25, b: [
    { t: 'flow', x: [['Truy cập đúng địa chỉ', 'Gõ https://dichvucong.gov.vn trên trình duyệt (không bấm link lạ).'], ['Bấm Đăng nhập', 'Chọn “Tài khoản định danh điện tử cấp bởi Bộ Công an (VNeID)”.'], ['Chuyển trang SSO', 'Hệ thống chuyển sang sso.dancuquocgia.gov.vn.'], ['Nhập tài khoản', 'Số định danh 12 số và mật khẩu VNeID.'], ['Xác thực', 'Nhận OTP (qua ứng dụng VNeID hoặc SMS), nhập passcode.'], ['Đồng ý chia sẻ', 'Tích “Tôi đồng ý”, bấm “Xác nhận chia sẻ” thông tin.']] },
    { t: 'note', k: 'warn', x: 'Kiểm tra thanh địa chỉ trước khi nhập mật khẩu: tên miền phải **kết thúc đúng bằng .gov.vn**. Các tên như “dichvucong-gov.vn.com”, “dichvucongvn.top” là giả mạo.' },
    { t: 'ex', x: 'dvc-login' }, { t: 'ex', x: 'link' }
  ]},
  { id: '3-3', t: 'Tra cứu thủ tục, chọn cơ quan, khai e-Form và đính kèm', m: 35, b: [
    { t: 'ul', x: ['Nhập từ khoá ngắn: “Khai sinh”, “Xác nhận tình trạng hôn nhân”, “Cấp giấy phép xây dựng”…', 'Danh sách hiện nhiều cấp thực hiện – chọn đúng thủ tục **thuộc thẩm quyền UBND cấp xã**.', 'Bấm vào tên thủ tục để đọc trình tự, thành phần hồ sơ, thời hạn, phí – lệ phí.'] },
    { t: 'tbl', h: ['Hạng mục', 'Cần đọc kỹ', 'Lưu ý'], r: [
      ['Trình tự thực hiện', 'Các bước từ tiếp nhận đến trả kết quả', 'Theo dõi thời hạn giải quyết ghi trên thủ tục'],
      ['Thành phần hồ sơ', 'Tờ khai theo mẫu, bản sao giấy tờ liên quan', 'Chuẩn bị tệp chụp/scan rõ nét, đủ trang'],
      ['Phí, lệ phí', 'Mức thu theo quy định hiện hành (nhiều khoản do HĐND tỉnh quyết định)', 'Nhiều thủ tục trực tuyến được miễn, giảm']] },
    { t: 'h', x: 'Chọn cơ quan tiếp nhận (sau sắp xếp đơn vị hành chính)' },
    { t: 'demo', x: 'chonxa' },
    { t: 'h', x: 'Đính kèm thành phần hồ sơ' },
    { t: 'ul', x: ['Định dạng chấp nhận: **.pdf, .doc, .docx, .jpg, .png**; mỗi tệp **không quá 20 MB** (theo hướng dẫn trên trang chiếu – kiểm tra lại thông báo trên cổng).', 'Ảnh chụp, bản scan phải ngay ngắn, rõ chữ, thấy rõ dấu và chữ ký, đủ trang.', 'Giấy tờ đã có trong “Kho dữ liệu điện tử” của tài khoản: chọn dùng lại, không cần tải lên.'] },
    { t: 'h', x: 'Nộp và nhận mã hồ sơ' },
    { t: 'ul', x: ['Tích “Tôi chắc chắn các thông tin khai báo là chính xác”.', 'Nhập đúng mã xác nhận (captcha), bấm “Nộp hồ sơ”.', 'Lưu lại **mã hồ sơ** (chụp màn hình hoặc ghi sổ) để tra cứu tiến độ.'] },
    { t: 'ex', x: 'dvc-nop' }, { t: 'ex', x: 'tep' }
  ]},
  { id: '3-4', t: 'Theo dõi hồ sơ, thanh toán, nhận kết quả và đánh giá', m: 25, b: [
    { t: 'cmp', a: ['Cách 1 – tra cứu nhanh', ['Trang chủ → “Tra cứu hồ sơ”.', 'Nhập mã hồ sơ và mã bảo mật.', 'Xem trạng thái: chờ tiếp nhận, đang xử lý, yêu cầu bổ sung, đã trả kết quả.']], b: ['Cách 2 – Dịch vụ công của tôi', ['Bấm tên tài khoản → “Dịch vụ công của tôi”.', 'Quản lý hồ sơ đang xử lý, cần nộp phí, đã hoàn thành.', 'Gửi phản ánh, kiến nghị.']] },
    { t: 'h', x: 'Nghĩa vụ tài chính và thanh toán' },
    { t: 'flow', x: [['Thông báo nộp phí', 'Hồ sơ hợp lệ → trạng thái “Yêu cầu thực hiện nghĩa vụ tài chính”.'], ['Kiểm tra khoản thu', 'Tên khoản thu, số tiền, đơn vị thụ hưởng (UBND xã).'], ['Chọn phương thức', 'QR ngân hàng, thẻ nội địa/quốc tế hoặc ví điện tử.'], ['Lấy biên lai', 'Lịch sử thanh toán → “Xem biên lai” → tải PDF có ký số.']] },
    { t: 'note', k: 'law', x: 'Phí, lệ phí do HĐND tỉnh quyết định áp dụng theo nghị quyết hiện hành của **tỉnh Vĩnh Long mới** (ví dụ Nghị quyết 49/2025/NQ-HĐND về lệ phí hộ tịch, Nghị quyết 05/2026/NQ-HĐND về phí, lệ phí đất đai). Từ 15/8/2026 đến 28/02/2027, công dân số đáp ứng điều kiện được miễn, giảm thêm một số khoản theo NQ 66.22/2026/NQ-CP. Luôn xem mức thu hiển thị trên thủ tục trước khi tư vấn cho dân.' },
    { t: 'law', x: ['nq49hd', 'nq6622', 'tt117'] },
    { t: 'h', x: 'Nhận kết quả và đánh giá' },
    { t: 'ul', x: ['Khi trạng thái “Đã trả kết quả”: vào hồ sơ → “Xem chi tiết” → tải tệp kết quả (.pdf) có chữ ký số.', 'Đánh giá mức độ hài lòng với cán bộ Một cửa để nâng chất lượng phục vụ.'] },
    { t: 'ex', x: 'dvc-theodoi' }
  ]}
  ]
},
/* ======================= PHẦN 4 ======================= */
{ id: 4, code: 'Phần 4', t: 'Ứng dụng Smart Vĩnh Long', short: 'Smart Vĩnh Long', ic: 'phone', col: 'p4',
  sub: 'Nền tảng số của tỉnh: đăng ký tài khoản, đăng nhập và gửi phản ánh hiện trường đúng cách để được xử lý nhanh.',
  lessons: [
  { id: '4-1', t: 'Giới thiệu ứng dụng Smart Vĩnh Long', m: 15, b: [
    { t: 'p', x: 'Smart Vĩnh Long là nền tảng số của tỉnh: **kết nối** mọi lúc mọi nơi, **an toàn** bảo mật thông tin, **tiện ích** thân thiện dễ dùng, **hiện đại** phục vụ chuyển đổi số.' },
    { t: 'tbl', h: ['Nhóm chức năng', 'Nội dung'], r: [
      ['Dành cho người dân', 'Phản ánh hiện trường, cập nhật thông tin, tra cứu dịch vụ công, y tế, giáo dục…'],
      ['Dành cho cán bộ', 'Quản lý công việc, họp thông minh, cập nhật số liệu, tra cứu thông tin số'],
      ['Tài khoản người dùng', 'Quản lý thông tin cá nhân, đăng nhập, đăng ký'],
      ['Bản tin', 'Cảnh báo, thông báo, truyền thông chính sách, quảng bá']] },
    { t: 'note', k: 'info', x: 'Vai trò của cán bộ xã: hướng dẫn hộ gia đình cài đặt, đăng ký tài khoản và gửi phản ánh đúng cách; tiếp nhận, xử lý phản ánh thuộc thẩm quyền theo phân công của xã. Chỉ tiêu cụ thể theo kế hoạch của tỉnh và xã.' },
    { t: 'note', k: 'warn', x: 'Chỉ tải ứng dụng có tên **Smart Vĩnh Long** từ App Store hoặc Google Play. Bài thực hành dưới đây là **giao diện mô phỏng trung tính**, không phải ứng dụng thật.' }
  ]},
  { id: '4-2', t: 'Đăng ký và đăng nhập tài khoản', m: 25, b: [
    { t: 'flow', x: [['Tải ứng dụng', 'Tìm “Smart Vĩnh Long” trên App Store / Google Play.'], ['Mở mục Tài khoản', 'Chọn “Đăng ký”.'], ['Nhập thông tin', 'Nhập đủ, chính xác các mục; chọn “Kiểm tra thông tin”.'], ['Xác thực OTP', 'Nhận mã OTP qua tin nhắn từ tổng đài VINHLONG_SO.'], ['Bổ sung', 'Giới tính, địa chỉ thường trú, mật khẩu → “Đăng ký”.'], ['Đăng nhập', 'Số điện thoại hoặc số CCCD + mật khẩu.']] },
    { t: 'note', k: 'warn', x: 'Nhập chính xác số điện thoại để nhận mã OTP. Địa chỉ thường trú: chọn **Tỉnh Vĩnh Long → Xã Tân Xuân** (trang chiếu gốc ghi “tỉnh, huyện, xã” – nay không còn cấp huyện; làm theo các ô ứng dụng đang hiển thị).' },
    { t: 'ex', x: 'svl-dk' }
  ]},
  { id: '4-3', t: 'Gửi phản ánh hiện trường đúng cách', m: 30, b: [
    { t: 'flow', x: [['Chọn chức năng', '“Phản ánh hiện trường” → Gửi phản ánh.'], ['Nhập nội dung', 'Việc gì, ở đâu, từ khi nào, ảnh hưởng ra sao.'], ['Chọn vị trí', 'Nhập hoặc chọn vị trí hiện tại trên bản đồ.'], ['Ảnh/video', 'Chụp rõ hiện trường, không lộ mặt, biển số người khác.'], ['Gửi', 'Hộp thoại báo gửi thành công.'], ['Theo dõi', 'Xem phản ánh của mình và trên địa bàn.']] },
    { t: 'h', x: 'Bốn yếu tố của một phản ánh tốt' },
    { t: 'tbl', h: ['Yếu tố', 'Ví dụ tốt', 'Ví dụ chưa tốt'], r: [
      ['Vị trí', 'Đầu cầu kênh, cạnh trụ điện số 12, Ấp Mẫu 1', '“Ở ngoài đường”'],
      ['Thời điểm', 'Từ sáng 20/11, đến nay chưa thu gom', 'Không nêu'],
      ['Nội dung', 'Rác thải tồn đọng khoảng 2 m, bốc mùi, lấn lòng đường', '“Bẩn quá, ai xử lý đi!!!”'],
      ['Ảnh/video', 'Ảnh rõ đống rác và mốc nhận diện (trụ điện, cầu)', 'Ảnh mờ, chụp mặt hàng xóm']] },
    { t: 'note', k: 'warn', x: 'Phản ánh đúng sự thật, lời lẽ văn minh; không đăng thông tin cá nhân, hình ảnh người khác khi chưa được phép.' },
    { t: 'ex', x: 'svl-pa' }, { t: 'ex', x: 'svl-loc' }
  ]}
  ]
}
];

/* =========================================================
   DANH MỤC BÀI THỰC HÀNH TRÊN WEB (hiện thực ở ex-*.js)
   ========================================================= */
window.EXLIST = [
  { id: 'phanloai', p: 1, t: 'Phân loại dữ liệu trước khi đưa lên AI', d: 'Kéo 12 thẻ dữ liệu vào ba ô: được phép – cân nhắc – cấm.', ic: 'shield', m: 6 },
  { id: 'caidat', p: 1, t: 'Cài đặt quyền riêng tư cho chatbot', d: 'Bật/tắt đúng các tuỳ chọn trong bảng cài đặt mô phỏng.', ic: 'lock', m: 4 },
  { id: 'prompt6', p: 1, t: 'Xưởng prompt 6 thành phần + AI mô phỏng', d: 'Ghép câu lệnh, chấm điểm trực tiếp và xem AI mô phỏng viết ra sao.', ic: 'wand', m: 10 },
  { id: 'kythuat', p: 1, t: 'Chọn đúng kỹ thuật: tóm tắt, phân tích, ví dụ mẫu, chia nhỏ', d: 'Xếp 10 yêu cầu công việc vào đúng kỹ thuật.', ic: 'sort', m: 5 },
  { id: 'thethuc', p: 1, t: 'Dàn trang thể thức Thông báo (NĐ 30)', d: 'Đặt 8 thành phần thể thức vào đúng vị trí trên trang giấy.', ic: 'file', m: 8 },
  { id: 'aogiac', p: 1, t: 'Săn “ảo giác” trong bản nháp AI', d: 'Đối chiếu phiếu nguồn, bấm vào 6 chỗ AI bịa hoặc sai.', ic: 'search', m: 8 },
  { id: 'bangviec', p: 1, t: 'Lập bảng theo dõi việc từ thông báo', d: 'Điền người phụ trách, thời hạn – đánh dấu [Chưa xác định] khi thiếu.', ic: 'list', m: 8 },
  { id: 'zalo', p: 1, t: 'Viết tin Zalo cho người dân', d: 'Soạn tin, máy kiểm tra 7 tiêu chí ngay khi gõ và hiển thị trên điện thoại.', ic: 'message', m: 10 },
  { id: 'daoduc', p: 1, t: 'Đèn xanh – vàng – đỏ: đạo đức dùng AI', d: '8 tình huống công vụ, chọn mức độ phù hợp.', ic: 'alert', m: 6 },
  { id: 'quytrinh', p: 1, t: 'Sắp xếp quy trình an toàn 6 bước', d: 'Đưa 6 bước về đúng thứ tự.', ic: 'route', m: 3 },
  { id: 'thuvien', p: 1, t: 'Đặt tên tệp prompt chuẩn', d: 'Ghép tên tệp đúng quy ước cho 3 tình huống.', ic: 'folder', m: 5 },
  { id: 'hotro', p: 2, t: 'Quầy hỗ trợ: đóng vai cán bộ', d: '6 lượt hội thoại với người dân – chọn câu trả lời chuẩn mực.', ic: 'users', m: 8 },
  { id: 'mucdo', p: 2, t: 'Mức 1 hay Mức 2?', d: 'Xếp 10 đặc điểm vào đúng loại tài khoản.', ic: 'card', m: 5 },
  { id: 'vneid-dk', p: 2, t: 'Mô phỏng: đăng ký tài khoản định danh', d: 'Thao tác trên điện thoại mô phỏng: nhập thông tin, quét QR, OTP, mật khẩu.', ic: 'phone', m: 8 },
  { id: 'vneid-kh', p: 2, t: 'Mô phỏng: kích hoạt và tạo passcode', d: 'Kích hoạt tài khoản đã được cấp, đặt mật khẩu và passcode an toàn.', ic: 'key', m: 8 },
  { id: 'matkhau', p: 2, t: 'Máy đo mật khẩu và passcode', d: 'Gõ thử – máy chấm theo quy tắc đã học, chỉ rõ chỗ chưa đạt.', ic: 'lock', m: 4 },
  { id: 'bhyt', p: 2, t: 'Mô phỏng: tích hợp BHYT và xem Sổ SKĐT', d: 'Ví giấy tờ → tích hợp thẻ BHYT → chờ xác thực → mở Sổ sức khỏe.', ic: 'hospital', m: 8 },
  { id: 'loi', p: 2, t: 'Ghép lỗi – nguyên nhân – cách xử lý', d: 'Nối hiện tượng lỗi với cách hướng dẫn người dân.', ic: 'lifebuoy', m: 5 },
  { id: 'vneid-nfc', p: 2, t: 'Mô phỏng: đăng nhập điện thoại mới bằng NFC', d: 'Máy cũ bị hỏng – áp thẻ căn cước để xác thực.', ic: 'nfc', m: 4 },
  { id: 'congdanso', p: 2, t: 'Công dân số: đủ 5 loại giấy tờ chưa?', d: 'Kiểm tra 3 hồ sơ người dân giả định, chỉ ra còn thiếu gì.', ic: 'badge', m: 5 },
  { id: 'luadao', p: 2, t: 'Thật hay lừa? Hộp thư điện thoại', d: '8 tin nhắn, cuộc gọi – phân định an toàn hay lừa đảo.', ic: 'alert', m: 7 },
  { id: 'dvc-login', p: 3, t: 'Mô phỏng: đăng nhập cổng DVC bằng VNeID', d: 'Chọn đúng phương thức, kiểm tra địa chỉ, OTP, đồng ý chia sẻ.', ic: 'key', m: 6 },
  { id: 'link', p: 3, t: 'Địa chỉ trang thật hay giả?', d: '10 đường link – phát hiện tên miền giả mạo.', ic: 'link', m: 4 },
  { id: 'dvc-nop', p: 3, t: 'Mô phỏng: nộp hồ sơ khai sinh trực tuyến', d: 'Tìm thủ tục, chọn Tỉnh Vĩnh Long → Xã Tân Xuân, e-Form, đính kèm, captcha.', ic: 'upload', m: 12 },
  { id: 'tep', p: 3, t: 'Tệp đính kèm hợp lệ không?', d: '10 tệp – định dạng, dung lượng, chất lượng ảnh.', ic: 'file', m: 4 },
  { id: 'dvc-theodoi', p: 3, t: 'Mô phỏng: theo dõi, thanh toán, nhận kết quả', d: 'Theo dõi trạng thái, quét QR thanh toán mẫu, lấy biên lai, đánh giá.', ic: 'pay', m: 8 },
  { id: 'svl-dk', p: 4, t: 'Mô phỏng: đăng ký Smart Vĩnh Long', d: 'Đăng ký, nhận OTP mô phỏng, khai địa chỉ Xã Tân Xuân, đăng nhập.', ic: 'phone', m: 8 },
  { id: 'svl-pa', p: 4, t: 'Mô phỏng: gửi phản ánh hiện trường', d: 'Soạn phản ánh, chọn vị trí trên bản đồ, chọn ảnh – máy chấm chất lượng.', ic: 'pin', m: 10 },
  { id: 'svl-loc', p: 4, t: 'Phản ánh nào được xử lý nhanh?', d: '6 phản ánh mẫu – chọn tốt hay cần sửa và lý do.', ic: 'flag', m: 5 }
];
