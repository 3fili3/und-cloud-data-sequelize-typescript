"use strict";
// Este archivo Files tiene como objetivo contratar
// Un servicio para controlar archivos enviados desde un fron
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Files {
    make(type, path, file) {
        try {
            switch (type) {
                case 'folder':
                    fs_1.default.mkdirSync(`${Files.destination}${path}`, { recursive: true });
                    break;
                case 'file':
                    fs_1.default.writeFileSync(`${Files.destination}${path}`, file);
                    break;
                default:
                    throw ({ message: 'No existe la acción make de Files', status: 501 });
                    break;
            }
            return path;
        }
        catch (error) {
            throw ({ message: 'Error al crear Directorio de Usuario', status: 501 });
        }
    }
    static config(data) {
        Files.destination = data.destination;
        Files.UploadFiles = (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), dest: data.destination });
    }
}
exports.Files = Files;
// Destino donde se va guardar facturas enviadas del vendedor
Files.destination = path_1.default.join(`${__dirname}/buket`);
Files.UploadFiles = (0, multer_1.default)({ dest: Files.destination, storage: multer_1.default.memoryStorage() });
