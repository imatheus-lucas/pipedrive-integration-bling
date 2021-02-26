import { Request, Response } from "express";
import { pipedrive } from "../../config/fetch";
import CreateDealsService from "../services/createDealsService";

class DealsController {
  async getWonDeals(req:Request, res:Response) {
 
      const response = await pipedrive.get(
        `deals?status=won&start=0&api_token=${process.env.PIPEDRIVE_API_KEY}`
      );
      const { data } = response.data;


      const createDealsService = new CreateDealsService();
     const jk =  await createDealsService.execute(data);
      return res.json(jk)
  
   
  }
}

export default new DealsController();
