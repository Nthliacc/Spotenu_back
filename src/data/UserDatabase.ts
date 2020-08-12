import { BaseDatabase } from "./BaseDatabase";
import { Users } from "../model/Users";

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
    status?: boolean
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
};