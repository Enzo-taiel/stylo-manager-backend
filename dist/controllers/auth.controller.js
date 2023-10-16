"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupController = exports.SigninController = void 0;
// DATABASE
const users_model_1 = __importDefault(require("../database/models/users.model"));
// HELPERS
const jsonwebtoken_1 = require("../helpers/jsonwebtoken");
const SigninController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username)
            return res.status(400).json({ error: true, message: "Insert your username." });
        if (!password)
            return res.status(400).json({ error: true, message: "Insert yout password." });
        const User = await users_model_1.default.findOne({ username });
        if (!User)
            return res.status(400).json({ error: true, message: "Username do not exist." });
        const isMatch = await (0, jsonwebtoken_1.isMatchPassword)(password, User.password);
        if (!isMatch)
            return res.status(400).json({ error: true, message: "Password incorrect." });
        return res.status(200).json({ success: true, message: "Login successfully.", data: User });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Error internal Server." });
    }
};
exports.SigninController = SigninController;
const SignupController = async (req, res) => {
    try {
        const { name, last_name, username, password, email, password_repiter } = req.body;
        if (!name)
            return res.status(400).json({ error: true, message: "Insert your name." });
        if (!email)
            return res.status(400).json({ error: true, message: "Insert your email." });
        if (!username)
            return res.status(400).json({ error: true, message: "Insert your username." });
        if (!password)
            return res.status(400).json({ error: true, message: "Insert your password." });
        if (!last_name)
            return res.status(400).json({ error: true, message: "Insert your lastname." });
        if (!password_repiter)
            return res.status(400).json({ error: true, message: "Repit your password." });
        const exist_username = await users_model_1.default.findOne({ username });
        const exist_email = await users_model_1.default.findOne({ email });
        if (exist_username)
            return res.status(400).json({ error: true, message: "Your username already exist." });
        if (exist_email)
            return res.status(400).json({ error: true, message: "Your email already exist." });
        const User = await users_model_1.default.create(req.body);
        return res.status(200).json({ success: true, message: "User register successfully.", data: User });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Error internal Server." });
    }
};
exports.SignupController = SignupController;
