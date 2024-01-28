"use strict";
// El archivo Kernel contiene la configuración
// para la inicialización de la API
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kernel = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const Handles_1 = require("../app/Exceptions/Handles");
const Input_1 = require("../contracts/Input");
const ContexController_1 = require("../Bin/ContexController");
const Database_1 = require("../contracts/Database");
const Models_1 = require("../contracts/Models");
// La clase kernel tiene como objetivo 
// contener toda la configuración de la API
// Se usa el patron de diseño Builder
var Mehtods;
(function (Mehtods) {
    Mehtods["get"] = "get";
    Mehtods["post"] = "post";
    Mehtods["put"] = "put";
    Mehtods["delete"] = "delete";
})(Mehtods || (Mehtods = {}));
class kernel {
    constructor(data) {
        // tenemos un atributo de tipo
        // Appplication de express
        this.App = (0, express_1.default)();
        this.Routers = (0, express_1.Router)();
        this.ErrorConsole = false;
        this.Port = data.port;
        this.Domain = data.domain;
    }
    // El metodo middleware de tipo kernel
    // tiene la configuración de los headers
    // que tendrá nuestra API de express
    middlewares() {
        this.App.use((0, cors_1.default)());
        // this.App.use(Auth.Auth)
        this.App.use(Input_1.Input.setContext);
        this.App.use(express_1.default.json());
        this.App.use(express_1.default.urlencoded({ extended: false }));
        this.App.use(this.Routers);
        this.App.use(Handles_1.handles.error);
        return this;
    }
    // public socket(identity: string): kernel {
    //     initializeSocket(identity)
    //     return this;
    // }
    services(services) {
        for (const key in services) {
            (0, ContexController_1.setServices)(key, new services[key](ContexController_1.ContextServices));
            console.log(`>> Intialize Service ${key} <<`);
        }
        ContexController_1.ContextController['services'] = Object.assign({}, (0, ContexController_1.getServices)());
        return this;
    }
    controllers(controllers) {
        for (const key in controllers) {
            const controller = controllers[key];
            const objectTempController = new controller();
            const controllersTemp = [...objectTempController.constructor.prototype.functions];
            controllersTemp.forEach(methodController => {
                this.Routers.route((`${this.Domain}${key}${methodController["path"]}`))[methodController['method']]((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        res.json({ service: yield methodController['function'](ContexController_1.ContextController) });
                    }
                    catch (error) {
                        if (this.ErrorConsole) {
                            console.log(error);
                        }
                        next(error);
                    }
                }));
            });
            console.log(`>> Intialize Controller ${key} <<`);
        }
        return this;
    }
    auth(data) {
        // Auth.Config(data)
        return this;
    }
    webSocket() {
    }
    // El metodo start de tipo void
    // Contiene la configuración de la inicialización 
    // de nuestra API
    start() {
        const database = new Database_1.Database({
            dialect: 'sqlite', storage: __dirname + '/../database/data.data', models: [Models_1.People, Models_1.User]
        });
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
        });
    }
    Logger(log) {
        this.ErrorConsole = log;
        return this;
    }
    getApp() {
        return this.App;
    }
}
exports.kernel = kernel;
// // exportamos el objeto kernel
// // para ser utilizado de forma global
// export const Kernel: kernel = new kernel();
