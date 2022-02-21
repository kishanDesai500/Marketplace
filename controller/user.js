const { User } = require("../db/usersModel.js");

module.exports = {
    login: async(req, res) => {
        try {
            if (req.body.email === undefined || req.body.password === "") {
                return res.status(401).send({
                    status: "error",
                    message: "Email is required",
                });
            }
            if (req.body.password === undefined || req.body.password === "") {
                return res.status(401).send({
                    status: "error",
                    message: "Password is required",
                });
            }

            const user = await User.findOne({ email: req.body.email });
            if (user === null) {
                return res
                    .status(404)
                    .send({ status: "error", message: "user not found plz signups" });
            }

            if (user.password === req.body.password) {
                return res.status(200).send({
                    status: "success",
                    message: "user successfully login",
                    email: user.email,
                });
            } else {
                return res
                    .status(403)
                    .send({ status: "error", message: "password is wrong" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "error", message: err.message });
        }
    },

    signUp: async(req, res) => {
        try {
            console.log("inside signUp");
            console.log(req.body);

            if (req.body.email === undefined || req.body.password === "") {
                return res.status(401).send({
                    status: "error",
                    message: "Email is required",
                });
            }

            if (req.body.password === undefined || req.body.password === "") {
                return res.status(403).send({
                    status: "bad request",
                    message: "Password is required",
                });
            }

            let userData = await User.findOne({ email: req.body.email });
            if (userData !== null) {
                return res.status(403).send({ message: "plz use uniq user email" });
            }

            await User.create(req.body, (err, query) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(500)
                        .send({ status: "error", message: err.message });
                }
                if (query) {
                    return res.status(200).send({
                        status: "success",
                        message: "User created successfully",
                        data: query,
                    });
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "error", message: err.message });
        }
    },
};