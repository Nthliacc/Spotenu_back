import { Users, UsersRole, UserInputDTO } from "./Users";

export class Band extends Users{
    constructor(
        id: string,
        name: string,
        nickname: string,
        email: string,
        password: string,
        role: UsersRole,
        private description: string,
        private status: number = 0, 
    ){ 
        super(id, name, nickname, email, password, role)
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
            band.description,
            band.status);
      };
};

export interface BandInputDTO extends UserInputDTO{
    name: string;
    nickname: string;
    email: string;
    password: string;
    role: string
    description: string;
};