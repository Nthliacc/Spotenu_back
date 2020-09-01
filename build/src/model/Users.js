"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRole = exports.Users = void 0;
class Users {
    constructor(id, name, nickname, email, password, role, status) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
        this.getId = () => this.id;
        this.getName = () => this.name;
        this.getEmail = () => this.email;
        this.getNickname = () => this.nickname;
        this.getPassword = () => this.password;
        this.getRole = () => this.role;
        this.getStatus = () => this.status;
        this.setId = (id) => this.id = id;
        this.setName = (name) => this.name = name;
        this.setNickame = (nickname) => this.nickname = nickname;
        this.setEmail = (email) => this.email = email;
        this.setPassword = (password) => this.password = password;
        this.setRole = (role) => this.role = role;
    }
    static stringToUserRole(input) {
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
    static toUserModel(user) {
        return new Users(user.id, user.name, user.nickname, user.email, user.password, Users.stringToUserRole(user.role), user.status);
    }
}
exports.Users = Users;
var UsersRole;
(function (UsersRole) {
    UsersRole["BAND"] = "BAND";
    UsersRole["PREMIUM_USER"] = "PREMIUM_USER";
    UsersRole["FREE_USER"] = "FREE_USER";
    UsersRole["ADMIN"] = "ADMIN";
})(UsersRole = exports.UsersRole || (exports.UsersRole = {}));
