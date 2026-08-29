const express = require("express");

const {
    enrollCourse,
    getMyCourses,
    cancelEnrollment
} = require("../controllers/enrollment.controller");

const authMiddleware = require("../middleware/auth.middleware");
const checkStudent = require("../middleware/checkStudent");

const router = express.Router();




router.post(
    "/",
    authMiddleware,
    checkStudent,
    enrollCourse
);




router.get(
    "/my-courses",
    authMiddleware,
    checkStudent,
    getMyCourses
);




router.delete(
    "/:id",
    authMiddleware,
    checkStudent,
    cancelEnrollment
);


module.exports = router;