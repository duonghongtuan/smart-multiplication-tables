# Smart Multiplication Tables Landing Page

Trang giới thiệu web tĩnh (HTML + CSS) cho app **Smart Multiplication Tables**, hỗ trợ **EN** và **VI**, deploy trên **Vercel**.

## Cấu trúc

- `index.html` — bản tiếng Anh (`/`)
- `vi/index.html` — bản tiếng Việt (`/vi/`)
- `css/styles.css` — style dùng chung
- `assets/images/` — ảnh dùng chung
- `js/site.js` — year, nav highlight, lưu lựa chọn ngôn ngữ
- `js/i18n-redirect.js` — fallback auto-detect trên client (local / khi không có Edge)
- `middleware.js` — Vercel Edge auto-detect `Accept-Language`
- `vercel.json` — clean URLs + trailing slash
- `app-ads.txt` — giữ nguyên cho Google Ads của app

## Ngôn ngữ (i18n)

| URL | Ngôn ngữ |
|-----|----------|
| `/` | English |
| `/vi/` | Tiếng Việt |

### Auto-detect trên Vercel
- `middleware.js` đọc cookie `preferred_lang` trước
- Nếu chưa có cookie: dùng header `Accept-Language`
- Ưu tiên `vi` → redirect `307` sang `/vi/`
- Fallback English

### Đổi ngôn ngữ thủ công
Nút **EN | VI** trên header sẽ:
1. Ghi cookie `preferred_lang`
2. Ghi `localStorage.preferred_lang`
3. Chuyển sang `/` hoặc `/vi/`

Sau đó middleware sẽ tôn trọng lựa chọn của bạn.

## Link store

Đã gắn sẵn trong cả 2 bản:

- App Store: https://apps.apple.com/us/app/id6738325072
- Google Play: https://play.google.com/store/apps/details?id=com.betterstudy.startmultiplicationtable

## Ảnh

Thay file trong `assets/images/` (giữ nguyên tên):

- `app-icon.png`
- `feature-graphic.png`
- `screenshot-1.png` … `screenshot-8.png`

## Preview local

```bash
python3 -m http.server 8000
```

Mở:

- http://localhost:8000/
- http://localhost:8000/vi/

> Lưu ý: Edge Middleware chỉ chạy trên Vercel. Local dùng `js/i18n-redirect.js` làm fallback.

## Deploy Vercel

1. Import repo vào Vercel
2. Framework Preset: **Other**
3. Build Command: để trống
4. Output Directory: `.` (root)
5. Deploy

Sau khi deploy, test:

- Máy/browser set tiếng Việt → vào `/` sẽ chuyển sang `/vi/`
- Bấm **EN** rồi reload `/` → giữ English
