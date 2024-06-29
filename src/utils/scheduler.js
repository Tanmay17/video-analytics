const schedule = require('node-schedule');
const youtubeService = require('../services/YoutubeService');
const videoModel = require('../models/videoModel');

async function updateData() {
  const channelId = 'YOUR_CHANNEL_ID';
  const videoData = await youtubeService.fetchVideoDetails(channelId);
  const parsedVideoData = youtubeService.parseVideoData(videoData);

  await videoModel.insertVideoData(parsedVideoData);

  const trends = videoModel.calculateViewTrends(parsedVideoData);
  const keywords = videoModel.extractKeywords(parsedVideoData.map(video => video.title + ' ' + video.description).join(' '));
  const engagement = videoModel.analyzeEngagement(parsedVideoData);

  const insightsData = parsedVideoData.map(video => ({
    videoId: video.videoId,
    viewTrend: trends,
    keywords,
    engagement
  }));

  await videoModel.insertInsights(insightsData);
}

schedule.scheduleJob('0 * * * *', updateData); // Runs every hour

module.exports = {
  updateData
};