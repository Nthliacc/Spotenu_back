import { Users, UsersRole, UserInputDTO } from "./Users";

export class Band extends Users{
    
    constructor(
        id: string,
        name: string,
        nickname: string,
        email: string,
        password: string,
        role: UsersRole,
        status: number = 0, 
        private description: string
    ){ 
        super(id, name, nickname, email, password, role, status)
    };

    getId = () => this.id;
    getName = () => this.name;
    getNickname = () => this.nickname;
    getEmail = () => this.email;
    getPassword = () => this.password;
    getRole = () => this.role;
    getDescription = () => this.description;
    getStatus = () => this.status;

    setId = (id: string) => this.id = id;
    setName = (name: string) => this.name = name;
    setNickame = (nickname: string) => this.nickname = nickname;
    setEmail = (email: string) => this.email = email;
    setPassword = (password: string) => this.password = password;
    setRole = (role: UsersRole) => this.role = role;
    setDescription = (description: string) => this.description = description;
    setStatus = (status: number) => this.status = status;

    static toBandModel(band: any): Band{
        return new Band(
            band.id, 
            band.name, 
            band.nickname, 
            band.email, 
            band.password,
            band.role,
            band.status,
            band.description);
      };
};

export interface BandInputDTO extends UserInputDTO{
    name: string;
    nickname: string;
    email: string;
    password: string;
    role: string,
    status?: number,
    description: string;
};