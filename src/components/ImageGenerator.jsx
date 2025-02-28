// src/ImageGenerator.jsx
import { useRef, useEffect } from 'react';

const ImageGenerator = ({ textData, backgroundImageUrl, onGenerated }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!textData) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = backgroundImageUrl;

    img.onload = () => {
      // Set canvas dimensions to match the background image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the background image
      ctx.drawImage(img, 0, 0);

      // Set text alignment
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'black';

      // Dynamically calculate font sizes based on canvas height
      const titleFontSize = canvas.height * 0.05;   // 5% of image height
      const contentFontSize = canvas.height * 0.04;   // 4% of image height
      const authorFontSize = canvas.height * 0.04;    // 4% of image height
      const spacing = canvas.height * 0.02;           // 2% of image height

      // Calculate the total height of the text block
      const totalHeight =
        titleFontSize + spacing + contentFontSize + spacing + authorFontSize;

      // Starting Y position to vertically center the text block
      const startY = (canvas.height - totalHeight) / 2;

      // Draw Title (bold)
      ctx.font = `bold ${titleFontSize}px Arial`;
      ctx.fillText(textData.title, canvas.width / 2, startY);

      // Draw Content (Cuento)
      ctx.font = `${contentFontSize}px Arial`;
      ctx.fillText(textData.content, canvas.width / 2, startY + titleFontSize + spacing);

      // Draw Author (aligned center, could adjust if you prefer right alignment)
      ctx.font = `${authorFontSize}px Arial`;
      ctx.fillText(textData.author, canvas.width / 2, startY + titleFontSize + spacing + contentFontSize + spacing);

      // Call onGenerated callback with resulting image
      if (onGenerated) {
        onGenerated(canvas.toDataURL('image/png'));
      }
    };
  }, [textData, backgroundImageUrl, onGenerated]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default ImageGenerator;
