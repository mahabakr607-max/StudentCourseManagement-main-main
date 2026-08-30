const checkStudent = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(403).json({
            message: "Only students can enroll in courses"
        });
    }

    next();
};

module.exports = checkStudent;