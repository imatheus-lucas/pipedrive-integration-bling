"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const pipedriveApi = axios_1.default.create({
    baseURL: `https://${process.env.PIPEDRIVE_DOMAIN}.pipedrive.com/api/v1`
});
exports.default = pipedriveApi;
