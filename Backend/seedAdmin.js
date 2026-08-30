require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/user.model");

const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "992024";
const ADMIN_AGE = Number(process.env.ADMIN_AGE) || 30;

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");

        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

        if (existingAdmin) {
            existingAdmin.role = "admin";
            existingAdmin.password = ADMIN_PASSWORD;
            await existingAdmin.save();

            console.log(`Existing user updated to admin: ${ADMIN_EMAIL}`);
        } else {
            await User.create({
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                age: ADMIN_AGE,
                role: "admin"
            });

            console.log(`Admin account created: ${ADMIN_EMAIL}`);
        }

        console.log("Done. You can now log in with this account from the login page.");

    } catch (error) {
        console.error("Failed to seed admin:", error.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seedAdmin();