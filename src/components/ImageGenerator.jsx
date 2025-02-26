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

      // Set a text color that contrasts well with your background.
      ctx.fillStyle = 'black';

      // Row 1: Title in bold, centered
      ctx.textAlign = 'center';
      ctx.font = 'bold 48px Arial';
      // Adjust the Y position as needed (25% of canvas height)
      ctx.fillText(textData.title, canvas.width / 2, canvas.height * 0.25);

      // Row 2: Content (Cuento), centered
      ctx.font = '36px Arial';
      // Adjust the Y position as needed (50% of canvas height)
      ctx.fillText(textData.content, canvas.width / 2, canvas.height * 0.5);

      // Row 3: Author, aligned to the right
      ctx.textAlign = 'right';
      ctx.font = '36px Arial';
      // Adjust the Y position as needed (75% of canvas height), and use a margin from the right edge
      ctx.fillText(textData.author, canvas.width - 20, canvas.height * 0.75);

      // Optionally, call onGenerated with the resulting image data URL
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

