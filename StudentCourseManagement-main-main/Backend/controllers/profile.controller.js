const User = require("../models/user.model");
const bcrypt = require("bcryptjs");


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({
            msg: err.message
        });
    }
};


const updateProfile = async (req, res) => {
    try {
        const { name, email, age, avatar } = req.body;

        if (
            name === undefined &&
            email === undefined &&
            age === undefined &&
            avatar === undefined
        ) {
            return res.status(400).json({
                msg: "At least one field is required"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (email !== undefined) {
            user.email = email;
        }

        if (age !== undefined) {
            user.age = age;
        }

        if (avatar !== undefined) {
            user.avatar = avatar;
        }

        await user.save();

        res.status(200).json({
            msg: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                avatar: user.avatar,
                role: user.role
            }
        });

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: Object.values(err.errors).map(
                    (error) => error.message
                )
            });
        }

        if (err.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            msg: err.message
        });
    }
};


const changePassword = async (req, res) => {
    try {
        const {
            oldPassword,
            newPassword,
            confirmNewPassword
        } = req.body;

        console.log("========== CHANGE PASSWORD DEBUG ==========");
        console.log("User id:", req.user.id);

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                msg: "All fields are required"
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                msg: "New password and confirmation do not match"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                msg: "New password must be at least 6 characters"
            });
        }

        // لازم نجيب اليوزر بالباسورد صراحة، عشان لو أي حد
        // مستقبلاً حط select:false على الحقل، الكود يفضل شغال
        const user = await User.findById(req.user.id).select("+password");

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        const isMatch = await user.comparePassword(oldPassword);

        console.log("Old password matches:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                msg: "Incorrect old password"
            });
        }

        // بنعمل الهاش هنا صراحة وبنحدث الداتابيز مباشرة بـ
        // findByIdAndUpdate، عشان منبقاش معتمدين على إن الـ
        // pre("save") hook يتنادى صح جوه الـ document instance.
        const hashedPassword = await bcrypt.hash(newPassword, 8);

        await User.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword },
            { runValidators: false }
        );

        console.log("Password updated in database successfully");
        console.log("=============================================");

        res.status(200).json({
            msg: "Password changed successfully"
        });

    } catch (err) {

        console.error("CHANGE PASSWORD ERROR:", err);

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: Object.values(err.errors).map(
                    (error) => error.message
                )
            });
        }

        res.status(500).json({
            msg: err.message
        });
    }
};


module.exports = {
    getProfile,
    updateProfile,
    changePassword
};