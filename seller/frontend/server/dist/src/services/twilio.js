"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const twilio_1 = __importDefault(require("twilio"));
exports.Client = (0, twilio_1.default)(process.env.TWILIO_CLIENT_ID, process.env.TWILIO_SECRET_key);
