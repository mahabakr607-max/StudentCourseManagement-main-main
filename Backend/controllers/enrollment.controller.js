const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");



const enrollCourse = async (req, res, next) => {
    try {

        console.log("========== ENROLLMENT DEBUG ==========");
        console.log("User:", req.user);
        console.log("Body:", req.body);

        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({
                message: "Course ID is required"
            });
        }

        const course = await Course.findById(courseId);

        console.log("Course found:", course);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const existingEnrollment = await Enrollment.findOne({
            student: req.user.id,
            course: courseId
        });

        console.log(
            "Existing enrollment:",
            existingEnrollment
        );

        if (existingEnrollment) {
            return res.status(409).json({
                message: "Already enrolled in this course"
            });
        }

        const enrollment = await Enrollment.create({
            student: req.user.id,
            course: courseId
        });

        console.log(
            "New enrollment created:",
            enrollment
        );

        console.log("======================================");

        res.status(201).json({
            message: "Enrolled successfully",
            enrollment
        });

    } catch (error) {

        console.error(
            "ENROLLMENT ERROR:",
            error
        );

        next(error);
    }
};




const getMyCourses = async (req, res, next) => {
    try {

        console.log("========== MY COURSES DEBUG ==========");
        console.log("User:", req.user);

        const enrollments = await Enrollment.find({
            student: req.user.id
        }).populate("course");

        console.log(
            "Enrollments found:",
            enrollments
        );

        const courses = enrollments.map((enrollment) => ({
            enrollmentId: enrollment._id,
            course: enrollment.course
        }));

        console.log(
            "Courses returned:",
            courses
        );

        console.log("======================================");

        res.status(200).json({
            courses
        });

    } catch (error) {

        console.error(
            "GET MY COURSES ERROR:",
            error
        );

        next(error);
    }
};




const cancelEnrollment = async (req, res, next) => {
    try {

        const { id } = req.params;

        const enrollment = await Enrollment.findOneAndDelete({
            _id: id,
            student: req.user.id
        });

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found"
            });
        }

        res.status(200).json({
            message: "Enrollment cancelled successfully"
        });

    } catch (error) {

        console.error(
            "CANCEL ENROLLMENT ERROR:",
            error
        );

        next(error);
    }
};


module.exports = {
    enrollCourse,
    getMyCourses,
    cancelEnrollment
};