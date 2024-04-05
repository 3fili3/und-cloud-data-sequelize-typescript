// Este archivo Files tiene como objetivo contratar
// Un servicio para controlar archivos enviados desde un fron

import multer from 'multer'
import path from 'path'
import { ENV } from '../config/Env'
import fs from 'fs'

export interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}

type TypeActionMake = 'folder' | 'file'

export class Files {
    // Destino donde se va guardar facturas enviadas del vendedor
    public static destination = path.join(`${__dirname}/buket/`)
    public static UploadFiles = multer({ dest: Files.destination, storage: multer.memoryStorage() })

    public make(type: TypeActionMake, path: string, file?: any): string {
        try {
            switch (type) {
                case 'folder':
                    fs.mkdirSync(`${Files.destination}${path}`, { recursive: true })
                break;
                case 'file': 
                    // if(!fs.existsSync(`${Files.destination}${path}`)) {
                    //     fs.mkdirSync(`${Files.destination}${path}`, { recursive: true })
                    // }
                    fs.writeFileSync(`${Files.destination}${path}`, file, { encoding: "utf-8" })
                break;
                default:
                    throw({ message: 'No existe la acción make de Files', status: 501 })
                break;
            }
            return path
        } catch (error) {
            throw({ message: error, status: 501 })
        }
        
    }

    public findFiles(path: string) {
        return fs.readdirSync(`${Files.destination}/${path}`)
    }

    public removedFolder(path: string) {
        if(fs.existsSync(`${Files.destination}/${path}`)) {
            fs.readdirSync(`${Files.destination}/${path}`, { recursive: true })
        }
    }

    public removedFile(path: string) {
        if(fs.existsSync(`${Files.destination}/${path}`)) {
            fs.unlinkSync(`${Files.destination}/${path}`)
        }
    }

    public static config(data: { destination: string }) {   
        Files.destination = data.destination
        Files.UploadFiles = multer({ storage: multer.memoryStorage(), dest: data.destination })
    }

}