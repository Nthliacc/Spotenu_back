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
        private status: boolean = false, 
    ){ 
        super(id, name, nickname, email, password, role)
    };

    getId = () => this.id;
    getName = () => this.name;
    getNickname = () => this.nickname;
    getEmail = () => this.email;
    getPassword = () => this.password;
    getDescription = () => this.description;
    getStatus = () => this.status;
    getRole = () => this.role;

    setId = (id: string) => this.id = id;
    setName = (name: string) => this.name = name;
    setNickame = (nickname: string) => this.nickname = nickname;
    setEmail = (email: string) => this.email = email;
    setPassword = (password: string) => this.password = password;
    setDescription = (description: string) => this.description = description;
    setStatus = (status: boolean) => this.status = status;
    setRole = (role: UsersRole) => this.role = role;

    static toBandModel(band: any): Band{
        return new Band(
            band.id, 
            band.name, 
            band.nickname, 
            band.email, 
            band.password,
            band.description,
            band.status,
            band.role);
      };
};

export interface BandInputDTO extends UserInputDTO{
    name: string;
    nickname: string;
    email: string;
    password: string;
    description: string;
    role: string
};