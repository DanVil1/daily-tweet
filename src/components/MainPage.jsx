import { useState } from 'react';
import DailyTextForm from './DailyTextForm';
import ImageGenerator from './ImageGenerator';

const MainPage = () => {

  const [dailyText, setDailyText] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  // const [history, setHistory] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const backgroundImageUrl = '/background.jpeg';

  const handleFormSubmit = (textData) => {
    setDailyText(textData);
    // setHistory((prev) => [...prev, textData]);
  };

  const handleImageGenerated = async (imgDataUrl) => {
    if (isPublishing) return;
    setIsPublishing(true);
    setGeneratedImage(imgDataUrl);

    try {
      const response = await fetch('http://localhost:3001/api/post-to-twitter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: imgDataUrl.split(',')[1],
          textData: dailyText,
        }),
      });
      const result = await response.json();
      console.log('Twitter API result:', result);
    } catch (error) {
      console.error('Error posting to Twitter:', error);
    } finally {
      setIsPublishing(false);
    }
  };
  

  return (
    <div>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>TextoDiario</h1>
        <DailyTextForm onSubmit={handleFormSubmit} />
      </div>

      {dailyText && (
        <div style={{ maxWidth: '800px', margin: '20px auto' }}>
          <ImageGenerator
            textData={dailyText}
            backgroundImageUrl={backgroundImageUrl}
            onGenerated={handleImageGenerated}
          />
        </div>
      )}
      {/* <h2>History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <strong>{entry.title}</strong> - {new Date(entry.date).toLocaleDateString()}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default MainPage;
