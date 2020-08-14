import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {

  private static TABLE_USERS = "Spotenu_Users";
  
  public async createBand(
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: string,
    status: number = 0,
    description: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          nickname,
          password,
          role,
          status,
          description
        })
        .into(BandDatabase.TABLE_USERS);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

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
      .where({role: "band"})
      .orderBy("name","asc");
    
    return result;
    
  }
  public async postApproveBand(id: string): Promise<void>{
      await this.getConnection(). raw(`
        UPDATE ${BandDatabase.TABLE_USERS}
        SET status = 1
        WHERE id = "${id}"
      `)
  }
};