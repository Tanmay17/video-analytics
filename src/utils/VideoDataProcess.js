const moment = require('moment');
const natural = require('natural');
const stopwords = require('stopword');
const { Video, Insight } = require('../models');

const tokenizer = new natural.WordTokenizer();

function calculateViewTrends(videoData) {
  const trends = videoData.reduce((acc, video) => {
    const date = moment(video.publishedAt).format('YYYY-MM-DD');
    if (!acc[date]) acc[date] = 0;
    acc[date] += parseInt(video.viewCount, 10);
    return acc;
  }, {});
  return trends;
}

function extractKeywords(text) {
  const words = tokenizer.tokenize(text);
  const filteredWords = stopwords.removeStopwords(words);
  const frequency = filteredWords.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  const sortedKeywords = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
  return sortedKeywords.slice(0, 10).map(([word]) => word);
}

function analyzeEngagement(videoData) {
  const totalLikes = videoData.reduce((sum, video) => sum + parseInt(video.likeCount, 10), 0);
  const totalComments = videoData.reduce((sum, video) => sum + parseInt(video.commentCount, 10), 0);
  return {
    totalLikes,
    totalComments,
    averageLikesPerVideo: totalLikes / videoData.length,
    averageCommentsPerVideo: totalComments / videoData.length
  };
}

async function insertVideoData(videoData) {
  for (const video of videoData) {
    await Video.upsert(video);
  }
}

async function insertInsights(insightsData) {
  for (const insight of insightsData) {
    await Insight.upsert(insight);
  }
}

module.exports = {
  calculateViewTrends,
  extractKeywords,
  analyzeEngagement,
  insertVideoData,
  insertInsights
};