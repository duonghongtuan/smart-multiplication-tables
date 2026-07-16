# smart-multiplication-tables

## Smart Multiplication Tables Landing Page

Trang giới thiệu web tĩnh (HTML + CSS thuần) cho app `Smart Multiplication Tables`.

### Cấu trúc

- `index.html`: nội dung landing page
- `css/styles.css`: toàn bộ style
- `assets/images/`: ảnh dùng trên trang
- `app-ads.txt`: giữ nguyên (phục vụ Google Ads cho app)

### Thay link App Store / Google Play

Mở `index.html` và tìm 2 token sau:

- `__APP_STORE_URL__`
- `__PLAY_STORE_URL__`

Thay chúng bằng link thật của bạn. Trong file cũng có phần comment `CONFIG` ở phía trên để bạn biết chính xác chỗ cần sửa.

### Thay ảnh

Nếu bạn muốn đổi ảnh/feature-graphic/screenshot khác, hãy thay trực tiếp các file trong:

`assets/images/`

và giữ nguyên tên file:

- `feature-graphic.png`
- `screenshot-1.png` ... `screenshot-8.png`

### Preview local

Chạy lệnh sau tại thư mục dự án:

```bash
python3 -m http.server 8000
```

Sau đó mở trình duyệt tại:

- http://localhost:8000
