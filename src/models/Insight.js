module.exports = (sequelize, DataTypes) => {
  const Insight = sequelize.define('Insight', {
    videoId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    viewTrend: DataTypes.JSONB,
    keywords: DataTypes.JSONB,
    engagement: DataTypes.JSONB
  }, {
    timestamps: false
  });

  return Insight;
};