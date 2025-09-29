import app from './app.js';
import dotenv from 'dotenv';
import reminderJob from './jobs/reminderJob.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize Cron Jobs
reminderJob();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});