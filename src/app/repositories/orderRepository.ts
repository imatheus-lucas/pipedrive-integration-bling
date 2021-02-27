import Order from "../../database/entities/Order";

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
class OrderRepository {
  async saveOrder({
    id,
    org_name,
    person_name,
    title,
    weighted_value,
    weighted_value_currency,
  }: ICreateDealsService) {
    const order = await Order.create({
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
    const orders = await Order.aggregate([
      {
        $sort: {
          value: -1,
        },
      },
      {
        $project: {
          id_order: "$id_order",
          customer: {
            company: "$company",
            contact_person: "$contact_person",
          },
          item: {
            code: "$code",
            description: "$title",
            currency: "$currency",
            total_value: "$total_value",
          },
        },
      },
      {
        _id: "$id",
        orders: {
          $push: "$$ROOT",
        },
      },
    ]);

    return orders;
  }
}

export default new OrderRepository();
