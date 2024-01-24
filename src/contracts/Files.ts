// Este archivo Files tiene como objetivo contratar
// Un servicio para controlar archivos enviados desde un fron

import multer from 'multer'
import path from 'path'
import { ENV } from '../config/Env'
import fs from 'fs'

// const __dirname = path.resolve();

type TypeActionMake = 'folder' | 'file'

export class Files {
    // Destino donde se va guardar facturas enviadas del vendedor
    public static destination = path.join(`${__dirname}/${ENV.path_file}`)
    public static UploadFiles = multer({ dest: this.destination, storage: multer.memoryStorage() })

    public static make(type: TypeActionMake, path: string) {
        try {
            switch (type) {
                case 'folder':
                    fs.mkdirSync(`${Files.destination}${path}`)
                break;
                case 'file': 
                break;
                default:
                    throw({ message: 'No existe la acción make de Files', status: 501 })
                break;
            }
        } catch (error) {
            throw({ message: 'Error al crear Directorio de Usuario', status: 501 })
        }
    }
}