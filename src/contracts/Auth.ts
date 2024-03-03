// El Archivo Auth tiene objetivo
// Contratar un Auth para ingresar a las funciones 
// de neustra API

import { jwt } from "./Jwt";
import { NextFunction, Request, Response, response, request } from "express";
import { hash } from "./Hash";

// import { Code } from "./Code"
// Creamos nuestra clase Auth
export class Auth {

    private static req: Request;
    private static res: Response;
    private static next: NextFunction;
    private static PropiedUser: string;
    private static PropiedPassword: string;
    private static PropiedNameModel: string;
    private static PropiedsSave: string[]
    private static ModulesPermiss: any[] = []
    private static NameModelModule: string;
    private static Propieds: Object

    constructor() {}

    // Declaremos un motodo LogIn
    // Este metodo verificara las credenciales del usuario
    public async LogIn(functionGetData: () => Promise<Record<string, string>>): Promise<string> {
        const token: Record<string, string> = await functionGetData()
        return jwt.make(token)
    }

    // public async createdUser(data: any) {
    //     Auth.VerifyConfig()
    //     const modelUser = new PrismaClient() as any
    //     const user = await modelUser[Auth.PropiedNameModel as any].findFirst({
    //         where: {
    //             [Auth.PropiedUser]: data[Auth.PropiedUser]
    //         }
    //     })
    //     if(user != undefined) throw({ message: 'El usuario ya se encuentra registrado', status: 500 })

    //     return await modelUser[Auth.PropiedNameModel as any].create({ data })
    // }

    public getInfoUser<User>() {
        const token = jwt.verify<User>(Auth.getToken())
        if(token === undefined) throw({ message: 'No tienes autorización', status: 401 })
        const user = token
        return user as User
    }

    // public async authModule(model: String, user: Number, permiss: String) {
    //     const modelModuleAuth = new PrismaClient() as any
    //     await modelModuleAuth[Auth.NameModelModule].findMany()
    // }

    private static getToken(): string {
        const auth = Auth.req.headers['authorization']
        
        if(auth != undefined) {
            const token = (auth.split(' '))[1]
            if(token != undefined) {
                return token;
            }
        }
        throw({ message: 'No tienes autorización', status: 401 })
    }

    public static AuthSocket(token: string)  {
        const user = jwt.verify(token);
        return user;
    }
 
    public getAuth() {
        const user = jwt.verify(Auth.getToken());
        if(user === undefined) throw({ message: 'No tienes autorización' })
        return user;
    }

    public static Auth(req: Request, res: Response, next: NextFunction) {
        Auth.req = req
        Auth.res = res
        Auth.next = next
        next()
    }

    public static async setAuthModules(model: string) {
       Auth.NameModelModule = model
    }

    public static Config(data: { PropiedUser: string, PropiedPassword:string, NameModel: string, PropiedsSave?: string[] }) {
        Auth.PropiedNameModel = data.NameModel
        Auth.PropiedPassword = data.PropiedPassword
        Auth.PropiedUser = data.PropiedUser
        if(data.PropiedsSave != undefined ) {
            Auth.PropiedsSave = data.PropiedsSave
        } 
    }

    public static VerifyConfig() {
        if(Auth.PropiedNameModel === '' || Auth.PropiedNameModel === null || Auth.PropiedNameModel === undefined) throw({ message: 'Propiedad nombre de modelo debe ser definido', status: 500 })
        if(Auth.PropiedPassword === '' || Auth.PropiedPassword === null || Auth.PropiedPassword === undefined) throw({ message: 'Propiedad contraseña debe ser definido', status: 500 })
        if(Auth.PropiedUser === '' || Auth.PropiedUser === null || Auth.PropiedUser === undefined) throw({ message: 'Propiedad usuario debe ser definido', status: 500 })
    }
}

// Creamos nuestro objeto auth
export const auth: Auth = new Auth()