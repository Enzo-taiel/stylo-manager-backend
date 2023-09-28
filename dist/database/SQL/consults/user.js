"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = void 0;
const connectSQL_1 = require("../connectSQL");
async function findUser(userId) {
    try {
        const res = await connectSQL_1.db.one('SELECT * FROM Users WHERE id = $1', [userId]);
        console.log({ res });
        return res;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
exports.findUser = findUser;
