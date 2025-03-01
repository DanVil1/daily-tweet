import { useRef, useEffect } from 'react';

const ImageGenerator = ({ textData, backgroundImageUrl, onGenerated }) => {
  const canvasRef = useRef(null);
  const hasGenerated = useRef(false);

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

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'black';
      const fontFamily = 'Georgia';

      const titleFontSize = canvas.height * 0.06;
      const contentFontSize = canvas.height * 0.045;
      const authorFontSize = canvas.height * 0.035;
      const spacing = canvas.height * 0.02;

      const maxContentWidth = canvas.width * 0.8;

      const titleText = textData.title.toUpperCase();

      ctx.font = `${contentFontSize}px ${fontFamily}`;
      const contentLines = wrapText(ctx, textData.content, maxContentWidth);
      const contentBlockHeight = contentLines.length * (contentFontSize + spacing);

      const totalHeight = titleFontSize + spacing + contentBlockHeight + spacing + authorFontSize;
      const startY = (canvas.height - totalHeight) / 2;

      ctx.font = `bold ${titleFontSize}px ${fontFamily}`;
      ctx.fillText(titleText, canvas.width / 2, startY);

      ctx.font = `${contentFontSize}px ${fontFamily}`;
      let currentY = startY + titleFontSize + spacing;
      contentLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, currentY);
        currentY += contentFontSize + spacing;
      });

      ctx.font = `${authorFontSize}px ${fontFamily}`;
      ctx.fillText(textData.author, canvas.width / 2, currentY + spacing);

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
