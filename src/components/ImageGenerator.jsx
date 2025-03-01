// src/ImageGenerator.jsx
import { useRef, useEffect } from 'react';

const ImageGenerator = ({ textData, backgroundImageUrl, onGenerated }) => {
  const canvasRef = useRef(null);
  const hasGenerated = useRef(false);

  // Helper function to wrap text into multiple lines
  const wrapText = (context, text, maxWidth) => {
    const words = text.split(' ');
    let lines = [];
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    return lines;
  };

  useEffect(() => {
    if (!textData) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = backgroundImageUrl;

    img.onload = () => {
      // Set canvas dimensions to the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the background image
      ctx.drawImage(img, 0, 0);

      // Set text styling defaults
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'black';
      const fontFamily = 'Georgia';

      // Dynamically calculate font sizes based on canvas height
      const titleFontSize = canvas.height * 0.06;    // 6% for title
      const contentFontSize = canvas.height * 0.045;   // 4.5% for content
      const authorFontSize = canvas.height * 0.035;    // 3.5% for author
      const spacing = canvas.height * 0.02;            // 2% spacing

      // Maximum width for content wrapping (80% of canvas width)
      const maxContentWidth = canvas.width * 0.8;

      // Prepare title (force uppercase)
      const titleText = textData.title.toUpperCase();

      // Set font for content and wrap text
      ctx.font = `${contentFontSize}px ${fontFamily}`;
      const contentLines = wrapText(ctx, textData.content, maxContentWidth);
      const contentBlockHeight = contentLines.length * (contentFontSize + spacing);

      // Total block height: title + spacing + content block + spacing + author
      const totalHeight = titleFontSize + spacing + contentBlockHeight + spacing + authorFontSize;
      const startY = (canvas.height - totalHeight) / 2;

      // Draw Title
      ctx.font = `bold ${titleFontSize}px ${fontFamily}`;
      ctx.fillText(titleText, canvas.width / 2, startY);

      // Draw Content (each line)
      ctx.font = `${contentFontSize}px ${fontFamily}`;
      let currentY = startY + titleFontSize + spacing;
      contentLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, currentY);
        currentY += contentFontSize + spacing;
      });

      // Draw Author (smaller font)
      ctx.font = `${authorFontSize}px ${fontFamily}`;
      ctx.fillText(textData.author, canvas.width / 2, currentY + spacing);

      // Call onGenerated callback once with the data URL
      if (!hasGenerated.current) {
        hasGenerated.current = true;
        if (onGenerated) {
          onGenerated(canvas.toDataURL('image/png'));
        }
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
