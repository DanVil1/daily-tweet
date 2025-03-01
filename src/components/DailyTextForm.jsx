// src/DailyTextForm.jsx
import { useState } from 'react';

const DailyTextForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, author, date: new Date() });
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: '0 auto',
        textAlign: 'left',
        padding: '70px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            height: '150px',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Generate &amp; Publish
      </button>
    </form>
  );
};

export default DailyTextForm;
