const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイルの配信設定
// publicフォルダー内のHTMLファイルを配信
app.use(express.static(path.join(__dirname, 'public')));

// srcフォルダー内のCSS・JSファイルを配信
app.use('/src', express.static(path.join(__dirname, 'src')));

// ルートアクセス時にfiles.htmlへリダイレクト
app.get('/', (req, res) => {
    res.redirect('/files.html');
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
