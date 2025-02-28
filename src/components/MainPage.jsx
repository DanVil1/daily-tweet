// src/MainPage.jsx
import { useState } from 'react';
import DailyTextForm from './DailyTextForm';
import ImageGenerator from './ImageGenerator';

const MainPage = () => {
  const [dailyText, setDailyText] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [history, setHistory] = useState([]);
  const backgroundImageUrl = '/background.jpeg'; // Place your background image in the public folder

  const handleFormSubmit = (textData) => {
    setDailyText(textData);
    // Add to history immediately (or later after a successful Twitter post)
    setHistory((prev) => [...prev, textData]);
  };

  const handleImageGenerated = async (imgDataUrl) => {
    setGeneratedImage(imgDataUrl);
    try {
      const response = await fetch('http://localhost:3001/api/post-to-twitter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: imgDataUrl.split(',')[1], // remove header if needed
          textData: dailyText,
        }),
      });
      const result = await response.json();
      console.log('Twitter API result:', result);
    } catch (error) {
      console.error('Error posting to Twitter:', error);
    }
  };
  

  return (
    <div>
      <h1>TextoDiario</h1>
      <DailyTextForm onSubmit={handleFormSubmit} />
      {dailyText && (
        <ImageGenerator
          textData={dailyText}
          backgroundImageUrl={backgroundImageUrl}
          onGenerated={handleImageGenerated}
        />
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
