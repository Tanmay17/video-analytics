require('dotenv').config();

module.exports = {
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  db: {
    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'yourdatabase',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }
};
