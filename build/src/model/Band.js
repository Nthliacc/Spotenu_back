"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Band = void 0;
const Users_1 = require("./Users");
class Band extends Users_1.Users {
    constructor(id, name, nickname, email, password, role, status = 0, description) {
        super(id, name, nickname, email, password, role, status);
        this.description = description;
        this.getId = () => this.id;
        this.getName = () => this.name;
        this.getNickname = () => this.nickname;
        this.getEmail = () => this.email;
        this.getPassword = () => this.password;
        this.getRole = () => this.role;
        this.getDescription = () => this.description;
        this.getStatus = () => this.status;
        this.setId = (id) => this.id = id;
        this.setName = (name) => this.name = name;
        this.setNickame = (nickname) => this.nickname = nickname;
        this.setEmail = (email) => this.email = email;
        this.setPassword = (password) => this.password = password;
        this.setRole = (role) => this.role = role;
        this.setDescription = (description) => this.description = description;
        this.setStatus = (status) => this.status = status;
    }
    ;
    static toBandModel(band) {
        return new Band(band.id, band.name, band.nickname, band.email, band.password, band.role, band.status, band.description);
    }
    ;
}
exports.Band = Band;
;
;
