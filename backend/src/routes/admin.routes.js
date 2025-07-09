import { Router } from "express";
import { loginAdmin, registerAdmin,logoutAdmin, createDepartment, forwardComplaint, getAssignedComplaintsController, fetchSingleComplaint, getForwardedComplaints, fetchClosedComplaints, fetchRejectedComplaints, getPendingComplaintsAssignedToAdmin, getEscalatedComplaintsByAdmin } from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/logout', isAdmin, logoutAdmin)
router.post('/create/department', isAdmin, createDepartment)
router.put('/forward/:id', isAdmin, forwardComplaint);
router.get('/all-complaints', isAdmin, getAssignedComplaintsController);
router.get('/complaint/:complaintId', isAdmin,  fetchSingleComplaint);
router.get('/forwarded-complaints', isAdmin, getForwardedComplaints);
router.get('/rejected-complaints', isAdmin, fetchRejectedComplaints);
router.get('/closed-complaints', isAdmin, fetchClosedComplaints);
router.get("/pending/complaints", isAdmin, getPendingComplaintsAssignedToAdmin);
router.get('/escalated-complaints', isAdmin, getEscalatedComplaintsByAdmin);




export default router;
