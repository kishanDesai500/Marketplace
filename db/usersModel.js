const mongoose = require("mongoose");
const db = require("./db");

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: "modifiedAt",
    },
};

const userSchema = new mongoose.Schema({
        email: { type: String, unique: true },
        password: { type: String },
    },
    options
);

const User = db.model("user", userSchema);
module.exports.User = User;