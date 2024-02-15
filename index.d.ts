declare module 'und-data-cloud-sequelize' {
    
    import express,{ Application } from 'express'
    import { Connection } from 'mongoose'
    import { Server } from 'socket.io'
    export { Socket } from 'socket.io'

    class WebSocket {
        constructor(data: {
            port: number;
            path: string;
            cors: string[];
        })
        get stocket(): Server
    }

    export class kernel {
        middlewares(otherMiddleware?: ((app: Application, expressParams: typeof express) => Application) | undefined): kernel;
        start(): void
        getApp(): Application;
        auth(data: { PropiedUser: string; PropiedPassword: string; NameModel: string; PropiedsSave?: string[] }): kernel
        controllers(controllers: Record<string, any>): kernel
        webSocket(data: { port: number; path: string; cors: string[] }): WebSocket
        services(serivice: Record<string, any>): kernel
        constructor(data: { port: number, domain: string, urlDatabase: string })
        configFile(destination: string): kernel
        get Socket(): WebSocket
    }

    interface validates {
        type: Function | Record<string, validates>, 
        max?: number, 
        min?: number,
        required?: boolean,
        empty?: boolean
    }
    
    type InputDefinitions = Record<string, validates>;
    
    type ExtractPropertyTypes<T extends InputDefinitions> = {
        [K in keyof T]: T[K]['type'] extends new (...args: any) => any
          ? InstanceType<T[K]['type']>
          : T[K]['type'] extends Record<string, any>
          ? { [P in keyof T[K]['type']]: InstanceType<T[K]['type'][P]> }
          : never;
    };

    interface IFile {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
    }

    export interface IContextController {
        auth: {
            LogIn<Data>(user: string, password: string, functionGetData?: (data: Data) => Promise<Record<string, string>> ): Promise<string>;
            createdUser(data: any): any
            getInfoUser<User>(): User
            getToken(): string
            getAuth(): { id: number }
        };
        input: <T extends InputDefinitions>(value: T) => ExtractPropertyTypes<T>;
        functions: { Money(quanty: number, rounded?: number): number; }; 
        logger: {
            log(logger: any)
            error(logger: any)
            warning(logger: any)
        };
        env: {
            host: string;
            port: number;
            domain: string;
            key_api: string;
            path_file: string
        },
        files: IFile[],
    }

    
    export interface IContextServices {
        model: PrismaClient;  code: {
            generated(numberFor?: number): string
        };
        email: {
            sendEmail(to: string, title: string, templete: string)
        }; functions: {
            Money(quanty: number, rounded?: number): number;
            generatedId(): string
        };
        logger: {
            log(logger: any)
            error(logger: any)
            warning(logger: any)
        };
        time: {
            calculeDate(days: number): Date;
            getRemainingDaysPerMonth(): number;
            getDate(sep?: string): number;
            getMilisecondsByDate(date: string | Date,): number;
            getCompletedDate(dateString: string | Date, time?: boolean): string | Date;
            getDaysInMount(date: string | Date): number;
            getInitAndLastDate(): { init: Date, end: Date };
        }; hash: {
            make(data: string):string;
            compare(password: string, password_encryped: string):boolean
        };
        file: { make(type: TypeActionMake, path: string, file?: any): string }
    }
    

    export const Delete: (path: string) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void
    export const Put: (path: string) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void
    export const Get: (path: string) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void
    export const Post: (path: string) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void
    export const File: (data: { path: string; method: string; }) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void 

}