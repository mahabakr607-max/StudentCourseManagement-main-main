const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email"],
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            maxlength: [100, "Password cannot exceed 100 characters"]
        },

        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [16, "Age must be at least 16"],
            max: [100, "Age cannot exceed 100"],
            validate: {
                validator: Number.isInteger,
                message: "Age must be an integer"
            }
        },

        avatar: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            enum: {
                values: ["user", "admin"],
                message: "Role must be user or admin"
            },
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);