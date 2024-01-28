"use strict";
// Archvio ENV para controlar las variables globales
// Contiene una literal con variables requeridas
// para iniciar la API de ClickO
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
// importamos libreria para tener acceso
// a las variables de entorno
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// obtenemos la variable de producción de API
const production = process.env.PRODUCTION === "true";
exports.ENV = {
    // se obtiene el dominio actual dela API
    // Sirve para redireccionar a rutas en producción en desarrollo
    // haremos un basico operador ternario para saber si la API esta en producción
    host: production ?
        `${process.env.HOST}${process.env.DOMAIN}` : `${process.env.HOST}:${process.env.PORT}${process.env.DOMAIN}`,
    // se obtiene el puerto donde se correra la API
    // podemos tener definido algun puerto u obtenerlo de las variables globales
    port: process.env.PORT,
    // se obtiene el dominio donde podremos encontrar
    // los enpoints de la API
    // esto es para agregar la versión y que API estaremos usando
    // por ejemplo https://dominio.com.mx/clicko/v1
    // obtendremos /click/v1/
    domain: process.env.DOMAIN,
    // Se obtiene key_api 
    // Esta tiene como objetivo generar los tokens
    // con una llave de la API
    key_api: process.env.KEY_API,
    // Se obtiene la ruta de la conexión
    // con la base de datos
    // en las variables globales
    database: {
        database: process.env.DATABASE,
        dialect: process.env.DIALECT,
        host: process.env.HOST_DATABASE,
        port: parseInt(process.env.PORT_DATABASE),
        username: process.env.USER_DATABASE,
        password: process.env.PASSWORD_DATABASE
    },
    // se obtiene la ruta donde estara la caperta de archivos
    path_file: process.env.PATH_FILES
};
