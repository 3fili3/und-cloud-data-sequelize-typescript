// Archvio ENV para controlar las variables globales
// Contiene una literal con variables requeridas
// para iniciar la API de ClickO

// importamos libreria para tener acceso
// a las variables de entorno
import dotenv from "dotenv";
dotenv.config();

// obtenemos la variable de producción de API
const production = process.env.PRODUCTION === "true";

export const ENV = {
    
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
        database: process.env.DATABASE as string,
        dialect: process.env.DIALECT as string,
        host: process.env.HOST_DATABASE as string,
        port: parseInt(process.env.PORT_DATABASE as any) as number,
        username: process.env.USER_DATABASE as string,
        password: process.env.PASSWORD_DATABASE as string
    },

    // se obtiene la ruta donde estara la caperta de archivos
    path_file: process.env.PATH_FILES as string
}

