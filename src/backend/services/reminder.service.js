import { getNextDosageTime } from '../utils/time.util.js';
import { sendNotification } from './notification.service.js';

export const scheduleReminder = async (medication) => {
    if (!medication.frequencyHours) return;
    
    const nextTime = getNextDosageTime(medication.frequencyHours, medication.lastDose);

    console.log(`Scheduling reminder for ${medication.name} (User ${medication.userId}) at ${nextTime.toISOString()}`);
    
    // If the calculated next time is in the very near future (e.g., within 5 mins), trigger now for job testing
    if (nextTime < new Date(Date.now() + 300000)) {
         await sendNotification(medication.userId, `Reminder: It is time to take your ${medication.name}!`);
    }

    return nextTime;
};