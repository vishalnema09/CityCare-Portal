import Complaint from '../models/complaint.model.js';
import Admin from '../models/admin.model.js';

export const autoEscalationJob = async () => {
    try {
        // Find unresolved complaints older than 5 minutes
        const complaintsToEscalate = await Complaint.find({
            status: { $in: ['pending'] },  // Ensure the status is 'pending'
            resolvedAt: { $exists: false }, // Ensure the complaint is unresolved
            createdAt: { $lt: new Date(Date.now() - 10 * 24 * 60 * 1000) }, // Older than 5 minutes (5 * 60 * 1000 ms)
        });

        for (const complaint of complaintsToEscalate) {
            const admin = await Admin.findOne({ _id: complaint.adminId }); // Ensure admin is linked in complaint

            if (admin) {
                // Log the escalation
                admin.complaintActions.push({
                    complaintId: complaint._id,
                    actionType: 'escalated',
                    message: 'Complaint auto-escalated due to inactivity for more than 5 minutes.',
                });

                admin.escalatedComplaints.push({
                    complaintId: complaint._id,
                });

                await admin.save();
            }

            // Update the complaint status and tweet eligibility
            complaint.status = 'escalated';
            complaint.tweetAllowed = true; // ✅ Allow user to tweet this complaint
            await complaint.save();
        }

        console.log('Auto-escalation and tweet permission update completed successfully');
    } catch (error) {
        console.error('Error in auto-escalation job:', error);
    }
};
