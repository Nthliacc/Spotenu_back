import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {

  private static TABLE_USERS = "Spotenu_Users";

  public async getBandById(id: string ): Promise<Band> {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_USERS)
      .where({ id })

    return Band.toBandModel(result[0]);
  }

  public async getAllBands(): Promise<Band[]>{
    const result = await this.getConnection()
      .select("*") 
      .from(BandDatabase.TABLE_USERS)
      .orderBy("name","asc");
    
    return result;
    
  }
  public async postApproveBand(id: string){
      await this.getConnection(). raw(`
        UPDATE ${BandDatabase.TABLE_USERS}
        SET status = 1
        WHERE id = "${id}"
      `)
  }
};