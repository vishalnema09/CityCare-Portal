
import jwt from "jsonwebtoken";
import Department from "../models/department.model.js";

export const verifyDepartment = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const department = await Department.findById(decoded.id);
        console.log(decoded.id)
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        req.department = department;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

