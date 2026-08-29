require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.route");
const courseRoutes = require("./routes/course.route");
const profileRoutes = require("./routes/profile.route");
const enrollmentRoutes = require("./routes/enrollment.route");
const dashboardRoutes = require("./routes/dashboard.route");

const authMiddleware = require("./middleware/auth.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));




app.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user
    });
});




app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/dashboard", dashboardRoutes);




app.get("/", (req, res) => {
    res.send("Student Course Management API is running");
});




app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});




app.use(errorMiddleware);




mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });