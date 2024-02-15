import { Auth } from '../contracts/Auth'
import { input } from '../contracts/Input'
import { Code } from '../contracts/Code'
import { Email } from '../contracts/Email'
import { Functions } from '../contracts/Functions'
import { Logger } from '../contracts/Logger'
import { ENV } from '../config/Env'
import { Time } from '../contracts/Time'
import { hash } from '../contracts/Hash'
import { IFile } from '../contracts/Files'

export interface IContextServices {
    code: Code; email: Email; functions: Functions;
    logger: Logger;
    time: Time; hash: typeof hash;
}

export interface IContextController {
    auth: Auth, input: typeof input;
    functions: Functions; logger: Logger;
    env: typeof ENV; services: Record<string, Object>,
    files: IFile[]
}

export let ContextController: IContextController = {
    auth: new Auth(), functions: new Functions(),
    logger: new Logger(), env: ENV, input: input,
    services: {}, files: []
}

export const ContextServices: IContextServices = { 
    code: new Code(), functions: new Functions(), logger: new Logger(),
    time: new Time(), hash: hash, email: new Email(), 
}

export let Services: Record<string, Object> = {}

export const setServices = (key: string, object: Object) =>  {
    Services[key] = object
}

export const getServices = () => {
    return Services
}