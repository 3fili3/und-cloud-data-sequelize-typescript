"use strict";
// Este archivo Files tiene como objetivo contratar
// Un servicio para controlar archivos enviados desde un fron
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const Env_1 = require("../config/Env");
const fs_1 = __importDefault(require("fs"));
class Files {
    static make(type, path) {
        try {
            switch (type) {
                case 'folder':
                    fs_1.default.mkdirSync(`${_a.destination}${path}`);
                    break;
                case 'file':
                    break;
                default:
                    throw ({ message: 'No existe la acción make de Files', status: 501 });
                    break;
            }
        }
        catch (error) {
            throw ({ message: 'Error al crear Directorio de Usuario', status: 501 });
        }
    }
}
exports.Files = Files;
_a = Files;
// Destino donde se va guardar facturas enviadas del vendedor
Files.destination = path_1.default.join(`${__dirname}/${Env_1.ENV.path_file}`);
Files.UploadFiles = (0, multer_1.default)({ dest: _a.destination, storage: multer_1.default.memoryStorage() });
