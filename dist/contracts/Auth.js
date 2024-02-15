"use strict";
// El Archivo Auth tiene objetivo
// Contratar un Auth para ingresar a las funciones 
// de neustra API
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.Auth = void 0;
const Jwt_1 = require("./Jwt");
// import { Code } from "./Code"
// Creamos nuestra clase Auth
class Auth {
    constructor() { }
    // Declaremos un motodo LogIn
    // Este metodo verificara las credenciales del usuario
    // public async LogIn(email: string, password: string): Promise<string> {
    //     Auth.VerifyConfig()
    //     const modelUser = new PrismaClient() as any
    //     const user = await modelUser[Auth.PropiedNameModel as any].findFirst({
    //         where: {
    //             [Auth.PropiedUser]: email
    //         }
    //     })
    //     if(user === undefined) throw({ message: 'No existe el usuario', status: 200 })
    //     if(!hash.compare(password, user[Auth.PropiedPassword])) throw({ message: 'El usuario y contraseña, son incorrectos', valide: false, status: 200 })
    //     const token: { [key in string]: string } = {}
    //     Auth.PropiedsSave.forEach(propied => {
    //         token[propied] = user[propied]
    //     })  
    //     return jwt.make(token)
    // }
    // public async createdUser(data: any) {
    //     Auth.VerifyConfig()
    //     const modelUser = new PrismaClient() as any
    //     const user = await modelUser[Auth.PropiedNameModel as any].findFirst({
    //         where: {
    //             [Auth.PropiedUser]: data[Auth.PropiedUser]
    //         }
    //     })
    //     if(user != undefined) throw({ message: 'El usuario ya se encuentra registrado', status: 500 })
    //     return await modelUser[Auth.PropiedNameModel as any].create({ data })
    // }
    // public getInfoUser() {
    //     const token = jwt.verify(Auth.getToken())
    //     if(token === undefined) throw({ message: 'No tienes autorización', status: 401 })
    //     const user = token
    //     return user
    // }
    // public async authModule(model: String, user: Number, permiss: String) {
    //     const modelModuleAuth = new PrismaClient() as any
    //     await modelModuleAuth[Auth.NameModelModule].findMany()
    // }
    // private static getToken(): string {
    //     const auth = Auth.req.headers['authorization']
    //     if(auth != undefined) {
    //         const token = (auth.split(' '))[1]
    //         if(token != undefined) {
    //             return token;
    //         }
    //     }
    //     throw({ message: 'No tienes autorización', status: 401 })
    // }
    static AuthSocket(token) {
        const user = Jwt_1.jwt.verify(token);
        return user;
    }
    // public getAuth() {
    //     const user = jwt.verify(Auth.getToken());
    //     if(user === undefined) throw({ message: 'No tienes autorización' })
    //     return user;
    // }
    static Auth(req, res, next) {
        Auth.req = req;
        Auth.res = res;
        Auth.next = next;
        next();
    }
    static setAuthModules(model) {
        return __awaiter(this, void 0, void 0, function* () {
            Auth.NameModelModule = model;
        });
    }
    static Config(data) {
        Auth.PropiedNameModel = data.NameModel;
        Auth.PropiedPassword = data.PropiedPassword;
        Auth.PropiedUser = data.PropiedUser;
    }
    static VerifyConfig() {
        if (Auth.PropiedNameModel === '' || Auth.PropiedNameModel === null || Auth.PropiedNameModel === undefined)
            throw ({ message: 'Propiedad nombre de modelo debe ser definido', status: 500 });
        if (Auth.PropiedPassword === '' || Auth.PropiedPassword === null || Auth.PropiedPassword === undefined)
            throw ({ message: 'Propiedad contraseña debe ser definido', status: 500 });
        if (Auth.PropiedUser === '' || Auth.PropiedUser === null || Auth.PropiedUser === undefined)
            throw ({ message: 'Propiedad usuario debe ser definido', status: 500 });
    }
}
exports.Auth = Auth;
Auth.ModulesPermiss = [];
// Creamos nuestro objeto auth
exports.auth = new Auth();
