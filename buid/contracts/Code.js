"use strict";
// Este archivo Hash tiene como objetivo contratar
// Un servicio para tener diferentes methods 
// en cuanto el manejo de generador de Códigos
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
class Code {
    generated(numberFor) {
        const data = "abcdefghijklmnñopqrsxyz123456789";
        let numberMax = 4;
        if (numberFor != undefined) {
            numberMax = numberFor;
        }
        let code = "";
        for (let index = 0; index < numberMax; index++) {
            code = code + "" + data[Math.floor(Math.random() * (data.length - 1))];
        }
        return code;
    }
}
exports.Code = Code;
