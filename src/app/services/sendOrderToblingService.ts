import blingApi from "../../config/bling";
import Order from "../../database/entities/Order";
import AppError from "../errors/AppError";
import convertOrderToXml from "../../utils/xmlHelper";

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
class SendOrderToblingService {
  async execute(deals: Array<ICreateDealsService>) {
    try {
      const orders = deals.map(async (deal) => {
        
        const xml = convertOrderToXml({
          name: deal.owner_name,
          code: deal.id,
          title: deal.title,
          unitValue: deal.value,
        });

        const orderData = await blingApi.post(
          `/pedido/json/?apikey=${process.env.BLING_KEY}&xml=${xml}`
        );

        const { pedido } = orderData.data.retorno.pedidos[0];

        return pedido;
      });

      const ordersShipped = await Promise.all(orders);

      return ordersShipped;
    } catch (err) {
      throw new AppError("error sending orders to bling", 400);
    }
  }
}
export default SendOrderToblingService;
