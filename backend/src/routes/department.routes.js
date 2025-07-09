import { Router } from "express";
import { getAssignedComplaints, getPendingComplaints, getRejectedComplaints, getResolvedComplaints, getSingleComplaint, loginDepartment, logoutDepartment, updateComplaintStatus } from "../controllers/department.controller.js";
import { verifyDepartment } from "../middlewares/verifyDepartment.js";
const router = Router();


router.post("/login" , loginDepartment)
router.get("/logout", verifyDepartment, logoutDepartment);
router.get("/assigned-complaints", verifyDepartment, getAssignedComplaints);
router.get("/rejected-complaints", verifyDepartment, getRejectedComplaints);
router.get("/resolved-complaints", verifyDepartment, getResolvedComplaints);
router.get("/complaint/:id", verifyDepartment, getSingleComplaint);
router.post("/update-complaint-status", verifyDepartment, updateComplaintStatus);
router.get("/pending-complaints", verifyDepartment, getPendingComplaints); // Assuming this is the correct endpoint for pending complaints





export default router;