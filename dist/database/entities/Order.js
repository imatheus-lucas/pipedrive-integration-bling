"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    id_order: { type: String, required: true, unique: true },
    customer: {
        company: { type: String, required: true },
        contact_person: { type: String, required: true },
    },
    item: {
        code: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        currency: { type: String, required: true },
        total_value: { type: Number, required: true },
    },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
const Order = mongoose_1.model("orders", OrderSchema);
exports.default = Order;
