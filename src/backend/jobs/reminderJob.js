import cron from 'node-cron';
import db from '../config/db.js';
import { scheduleReminder } from '../services/reminder.service.js';

const reminderJob = () => {
    // Schedule to run every 15 minutes
    cron.schedule('*/15 * * * *', async () => {
        console.log('[CRON] Running scheduled reminder check...');

        try {
            const Medications = db.collection('medications');
            
            // Query for active medications that require checking (simplistic query)
            const snapshot = await Medications.where('status', '==', 'active').get();
            
            snapshot.forEach(doc => {
                const medication = { id: doc.id, ...doc.data() };
                // Call the service to check/reschedule/trigger the reminder
                scheduleReminder(medication);
            });

        } catch (error) {
            console.error("Error running reminder job:", error);
        }
    });

    console.log('Reminder Cron Job scheduled.');
};

export default reminderJob;