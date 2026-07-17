# Startup Hub

這是一個新創團隊展示網站的靜態前端專案，主要用來呈現不同期別團隊的列表頁與個別介紹頁。

## 專案概觀

- `index.html`：首頁，顯示各期團隊卡片列表。
- `intro.html`：團隊內頁，依網址參數載入單一團隊內容。
- `index.js`：首頁互動邏輯，包含期別切換、卡片渲染、列表導覽。
- `intro.js`：團隊內頁互動邏輯，包含輪播、YouTube、團隊介紹內容渲染。
- `assets/js/teamsData.js`：團隊資料主檔，依期別維護文字、連結與媒體資訊。
- `assets/images/`：團隊圖片資產，依期別與團隊索引分類。
- `assets/css/`：樣式表。
- `assets/lib/`：第三方前端套件。

## 目前技術結構

- 架構型態：純靜態網站，沒有打包工具與後端服務。
- 核心技術：HTML、CSS、JavaScript、jQuery、Bootstrap。
- 外部元件：
  - Bootstrap
  - OwlCarousel 2
  - jQuery TouchSwipe
  - YouTube IFrame API

## 目錄結構

```text
startup-hub/
├── index.html
├── intro.html
├── index.js
├── intro.js
├── README.md
└── assets/
    ├── css/
    ├── images/
    │   ├── 108/
    │   ├── 109/
    │   ├── 110/
    │   ├── 111/
    │   ├── 112/
    │   ├── 113/
    │   └── 114/
    ├── js/
    │   └── teamsData.js
    └── lib/
        └── OwlCarousel2-2.3.4/
```

## 頁面與資料流

### 首頁 `index.html`

- 載入 `assets/js/teamsData.js` 中的 `TEAMS` 資料。
- 由 `index.js` 根據期別動態產生團隊卡片與手機版列表。
- 點擊卡片後導向 `intro.html?team={index}&year={year}`。

### 內頁 `intro.html`

- 根據網址參數 `team` 與 `year` 讀取對應團隊資料。
- 第 112 期之後使用新版內容區塊 `initSpContent()`。
- 較早期資料使用舊版輪播與簡介區塊。

### 團隊資料 `assets/js/teamsData.js`

每筆團隊資料通常包含以下欄位：

- `index`：團隊索引。
- `name`：團隊名稱。
- `intro`：團隊介紹文字陣列。
- `product`：產品或服務內容。
- `tags`：分類標籤。
- `web` / `fb` / `ig` / `podcast`：外部連結。
- `youtube`：YouTube 影片 ID。
- `section` / `resource` / `stage` / `funding` / `found`：新版介紹頁補充資訊。

## 本機預覽

這個專案不需要安裝相依套件，直接用靜態伺服器啟動即可：

```bash
python3 -m http.server 8000
```

啟動後開啟：

- `http://localhost:8000/index.html`

## 內容維護方式

### 新增或調整團隊資料

1. 編輯 `assets/js/teamsData.js` 對應期別資料。
2. 補上對應圖片檔案，路徑格式如下：
   - `assets/images/{year}/{index}/logo.jpg`
   - `assets/images/{year}/{index}/cover.jpg`
   - `assets/images/{year}/{index}/team_photo_1.jpg`
   - `assets/images/{year}/{index}/team_photo_2.jpg`
3. 視需要補上 `youtube`、社群連結與 `section` 欄位。

### 視覺調整

- 主要樣式位於 `assets/css/style.css`
- 卡片 hover 效果位於 `assets/css/hover_effect.css`

## Git 目前狀態

這個資料夾已經是 Git repository，目前本機狀態如下：

- 目前分支：`main`
- 遠端名稱：`origin`
- 遠端位置：`git@github.com:Strong5566/startup-hub.git`
- 現有最新提交：`3a1db8e Initial commit`

另外，目前網站主要檔案與 `assets/` 目錄尚未被追蹤，代表接下來很適合整理後做第一次正式內容提交。

## 建議的 Git 起手流程

```bash
git status
git add .
git commit -m "Add startup hub site structure and assets"
git push origin main
```

## 補充觀察

- 專案目前沒有 `.gitignore`，已補上基本版本，避免 macOS 與編輯器暫存檔進入版本控制。
- 專案以資料檔驅動畫面，後續若要擴充，優先整理 `teamsData.js` 的欄位一致性會更好維護。
