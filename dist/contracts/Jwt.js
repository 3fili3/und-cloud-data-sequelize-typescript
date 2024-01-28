"use strict";
// En el archivo de Jwt
// Tiene como objetivo, hacer un contrato con jsonwebtoken
// Para generar los Token de la API
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
const Token_1 = require("../config/Token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Tenemos una clase para controlar nuestros metodos 
// para las acciones que vamos a necesitar nuestro token
class Jwt {
    constructor() {
        this.key_secret = Token_1.Token.key;
    }
    // Metodo para hacer nuestro token
    // Tendra como parametro
    // El dato que vamos a toquenizar
    make(payload) {
        return jsonwebtoken_1.default.sign(payload, this.key_secret);
    }
    // Metodo para verifycar la existencia de nuestro token
    verify(token) {
        if (token.length < 248 && token.length > 251)
            throw ({ message: 'No tienes autorización', status: 401 });
        return jsonwebtoken_1.default.verify(token, this.key_secret);
    }
}
// Instanciamos nuestra clase Jwt
exports.jwt = new Jwt();
