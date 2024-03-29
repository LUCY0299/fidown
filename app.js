const multer = require('multer');
const fs = require('fs');
const uploadDir = 'uploads';

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static('public'));  //public下的文件可以靜態地被訪問
app.use('/uploads', express.static('uploads'));



// 檢查 uploads 目錄是否存在，如果不存在則創建
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 設置 multer 文件存儲配置的地方和文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // 確保這個目錄已經存在
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// 假设您的PDF文件存储在项目的src/assets目录下
const pdfPath = path.join(__dirname, 'src', 'assets', 'MIS.pdf');

//get請求服務器發送本機檔案
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

//post向服務器提交要處理的資料  //multer處理單個文件上傳
app.post('/upload-file', upload.single('file'), (req, res) => {
    if (req.file) {
        console.log('File uploaded successfully.', req.file);

        // 生成下载 URL
        const downloadUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.send({ message: "File uploaded successfully.", downloadUrl: downloadUrl ,originalFilename: req.file.originalname});
    } else {
        res.status(400).send({ message: "Please upload a file." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});