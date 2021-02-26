import { Request, Response } from "express";
import { pipedrive } from "../../config/fetch";
import CreateDealsService from "../services/createOrderInBlingService";

class DealsController {
  async getWonDeals(req:Request, res:Response) {
      
    try{
      
      const response = await pipedrive.get(
        `deals?status=won&start=0&api_token=${process.env.PIPEDRIVE_API_KEY}`
      );
      const { data } = response.data;


      const createDealsService = new CreateDealsService();
      const orders = await createDealsService.execute(data)

      return res.json(orders);

    }catch(err){

      return res.status(400).json({ message: 'error fetching data from pipedrive'})
     
    }
     
    
    //  const jk =  await createDealsService.execute(data);
    //   return res.json(jk)
  
   
  }
}

export default new DealsController();
