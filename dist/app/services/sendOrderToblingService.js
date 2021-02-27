"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bling_1 = __importDefault(require("../../config/bling"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const xmlHelper_1 = __importDefault(require("../../utils/xmlHelper"));
class SendOrderToblingService {
    async execute(deals) {
        try {
            const orders = deals.map(async (deal) => {
                const xml = xmlHelper_1.default({
                    name: deal.owner_name,
                    code: deal.id,
                    title: deal.title,
                    unitValue: deal.value,
                });
                const orderData = await bling_1.default.post(`/pedido/json/?apikey=${process.env.BLING_KEY}&xml=${xml}`);
                const { pedido } = orderData.data.retorno.pedidos[0];
                return pedido;
            });
            const ordersShipped = await Promise.all(orders);
            return ordersShipped;
        }
        catch (err) {
            throw new AppError_1.default("error sending orders to bling", 400);
        }
    }
}
exports.default = SendOrderToblingService;
