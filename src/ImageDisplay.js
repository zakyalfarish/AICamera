// ImageDisplay.js
import React, { useEffect, useState } from 'react';

const ImageDisplay = () => {
  const [latestImage, setLatestImage] = useState('');

  useEffect(() => {
    // Panggil API server untuk mendapatkan gambar terbaru
    fetch('/latest-image')
      .then((response) => response.json())
      .then((data) => setLatestImage(data.latestImage))
      .catch((error) => console.error('Error fetching latest image:', error));
  }, []);

  if (!latestImage) {
    return <div>Loading...</div>;
  }

  const imagePath = require(`file:///D:/AI Kamera/oil_filter/${latestImage}`);

  return (
    <div>
      <h1>Gambar Terbaru dari Disk D</h1>
      <img src={imagePath} alt="Gambar Terbaru dari Disk D" />
    </div>
  );
};

export default ImageDisplay;
