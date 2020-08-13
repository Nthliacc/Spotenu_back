import { BaseDatabase } from "./BaseDatabase";
import { Users } from "../model/Users";
import { Band } from "../model/Band";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "Spotenu_Users";

  public async createUser(
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: string,
    description?: string,
    status?: number
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
          description,
          status
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmailOrNickname(emailOrNickname: string ): Promise<Users> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({email: emailOrNickname })
      .orWhere({nickname: emailOrNickname});

    return Users.toUserModel(result[0]);
  }


  public async getAllBands(): Promise<Band[]>{
    const result = await this.getConnection()
      .select("*") 
      .from(UserDatabase.TABLE_NAME)
      .where({role: "band"})
      .orderBy("name","asc");

    return result;
    console.log(result[0]);
  }
};