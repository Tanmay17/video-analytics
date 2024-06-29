module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('Video', {
        videoId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        title: DataTypes.TEXT,
        description: DataTypes.TEXT,
        viewCount: DataTypes.INTEGER,
        likeCount: DataTypes.INTEGER,
        commentCount: DataTypes.INTEGER,
        publishedAt: DataTypes.DATE
    }, {
        timestamps: false
    });

    return Video;
};