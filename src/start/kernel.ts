// El archivo Kernel contiene la configuración
// para la inicialización de la API

import cors from "cors"
import express, { Application, Router } from "express";
import { ENV } from "../config/Env";
import { handles } from "../app/Exceptions/Handles";
import { Input } from "../contracts/Input";
import { ContextController, ContextServices, getServices, setServices } from '../Bin/ContexController'
import { Auth } from "../contracts/Auth";
import { Database } from "../contracts/Database";
import { People, User } from "../contracts/Models";
import sequelize from "sequelize";

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

    public constructor(data: { port: number, domain: string }) {
        this.Routers = Router()
        this.ErrorConsole = false
        this.Port = data.port
        this.Domain = data.domain
    }
    
    // El metodo middleware de tipo kernel
    // tiene la configuración de los headers
    // que tendrá nuestra API de express
    public middlewares(): kernel {

        this.App.use(cors())
        // this.App.use(Auth.Auth)
        this.App.use(Input.setContext)
        this.App.use(express.json());
        this.App.use(express.urlencoded({ extended: false }))
        this.App.use(this.Routers)
        this.App.use(handles.error)

        return this;
    }

    // public socket(identity: string): kernel {
    //     initializeSocket(identity)
    //     return this;
    // }

    public services(services: Record<string, ObjectConstructor>): kernel {

        for (const key in services) {

            setServices(key, new services[key](ContextServices))
            console.log(`>> Intialize Service ${key} <<`)

        }

        ContextController['services'] = { ... getServices() }

        return this
    }

    public controllers(controllers: Record<string, ObjectConstructor> ) {

        for (const key in controllers) {

            const controller = controllers[key]
            const objectTempController = new controller()
            const controllersTemp = [ ... objectTempController.constructor.prototype.functions ]
            
            controllersTemp.forEach(methodController => {
                this.Routers.route((`${this.Domain}${key}${methodController["path"]}`))[methodController['method'] as Mehtods]
                (async (req, res, next) => {
                    try {
                        res.json({ service: await methodController['function'](ContextController) })
                    } catch (error) {
                        if(this.ErrorConsole) {
                            console.log(error)
                        }
                        next(error)
                    }
                })
            })

            console.log(`>> Intialize Controller ${key} <<`)
        }

        return this
    }

    public auth(data: { PropiedUser: string, PropiedPassword:string, NameModel: string }) {
        // Auth.Config(data)
        return this
    }

    public webSocket() {

    }

    // El metodo start de tipo void
    // Contiene la configuración de la inicialización 
    // de nuestra API
    public start() {


        const database = new Database({
           dialect: 'sqlite', storage: __dirname+'/../database/data.data', models: [People, User]
        })

        // database.transaction(async () => {
        //     const people = await People.create({ name: 'Filiberto Pérez López' })
        //     if(people.pkPeople != undefined) {
        //         const user = await User.create({ fkPeople: people.pkPeople, password: 'MyPassword', username: 'Operador 1',  })
        //         console.log(user)
        //     }
        // })

        // People.findOne({ where: { pkPeople: 1 } ,include: { model: User } }).then(result => {
        //     console.log(result?.User)
        // })
  
        this.App.listen(this.Port, () => {
            console.log('API start in port: ' + this.Port);
        })
    }

    public Logger(log: boolean): kernel {
        this.ErrorConsole = log
        return this
    }

    public getApp(): Application {
        return this.App;
    }

}

// // exportamos el objeto kernel
// // para ser utilizado de forma global
// export const Kernel: kernel = new kernel();