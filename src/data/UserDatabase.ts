import { BaseDatabase } from "./BaseDatabase";
import { Users } from "../model/Users";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "Users_Spotenu";

  public async createUser(
    id: string,
    email: string,
    name: string,
    nickname: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          nickname,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<Users> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return Users.toUserModel(result[0]);
  }

}
