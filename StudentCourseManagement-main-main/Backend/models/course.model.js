const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Course title is required"],
            minlength: [2, "Course title must be at least 2 characters"],
            maxlength: [100, "Course title cannot exceed 100 characters"],
            trim: true
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            minlength: [5, "Description must be at least 5 characters"],
            maxlength: [1000, "Description cannot exceed 1000 characters"],
            trim: true
        },

        instructor: {
            type: String,
            required: [true, "Instructor is required"],
            minlength: [2, "Instructor must be at least 2 characters"],
            maxlength: [100, "Instructor cannot exceed 100 characters"],
            trim: true
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"]
        },

        duration: {
            type: String,
            required: [true, "Duration is required"],
            minlength: [1, "Duration is required"],
            maxlength: [50, "Duration cannot exceed 50 characters"],
            trim: true
        },

        image: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model("Course", courseSchema);