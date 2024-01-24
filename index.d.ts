declare module 'und-data-cloud-mysql' {
    
    import { Application } from 'express'
    import { PrismaClient } from '@prisma/client'

    export class kernel {
        middlewares(): kernel;
        start(): void
        getApp(): Application;
        auth(data: { PropiedUser: string; PropiedPassword: string; NameModel: string; }): kernel
        controllers(controllers: Record<string, any>): kernel
        socket(identity: string): kernel
        services(serivice: Record<string, any>): kernel
        constructor(data: { port: number, domain: string })
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

    export interface IContextController {
        auth: {
            LogIn(user: string, password: string): Promise<string>;
            createdUser(data: any): any
            getInfoUser(): { id: number }
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
            getMilisecondsByDate(date: string | Date): number;
            getCompletedDate(dateString: string | Date): number;
            getDaysInMount(date: string | Date): number;
            getInitAndLastDate(): { init: Date, end: Date };
        }; hash: {
            make(data: string):string;
            compare(password: string, password_encryped: string):boolean
        };
    }cls
    

    export const Delete: (path: string) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void
    export const Put: (path: string) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void
    export const Get: (path: string) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void
    export const Post: (path: string) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void

}