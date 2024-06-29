-- Create the videos table to store raw video data
CREATE TABLE IF NOT EXISTS videos (
    video_id VARCHAR(255) PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    view_count INT,
    like_count INT,
    comment_count INT,
    published_at TIMESTAMP NOT NULL
);

-- Create the insights table to store processed insights
CREATE TABLE IF NOT EXISTS insights (
    video_id VARCHAR(255) PRIMARY KEY,
    view_trend JSONB,   -- Storing view trends as JSON
    keywords JSONB,     -- Storing extracted keywords as JSON
    engagement JSONB,   -- Storing engagement metrics (likes, comments) as JSON,
    FOREIGN KEY (video_id) REFERENCES videos(video_id)
);

-- Create an index on the published_at column in the videos table for faster querying
CREATE INDEX IF NOT EXISTS idx_published_at ON videos (published_at);
