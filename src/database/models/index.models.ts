import { databaseAuth } from "../connect";
import { User_Schema } from "./users.model";

export const UsersModel = databaseAuth.model("users", User_Schema)