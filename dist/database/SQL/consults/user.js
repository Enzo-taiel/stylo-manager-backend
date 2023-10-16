"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinUser = void 0;
const connectSQL_1 = require("../connectSQL");
async function signinUser(username) {
    try {
        const res = await connectSQL_1.db.one('SELECT * FROM users WHERE username = $1', [username]);
        console.log({ res });
        return res;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
exports.signinUser = signinUser;
// export async function findUser(userId: string): Promise<IUser | null> {
//   try {
//     const res = await db.one('SELECT * FROM Users WHERE id = $1', [userId])
//     console.log({res})
//     return res
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }
