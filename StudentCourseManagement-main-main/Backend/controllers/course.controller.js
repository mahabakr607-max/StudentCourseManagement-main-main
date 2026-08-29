const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");


const addCourse = async (req, res, next) => {

    try {

        const {
            title,
            description,
            instructor,
            price,
            duration,
            image
        } = req.body;


        const course =
            await Course.create({

                title,
                description,
                instructor,
                price,
                duration,
                image: image || ""

            });


        res.status(201).json({

            message:
                "Course added successfully",

            course

        });

    } catch (error) {

        next(error);
    }
};


const getCourses = async (req, res, next) => {

    try {

        const courses =
            await Course.find()
                .sort({ createdAt: -1 });


        res.status(200).json({

            courses

        });

    } catch (error) {

        next(error);
    }
};


const getCourseById = async (req, res, next) => {

    try {

        const course =
            await Course.findById(
                req.params.id
            );


        if (!course) {

            return res.status(404).json({

                message:
                    "Course not found"

            });
        }


        res.status(200).json({

            course

        });

    } catch (error) {

        next(error);
    }
};


const updateCourse = async (req, res, next) => {

    try {

        const course =
            await Course.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!course) {

            return res.status(404).json({

                message:
                    "Course not found"

            });
        }


        res.status(200).json({

            message:
                "Course updated successfully",

            course

        });

    } catch (error) {

        next(error);
    }
};


const deleteCourse = async (req, res, next) => {

    try {

        const course =
            await Course.findByIdAndDelete(
                req.params.id
            );


        if (!course) {

            return res.status(404).json({

                message:
                    "Course not found"

            });
        }


        await Enrollment.deleteMany({

            course:
                course._id

        });


        res.status(200).json({

            message:
                "Course and related enrollments deleted successfully"

        });

    } catch (error) {

        next(error);
    }
};


const searchCourses = async (req, res, next) => {

    try {

        const { q } = req.query;


        if (!q || q.trim() === "") {

            return res.status(400).json({

                message:
                    "Search query is required"

            });
        }


        const searchTerm =
            q.trim();


        const courses =
            await Course.find({

                $or: [

                    {
                        title: {
                            $regex: searchTerm,
                            $options: "i"
                        }
                    },

                    {
                        description: {
                            $regex: searchTerm,
                            $options: "i"
                        }
                    },

                    {
                        instructor: {
                            $regex: searchTerm,
                            $options: "i"
                        }
                    }

                ]

            });


        res.status(200).json({

            courses

        });

    } catch (error) {

        next(error);
    }
};


module.exports = {

    addCourse,

    getCourses,

    getCourseById,

    updateCourse,

    deleteCourse,

    searchCourses

};