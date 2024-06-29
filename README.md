Video Analytics Platform
========================

This project is a backend service that integrates with the YouTube Data API to fetch video data, process it to extract valuable insights, and store the results in a PostgreSQL database. The data is updated every hour using a scheduled job.

Setup Guide
-----------

### Prerequisites

-   **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
-   **PostgreSQL**: Ensure you have PostgreSQL installed and running. You can download it from [postgresql.org](https://www.postgresql.org/).

### Installation Steps

1.  **Clone the repository**:

    bash

    Copy code

    `git clone https://github.com/Tanmay17/video-analytics.git
    cd video-analytics`

2.  **Install dependencies**:

    bash

    Copy code

    `npm install`

3.  **Set up PostgreSQL database**:

    -   Create a new PostgreSQL database:

        bash

        Copy code

        `createdb your_db_name`

    -   Run the `schema.sql` file to create the necessary tables:

        bash

        Copy code

        `psql -U your_db_username -d your_db_name -f schema.sql`

4.  **Obtain a YouTube API key**: Follow the YouTube Data API documentation to obtain an API key.

5.  **Set environment variables**: Create a `.env` file in the root directory of the project and add the following environment variables:

    env

    Copy code

    `YOUTUBE_API_KEY=your_youtube_api_key
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_DATABASE=your_db_name
    DB_HOST=your_db_host`

6.  **Run the server**:

    bash

    Copy code

    `node src/app.js`

    The server will start on port 3000 by default. You can change the port by setting the `PORT` environment variable.

API Documentation
-----------------

### Fetch Video Data

**Endpoint**: `GET /api/videos/fetch-video-data`

**Parameters**:

-   `channel_id` (required): The ID of the YouTube channel to fetch video data from.

**Example Request**:

bash

Copy code

`curl -X GET "http://localhost:3000/api/videos/fetch-video-data?channel_id=UC_x5XG1OV2P6uZZ5FSM9Ttw"`

**Example Response**:

json

Copy code

`{
  "status": "success",
  "data": [
    {
      "videoId": "abcd1234",
      "title": "Sample Video",
      "description": "This is a sample video.",
      "viewCount": 1000,
      "likeCount": 100,
      "commentCount": 20,
      "publishedAt": "2024-06-01T12:00:00Z"
    },
    ...
  ]
}`

**Description**: This endpoint fetches video details for the specified channel, processes the data to extract insights, and stores the results in the database.

### Additional Notes

-   **Scheduled Job**: The service uses `node-schedule` to update video data and recalculate insights every hour. The job is defined in `src/utils/scheduler.js`.
-   **Database Schema**: The database schema is defined in `schema.sql`. It includes two tables: `videos` to store raw video data and `insights` to store processed insights.