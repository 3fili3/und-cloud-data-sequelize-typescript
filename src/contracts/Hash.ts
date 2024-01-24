// Este archivo Hash tiene como objetivo contratar
// Un servicio para tener diferentes methods 
// en cuanto el manejo de contraseña encriptada

// importamos librerias que vayamos a usar

import { HashEncrypt } from "../config/Hash";
import bycript from "bcrypt";

// Delcaremos una clase Hash 
// que tendra los metedos de encriptación de contraseña

export class Hash {
    
    // private Salt = bycript.genSaltSync(HashEncrypt.brycript.salt)

    // Metodo para crear la contraseña encriptada
    // Evaluaremos que tipo de Hash tenemos por defecto
    public make(data: string): string {

        if(data === undefined || data === "") throw({ message: "La contraseña es requerida" })

        let new_password: string = ""
        switch (HashEncrypt.default) {
            case "brycript":
                new_password = bycript.hashSync(data, HashEncrypt.brycript.salt)
                break;
                
                default:
                    throw({ message: "Encrypting no declarada" })
                    break;
        }
                
        return new_password;
    }

    // Metodo para comparar la contraseña
    // Evaluaremos que tipo de Hash tenemos por defecto
    public compare(password: string, password_encryped: string): boolean {
        let compare = false;
        switch (HashEncrypt.default) {
            case "brycript":
                compare = bycript.compareSync(password, password_encryped)
            break;
        
            default:
            break;
        }

        return compare;
    }
}


// exportamos nuestro objeto
export const hash: Hash = new Hash()