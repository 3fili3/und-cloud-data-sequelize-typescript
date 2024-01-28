"use strict";
// Archivo con configuración para encriptar contraseña
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashEncrypt = void 0;
// exportamos la literal con las previas configuraciones
exports.HashEncrypt = {
    // definimos por defecto que modulo se usara
    default: "brycript",
    // definimos los modulos que tenemos disponibles
    // ingresamos las propiedades necesarias para ingresarla
    brycript: {
        salt: 10
    }
};
