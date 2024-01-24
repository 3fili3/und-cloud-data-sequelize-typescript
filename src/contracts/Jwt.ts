// En el archivo de Jwt
// Tiene como objetivo, hacer un contrato con jsonwebtoken
// Para generar los Token de la API

import { Token } from "../config/Token";
import module_jwt from "jsonwebtoken";

// Tenemos una clase para controlar nuestros metodos 
// para las acciones que vamos a necesitar nuestro token
class Jwt {
    
    // LLave secreta que se generara nuestro
    // Token
    private key_secret: string;
    
    constructor(){
        this.key_secret = Token.key;
    }
    
    // Metodo para hacer nuestro token
    // Tendra como parametro
    // El dato que vamos a toquenizar
    public make(payload: string | object | Buffer): string {
        return module_jwt.sign(payload, this.key_secret);
    }

    // Metodo para verifycar la existencia de nuestro token
    public verify<infoReturnToken>(token: string): infoReturnToken {
        if(token.length < 248 && token.length > 251) throw({ message: 'No tienes autorización', status: 401 })
        return module_jwt.verify(token, this.key_secret) as infoReturnToken; 
    }

}

// Instanciamos nuestra clase Jwt
export const jwt: Jwt = new Jwt();