const express = require("express");

const {
    addCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    searchCourses
} = require("../controllers/course.controller");

const authMiddleware = require("../middleware/auth.middleware");
const checkAdmin = require("../middleware/checkRole");

const router = express.Router();


router.get(
    "/",
    authMiddleware,
    getCourses
);
router.get(
    "/search",
    authMiddleware,
    searchCourses
);


router.get(
    "/:id",
    authMiddleware,
    getCourseById
);


router.post(
    "/",
    authMiddleware,
    checkAdmin,
    addCourse
);


router.put(
    "/:id",
    authMiddleware,
    checkAdmin,
    updateCourse
);


router.delete(
    "/:id",
    authMiddleware,
    checkAdmin,
    deleteCourse
);


module.exports = router;