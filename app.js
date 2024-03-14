const express = require('express');
const cors = require('cors');
/* const axios = require('axios'); */
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static('public'));


// 假设您的PDF文件存储在项目的public/files目录下
const pdfPath = path.join(__dirname, 'src', 'assets', 'MIS.pdf');

app.get('/download-pdf', (req, res) => {    
    // 发送文件以供下载
    res.download(pdfPath, (err) => {
        if (err) {
            // 错误处理
            console.error("File download error:", err);
            res.status(500).send("Cannot download the file.");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});