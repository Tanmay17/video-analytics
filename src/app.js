const express = require('express');
const videoRoutes = require('./routes/VideoRoutes');
const { updateData } = require('./utils/scheduler');

const app = express();

app.use(express.json());
app.use('/api/videos', videoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    updateData(); // Initial data fetch
});