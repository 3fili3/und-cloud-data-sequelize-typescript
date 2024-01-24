// Archivo con configuración para encriptar contraseña

// exportamos la literal con las previas configuraciones

export const HashEncrypt = {
    // definimos por defecto que modulo se usara
    default: "brycript",
    
    // definimos los modulos que tenemos disponibles
    // ingresamos las propiedades necesarias para ingresarla
    brycript: {
        salt: 10
    }
}