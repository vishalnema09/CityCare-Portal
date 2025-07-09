import cron from 'node-cron';
import { autoEscalationJob } from '../cronJobs/autoEscalationCron.js';

const startCronJobs = () => {
    // Schedule the auto escalation job to run every day at midnight
    cron.schedule('*/2 * * * *', autoEscalationJob);  // Runs every day at midnight
    console.log('Running auto escalation job every minute...');
};

export default startCronJobs;
