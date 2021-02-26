import jsontoxml from "jsontoxml";
import { bling } from "../../config/fetch";

interface ICreateDealsService {
  org_id: {
    name: string;
    people_count: number;
    owner_id: number;
    address: string;
    active_flag: boolean;
    cc_email: string;
    value: number;
  };
  value: number;
  creator_user_id: {
    email: string;
  };
}
class CreateOrderService {
  async execute(deals: Array<ICreateDealsService>) {
    const orders = deals.map(async (deal) => {
      const xml = jsontoxml({
        pedido: [
          {
            name: "cliente",
            children: [
              {
                name: "nome",
                text: deal.org_id.name ? deal.org_id.name : "Company",
              },
              { name: "tipoPessoa", text: "J" },
              { name: "endereco", text: "Av. Paulista" },
              { name: "ie_rg", text: "3067663210" },
              { name: "numero", text: "1200" },
              { name: "bairro", text: "Bela Vista" },
              { name: "cep", text: "01310-100" },
              { name: "cidade", text: "Sao Paulo" },
              { name: "uf", text: "SP" },
              { name: "fone", text: "5481153381" },
              {
                name: "email",
                text: deal.creator_user_id.email || "company@gmail.com",
              },
            ],
          },
          {
            name: "transporte",
            children: [
              { name: "transportadora", text: "Transportadora XYZ" },
              { name: "tipo_frete", text: "R" },
              { name: "servico_correios", text: "SEDEX - CONTRATO" },
              {
                name: "dados_etiqueta",
                children: [
                  { name: "nome", text: "Endereco de entrega" },
                  { name: "endereco", text: "Rua Visconde de Sao Gabriel" },
                  { name: "numero", text: "392" },
                  { name: "complemento", text: "Sala 59" },
                  { name: "municipio", text: "Bento Goncalves" },
                  { name: "uf", text: "RS" },
                  { name: "cep", text: "95.700-000" },
                  { name: "cidade", text: "Cidade Alta" },
                ],
              },
              {
                name: "volumes",
                children: [
                  {
                    name: "volume",
                    children: [
                      {
                        name: "servico",
                        text: "SEDEX - CONTRATO",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "itens",
            children: [
              {
                name: "item",
                children: [
                  { name: "codigo", text: 1 },
                  { name: "descricao", text: "Won deal" },
                  { name: "un", text: "Un" },
                  { name: "qtde", text: 1 },
                  { name: "vlr_unit", text: deal.value || 0 },
                ],
              },
            ],
          },
          {
            name: "parcelas",
            children: [
              {
                name: "parcela",
                children: [
                  {
                    name: "vlr",
                    text: deal.value || 0,
                  },
                ],
              },
            ],
          },
        ],
      });

      try {
        const orderData = await bling.post(
          `/pedido/json/?apikey=${process.env.BLING_KEY}&xml=${xml}`
        );

        const { pedido } = orderData.data.retorno.pedidos[0];

        pedido.value = deal.value;
        pedido.orgName = deal.org_id.name;

        return pedido;
      } catch (err) {
        throw new Error("error sending requests to bling");
      }
    });

    const cretedOrders = await Promise.all(orders);

    return cretedOrders;
  }
}
export default CreateOrderService;
