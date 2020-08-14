export class Users{
    constructor(
        protected id: string,
        protected name: string,
        protected nickname: string,
        protected email: string,
        protected password: string,
        protected role: UsersRole,
        protected status?: number
    ){}

    getId = () => this.id;
    getName = () => this.name;
    getEmail = () => this.email;
    getNickname = () => this.nickname;
    getPassword = () => this.password;
    getRole = () => this.role;
    getStatus = () => this.status;

    setId = (id: string) => this.id = id;
    setName = (name: string) => this.name = name;
    setNickame = (nickname: string) => this.nickname = nickname;
    setEmail = (email: string) => this.email = email;
    setPassword = (password: string) => this.password = password;
    setRole = (role: UsersRole) => this.role = role;

   static stringToUserRole(input: string): UsersRole{
        switch (input) {
            case "BAND":
              return UsersRole.BAND;
            case "PREMIUM_USER":
              return UsersRole.PREMIUM_USER;
            case "FREE_USER":
                return UsersRole.FREE_USER;
            case "ADMIN":
                return UsersRole.ADMIN;
            default:
              throw new Error("Invalid user role");
          }
    }

    static toUserModel(user: any): Users {
        return new Users(
            user.id, 
            user.name, 
            user.nickname, 
            user.email, 
            user.password, 
            Users.stringToUserRole(user.role),
            user.status);
      }
}

export interface UserInputDTO{
    email: string;
    password: string;
    name: string;
    nickname: string;
    role: string;
    status?: number;
    description?: string;
}

export interface LoginInputDTO{
    emailOrNickname: string;
    password: string;
}

export enum UsersRole{
    BAND = "BAND",
    PREMIUM_USER = "PREMIUM_USER",
    FREE_USER = "FREE_USER",
    ADMIN = "ADMIN"
}