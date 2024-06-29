const youtubeService = require('../services/YoutubeService');
const { Video: videoModel } = require('../models');

async function fetchVideoData(req, res) {
  const channelId = req.query.channel_id;
  if (!channelId) {
    return res.status(400).json({ error: 'Channel ID is required' });
  }

  try {
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

    res.status(200).json({ status: 'success', data: parsedVideoData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  fetchVideoData
};