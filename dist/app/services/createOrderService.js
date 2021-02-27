"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderRepository_1 = __importDefault(require("../repositories/orderRepository"));
const AppError_1 = __importDefault(require("../errors/AppError"));
class CreateOrderService {
    async execute(data) {
        try {
            const orders = data.map(async (orders) => {
                const order = await orderRepository_1.default.saveOrder(orders);
                return order;
            });
            const ordersSaved = await Promise.all(orders);
            return ordersSaved;
        }
        catch (err) {
            throw new AppError_1.default("error when registering order", 400);
        }
    }
}
exports.default = CreateOrderService;
