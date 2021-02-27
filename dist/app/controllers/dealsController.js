"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pipedrive_1 = __importDefault(require("../../config/pipedrive"));
const Order_1 = __importDefault(require("../../database/entities/Order"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const orderRepository_1 = __importDefault(require("../repositories/orderRepository"));
const createOrderService_1 = __importDefault(require("../services/createOrderService"));
const sendOrderToblingService_1 = __importDefault(require("../services/sendOrderToblingService"));
class DealsController {
    async getWonDeals(req, res) {
        try {
            const response = await pipedrive_1.default.get(`deals?status=won&start=0&api_token=${process.env.PIPEDRIVE_API_KEY}`);
            const { data } = response.data;
            const sendOrderToblingService = new sendOrderToblingService_1.default();
            const createOrderService = new createOrderService_1.default();
            const orders = await sendOrderToblingService.execute(data);
            await createOrderService.execute(data);
            return res.json(orders);
        }
        catch (err) {
            throw new AppError_1.default("error fetching data from pipedrive", 400);
        }
    }
    async findAllOrder(req, res) {
        const orders = await Order_1.default.find();
        if (!orders) {
            return express_1.response.status(404).json({ message: "content not found" });
        }
        return res.json(orders);
    }
    async findOrderPerDate(req, res) {
        const orders = await orderRepository_1.default.ordersPerDate();
        if (!orders) {
            return express_1.response.status(404).json({ message: "content not found" });
        }
        return res.json(orders);
    }
}
exports.default = new DealsController();
