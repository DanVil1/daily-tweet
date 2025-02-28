/* global process */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { TwitterApi } = require('twitter-api-v2');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.post('/api/post-to-twitter', async (req, res) => {
  try {
    const { imageData } = req.body;
    
    const client = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY,
      appSecret: process.env.TWITTER_APP_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    const base64Image = imageData.includes(',') ? imageData.split(',')[1] : imageData;
    const imageBuffer = Buffer.from(base64Image, 'base64');

    const mediaId = await client.v1.uploadMedia(imageBuffer, { ext: 'jpg', mimeType: 'image/jpeg' });

    const tweet = await client.v2.tweet({
      text: '.',
      media: { media_ids: [mediaId] }
    });

    // MAX 17 PER DAY 
    res.json({ success: true, message: 'Tweet posted successfully', tweet });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
