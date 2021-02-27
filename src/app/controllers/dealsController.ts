import { Request, response, Response } from "express";
import pipedriveApi from "../../config/pipedrive";
import Order from "../../database/entities/Order";
import AppError from "../errors/AppError";
import orderRepository from "../repositories/orderRepository";
import CreateOrderService from "../services/createOrderService";
import SendOrderToblingService from "../services/sendOrderToblingService";

class DealsController {
  async getWonDeals(req: Request, res: Response) {
    try {
      const response = await pipedriveApi.get(
        `deals?status=won&start=0&api_token=${process.env.PIPEDRIVE_API_KEY}`
      );
      const { data } = response.data;

      const sendOrderToblingService = new SendOrderToblingService();
      const createOrderService = new CreateOrderService();

      const orders = await sendOrderToblingService.execute(data);
      await createOrderService.execute(data);

      return res.json(orders);
    } catch (err) {
      throw new AppError("error fetching data from pipedrive", 400);
    }
  }
  async findAllOrder(req: Request, res: Response) {
    const orders = await Order.find();

    if (!orders) {
      return response.status(404).json({ message: "content not found" });
    }
    return res.json(orders);
  }
  async findOrderPerDate(req: Request, res: Response) {
    const orders = await orderRepository.ordersPerDate();
  
    
    if (!orders) {
      return response.status(404).json({ message: "content not found" });
    }
    return res.json(orders);
  }
}

export default new DealsController();
