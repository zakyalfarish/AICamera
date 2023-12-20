// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());


const imageDir = 'D:/AI Kamera/oil_filter';

app.get('/latest-image', (req, res) => {
    // Baca direktori gambar
    fs.readdir(imageDir, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading image directory');
      }
  
      // Pilih gambar terbaru
      const latestImage = files.reduce((latest, file) => {
        const filePath = path.join(imageDir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && (!latest || stat.mtime > latest.mtime)) {
          return { file, mtime: stat.mtime };
        }
        return latest;
      }, null);
  
      if (!latestImage) {
        return res.status(404).send('No images found in the directory');
      }
  
      // Kirim nama file gambar terbaru dalam format JSON
      res.json({ latestImage: latestImage.file });
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

