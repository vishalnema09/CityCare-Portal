import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import userRouter from "./src/routes/user.routes.js";
import adminRouter from "./src/routes/admin.routes.js";
import departmentRouter from "./src/routes/department.routes.js";
import complaintRouter from "./src/routes/complaint.routes.js"


dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/department', departmentRouter);
app.use('/api/complaint', complaintRouter)


connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
