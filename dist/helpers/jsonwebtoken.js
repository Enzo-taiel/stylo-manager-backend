"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatchPassword = exports.decodingToken = exports.createToken = void 0;
const JWTOKEN = __importStar(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const variables_1 = require("../config/variables");
const createToken = (_id) => {
    const token = JWTOKEN.sign({ _id }, variables_1.JWT.SECRET_KEY);
    return token;
};
exports.createToken = createToken;
const decodingToken = (token) => {
    const payload = JWTOKEN.verify(token, variables_1.JWT.SECRET_KEY);
    return payload;
};
exports.decodingToken = decodingToken;
const isMatchPassword = async (textEncripting, textCompare) => {
    const isMatch = await bcrypt_1.default.compare(textEncripting, textCompare);
    return isMatch;
};
exports.isMatchPassword = isMatchPassword;
