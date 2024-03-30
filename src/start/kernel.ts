// El archivo Kernel contiene la configuración
// para la inicialización de la API

import cors from "cors"
import express, { Application, Router } from "express";
import { ENV } from "../config/Env";
import { handles } from "../app/Exceptions/Handles";
import { Input } from "../contracts/Input";
import { ContextController, ContextServices, getServices, setServices, getModels, setModels } from '../Bin/ContexController'
import { Auth } from "../contracts/Auth";
import { Database } from "../contracts/Database";
import { People, User } from "../contracts/Models";
import sequelize from "sequelize";
import { WebSocket } from "./socket";
import { Files, IFile } from "../contracts/Files";
import path from "path";

// La clase kernel tiene como objetivo 
// contener toda la configuración de la API
// Se usa el patron de diseño Builder


enum Mehtods { get = "get", post = "post", put = "put", delete = "delete" }

export class kernel {

    // tenemos un atributo de tipo
    // Appplication de express
    private App: Application = express();
    private Routers: Router;
    private ErrorConsole: boolean;
    private Port: number;
    private Domain: string;
    private socket: WebSocket = null as any

    public constructor(data: { port: number, domain: string }) {
        this.Routers = Router()
        this.ErrorConsole = false
        this.Port = data.port
        this.Domain = data.domain
    }

    // El metodo middleware de tipo kernel
    // tiene la configuración de los headers
    // que tendrá nuestra API de express
    public middlewares(otherMiddleware?: (app: Application, expressParams: typeof express) => Application): kernel {

        this.App.use(cors())
        this.App.use(Auth.Auth)
        this.App.use(Input.setContext)
        this.App.use(express.json());
        this.App.use(express.urlencoded({ extended: false }))
        if(otherMiddleware != undefined) {
            this.App = otherMiddleware(this.getApp, express)
        }
        this.App.use(this.Routers)
        this.App.use(handles.error)

        return this;
    }

    get getApp() {
        return this.App
    }

    // public socket(identity: string): kernel {
    //     initializeSocket(identity)
    //     return this;
    // }

    public models(models: Record<string, any>): kernel {

        for (const key in models) {
            setModels(key, models[key])
            console.log(`>> Intialize Model ${key} <<`)
        }

        ContextServices['model'] = getModels()

        return this
    }

    public services(services: Record<string, ObjectConstructor>): kernel {

        for (const key in services) {

            setServices(key, new services[key](ContextServices))
            console.log(`>> Intialize Service ${key} <<`)

        }

        ContextController['services'] = { ... getServices() }

        return this
    }

    public configFile(destination: string): kernel {
        Files.config({ destination })
        return this
    }

    public controllers(controllers: Record<string, ObjectConstructor> ) {

        for (const key in controllers) {

            const controller = controllers[key]
            const objectTempController = new controller()
            const controllersTemp = [ ... objectTempController.constructor.prototype.functions ]
            controllersTemp.forEach(methodController => {
                const fullPath = `${this.Domain}${key}${methodController["path"]}`
                if(methodController.file) {
                    this.Routers.route((fullPath))[methodController['method'] as Mehtods]
                        (Files.UploadFiles.array('files'), async (req, res, next) => {
                            try {
                                ContextController['files'] = req.files as IFile[]
                                const response = await methodController['function'](ContextController)
                                if(response.hasOwnProperty('file')) {
                                    const pathRealtive = path.resolve(`${Files.destination}${response.file}`)
                                    return res.sendFile(pathRealtive)
                                }
                                return res.json({ service: response })
                            } catch (error) {
                                if(this.ErrorConsole) {
                                    console.log(error)
                                }
                                next(error)
                            }
                        })
                } else {
                    this.Routers.route((fullPath))[methodController['method'] as Mehtods]
                    (async (req, res, next) => {
                        try {
                            const response = await methodController['function'](ContextController)
                            if(response.hasOwnProperty('file')) {
                                const pathRealtive = path.resolve(`${Files.destination}${response.file}`)
                                return res.sendFile(pathRealtive)
                            }
                            return res.json({ service: response })
                        } catch (error) {
                            if(this.ErrorConsole) {
                                console.log(error)
                            }
                            next(error)
                        }
                    })
                }
            })

            console.log(`>> Intialize Controller ${key} <<`)
        }

        return this
    }

    public auth(data: { PropiedUser: string, PropiedPassword:string, NameModel: string, PropiedsSave: string[] }) {
        Auth.Config(data)
        return this
    }

    public webSocket(data: { port: number, path: string, cors: string[] }): WebSocket {
        return this.socket = new WebSocket(data)
    }


    // El metodo start de tipo void
    // Contiene la configuración de la inicialización 
    // de nuestra API
    public start(functionInitialize?: () => void) {

        this.App.listen(this.Port, () => {
            console.log('API start in port: ' + this.Port);
            if(functionInitialize != undefined) {
                functionInitialize()
            }
        })
    }

    public Logger(log: boolean): kernel {
        this.ErrorConsole = log
        return this
    }

}

// // exportamos el objeto kernel
// // para ser utilizado de forma global
// export const Kernel: kernel = new kernel();