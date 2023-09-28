"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninController = void 0;
const SigninController = (req, res) => {
    const { username, password } = req.body;
    if (!username)
        return res.status(402).json({ error: true, message: "" });
    if (!password)
        return res.status(402).json({ error: true, message: "" });
    return res.end("end");
};
exports.SigninController = SigninController;
