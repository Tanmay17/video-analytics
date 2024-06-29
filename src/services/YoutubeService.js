const axios = require('axios');
const config = require('../config');

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

async function fetchVideoDetails(channelId) {
  const url = `${BASE_URL}/search?key=${config.youtubeApiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`;
  const response = await axios.get(url);
  return response.data;
}

async function getVideoData(videoId) {
  const url = `${BASE_URL}/videos?key=${config.youtubeApiKey}&id=${videoId}&part=snippet,statistics`;
  const response = await axios.get(url);
  return response.data;
}

function parseVideoData(videoData) {
  return videoData.items.map(item => ({
    videoId: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    viewCount: item.statistics.viewCount || 0,
    likeCount: item.statistics.likeCount || 0,
    commentCount: item.statistics.commentCount || 0,
    publishedAt: item.snippet.publishedAt
  }));
}

module.exports = {
  fetchVideoDetails,
  getVideoData,
  parseVideoData
};