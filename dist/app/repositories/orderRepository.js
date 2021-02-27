"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../../database/entities/Order"));
class OrderRepository {
    async saveOrder({ id, org_name, person_name, title, weighted_value, weighted_value_currency, }) {
        const order = await Order_1.default.create({
            id_order: id,
            customer: {
                company: org_name,
                contact_person: person_name,
            },
            item: {
                code: id,
                description: title,
                currency: weighted_value_currency,
                total_value: weighted_value,
            },
        });
        return order;
    }
    async ordersPerDate() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const outDate = new Date();
        outDate.setHours(23, 59, 59, 59);
        const orders = await Order_1.default.aggregate([
            {
                $match: {
                    created_at: {
                        $gt: date,
                        $lt: outDate,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    orders: {
                        $push: {
                            id_order: "$id_order",
                            customer: {
                                company: "$customer.company",
                                contact_person: "$customer.contact_person",
                            },
                            item: {
                                code: "$item.code",
                                description: "$item.description",
                                currency: "$item.currency",
                                total_value: "$item.total_value",
                            },
                        },
                    },
                    total_currency: {
                        $sum: "$item.total_value"
                    }
                },
            },
        ]);
        return orders;
    }
}
exports.default = new OrderRepository();
