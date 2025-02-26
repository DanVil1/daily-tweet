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
      
      // Draw the Title
      ctx.font = 'bold 30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(textData.title, canvas.width / 2, 50);
      
      // Draw the Content
      ctx.font = '20px Arial';
      ctx.fillText(textData.content, canvas.width / 2, canvas.height / 2);
      
      // Draw the Author
      ctx.font = 'italic 18px Arial';
      ctx.fillText(`By ${textData.author}`, canvas.width / 2, canvas.height - 30);
      
      // Callback with the generated image data URL
      if (onGenerated) {
        onGenerated(canvas.toDataURL('image/png'));
      }
    };
  }, [textData, backgroundImageUrl, onGenerated]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageGenerator;
