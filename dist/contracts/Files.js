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
                    // if(!fs.existsSync(`${Files.destination}${path}`)) {
                    //     fs.mkdirSync(`${Files.destination}${path}`, { recursive: true })
                    // }
                    fs_1.default.writeFileSync(`${Files.destination}${path}`, file, { encoding: "utf-8" });
                    break;
                default:
                    throw ({ message: 'No existe la acción make de Files', status: 501 });
                    break;
            }
            return path;
        }
        catch (error) {
            throw ({ message: error, status: 501 });
        }
    }
    findFiles(path) {
        return fs_1.default.readdirSync(`${Files.destination}/${path}`);
    }
    removedFolder(path) {
        if (fs_1.default.existsSync(`${Files.destination}/${path}`)) {
            fs_1.default.readdirSync(`${Files.destination}/${path}`, { recursive: true });
        }
    }
    removedFile(path) {
        if (fs_1.default.existsSync(`${Files.destination}/${path}`)) {
            fs_1.default.unlinkSync(`${Files.destination}/${path}`);
        }
    }
    static config(data) {
        Files.destination = data.destination;
        Files.UploadFiles = (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), dest: data.destination });
    }
}
exports.Files = Files;
// Destino donde se va guardar facturas enviadas del vendedor
Files.destination = path_1.default.join(`${__dirname}/buket/`);
Files.UploadFiles = (0, multer_1.default)({ dest: Files.destination, storage: multer_1.default.memoryStorage() });
