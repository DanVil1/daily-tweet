// server/index.js
const express = require('express');
const cors = require('cors');  // Import cors
const { TwitterApi } = require('twitter-api-v2');

const app = express();
const port = process.env.PORT || 3001;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Example endpoint for posting to Twitter
app.post('/api/post-to-twitter', async (req, res) => {
  try {
    const { imageData, textData } = req.body; // Expecting a Base64 image and text data
    // Initialize the Twitter client (replace placeholders with your actual credentials)
    const client = new TwitterApi({
      appKey: '',
      appSecret: '',
      accessToken: '-',
      accessSecret: '',
    });
    // Remove any header from the base64 image string (if present)
    const base64Image = imageData.includes(',') ? imageData.split(',')[1] : imageData;
    const imageBuffer = Buffer.from(base64Image, 'base64');

    // Upload the media and get a mediaId
    const mediaId = await client.v1.uploadMedia(imageBuffer, { ext: 'jpg', mimeType: 'image/jpeg' });

    // Compose tweet text (customize as needed)
    const tweetText = `${textData.title}\n\n${textData.content}\n\nBy: ${textData.author}`;

    // Post the tweet with the uploaded media
    const tweet = await client.v1.tweet(tweetText, { media_ids: mediaId });

    res.json({ success: true, message: 'Tweet posted successfully', tweet });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
