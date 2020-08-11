export class Admin{
    constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private role: AdminRole
    ){}

    getId = () => this.id;
    getName = () => this.name;
    getEmail = () => this.email;
    getNickname = () => this.nickname;
    getPassword = () => this.password;
    getRole = () => this.role;

    setId = (id: string) => this.id = id;
    setName = (name: string) => this.name = name;
    setNickame = (nickname: string) => this.nickname = nickname;
    setEmail = (email: string) => this.email = email;
    setPassword = (password: string) => this.password = password;
    setRole = (role: AdminRole) => this.role = role;

   static stringToUserRole(input: string): AdminRole{
        switch (input) {
            case "BAND":
              return AdminRole.BAND;
            case "PREMIUM_USER":
              return AdminRole.PREMIUM_USER;
            case "FREE_USER":
                return AdminRole.FREE_USER;
            case "ADMIN":
                return AdminRole.ADMIN;
            default:
              throw new Error("Invalid user role");
          }
    }

    static toUserModel(admin: any): Admin {
        return new Admin(
            admin.id, 
            admin.name, 
            admin.nickname, 
            admin.email, 
            admin.password, 
            admin.stringToUserRole(admin.role));
      }


}

export interface AdminInputDTO{
    email: string;
    password: string;
    name: string;
    nickname: string;
    role: string;
}

export interface LoginInputDTO{
    email: string;
    password: string;
}

export enum AdminRole{
    BAND = "BAND",
    PREMIUM_USER = "PREMIUM_USER",
    FREE_USER = "FREE_USER",
    ADMIN = "ADMIN"
}