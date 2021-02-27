import Order from "../../database/entities/Order";
import OrderRepository from "../repositories/orderRepository";
import AppError from "../errors/AppError";
interface ICreateDealsService {
  id: number;
  title: number;
  value: number;
  owner_name: string;
  org_name: string;
  person_name: string;
  code: string;
  weighted_value_currency: string;
  weighted_value: number;
}

class CreateOrderService {
  async execute(data: Array<ICreateDealsService>) {
    try {
      const orders = data.map(async (orders) => {
        const order = await OrderRepository.saveOrder(orders);
        return order;
      });
      const ordersSaved = await Promise.all(orders);

      return ordersSaved;
    } catch (err) {
      throw new AppError("error when registering order", 400);
    }
  }
}

export default CreateOrderService;
