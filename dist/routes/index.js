"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dealsController_1 = __importDefault(require("../app/controllers/dealsController"));
const router = express_1.Router();
router.post("/deals/won", dealsController_1.default.getWonDeals);
router.get("/orders", dealsController_1.default.findOrderPerDate);
exports.default = router;
