const Course = require("../models/course.model");

const getDashboard = async (req, res, next) => {
    try {
        const courses = await Course.find()
            .sort({ createdAt: -1 })
            .limit(6);

        const totalCourses = await Course.countDocuments();

        res.status(200).json({
            message: "Dashboard data retrieved successfully",
            totalCourses,
            courses
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboard
};