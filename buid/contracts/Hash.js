"use strict";
// Este archivo Hash tiene como objetivo contratar
// Un servicio para tener diferentes methods 
// en cuanto el manejo de contraseña encriptada
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.Hash = void 0;
// importamos librerias que vayamos a usar
const Hash_1 = require("../config/Hash");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Delcaremos una clase Hash 
// que tendra los metedos de encriptación de contraseña
class Hash {
    // private Salt = bycript.genSaltSync(HashEncrypt.brycript.salt)
    // Metodo para crear la contraseña encriptada
    // Evaluaremos que tipo de Hash tenemos por defecto
    make(data) {
        if (data === undefined || data === "")
            throw ({ message: "La contraseña es requerida" });
        let new_password = "";
        switch (Hash_1.HashEncrypt.default) {
            case "brycript":
                new_password = bcrypt_1.default.hashSync(data, Hash_1.HashEncrypt.brycript.salt);
                break;
            default:
                throw ({ message: "Encrypting no declarada" });
                break;
        }
        return new_password;
    }
    // Metodo para comparar la contraseña
    // Evaluaremos que tipo de Hash tenemos por defecto
    compare(password, password_encryped) {
        let compare = false;
        switch (Hash_1.HashEncrypt.default) {
            case "brycript":
                compare = bcrypt_1.default.compareSync(password, password_encryped);
                break;
            default:
                break;
        }
        return compare;
    }
}
exports.Hash = Hash;
// exportamos nuestro objeto
exports.hash = new Hash();
