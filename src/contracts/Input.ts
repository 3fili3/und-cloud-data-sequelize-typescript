import { NextFunction, Request, Response } from "express";

export class Input {

    public static req: Request;
    public static res: Response;
    public static next: NextFunction

    public static setContext(req: Request, res: Response, next: NextFunction) {
        Input.req = req;
        Input.res = res;
        Input.next = next;
        Input.next()
    }

}

interface validates {
    type: Function | Record<string, validates>, 
    max?: number, 
    min?: number,
    required?: boolean,
    empty?: boolean
}

type InputDefinitions = Record<string, validates>

type ExtractPropertyTypes<T extends InputDefinitions> = {
    [K in keyof T]: T[K]['type'] extends new (...args: any) => any
      ? InstanceType<T[K]['type']>
      : T[K]['type'] extends Record<string, any>
      ? { [P in keyof T[K]['type']]: InstanceType<T[K]['type'][P]> }
      : never;
};


enum method { body = 'body', params = 'params' }

export const input = <T extends InputDefinitions>(value: T) => {

    let result: ExtractPropertyTypes<typeof value> = {} as ExtractPropertyTypes<typeof value>
    let method = Input.req.method.toUpperCase() === 'GET' ? 'params':'body'
    const inputApi = Input.req as any
    const messageError: { error: string, key: string }[] = []

    

    if(inputApi[method] === undefined) {
        for (const key in value) {
            messageError.push({ key, error: 'Input Required' })  
        }
        throw({ message: messageError, status: 403 })
    }

    if(typeof value != 'object') throw({ message: 'input value not object', status: 500 })

    for (const key in value) {
        let valueTemp = {} as any
        
        const objectError: { error: string, key: string } = { error: '', key: '' }
        if(value[key].hasOwnProperty('required')) {
            if(value[key].required && !inputApi[method].hasOwnProperty(key) )  {
                objectError.error = 'Input Required'
                objectError.key = key
            }
        } 

        if(inputApi[method].hasOwnProperty(key)) {

            valueTemp = inputApi[method][key]
            result[key] = valueTemp

            let inputStringTemp: string = valueTemp as string
            if(typeof valueTemp != 'string' && typeof valueTemp != 'object') {
                inputStringTemp = valueTemp.toString()
            }

            if(value[key].hasOwnProperty('min')) {
                const numberMin = value[key]?.min as number
                if(inputStringTemp.length < numberMin) {
                    objectError.error = `\n min characters ${numberMin}` 
                    objectError.key = key
                }
            }
            if(value[key].hasOwnProperty('max')) {
                const numberMax = value[key]?.max as number
                if(inputStringTemp.length > numberMax) {
                    objectError.error = `\n Max characters ${numberMax}` 
                    objectError.key = key
                }
            }

            if(value[key].hasOwnProperty('empty')) {
                if(!value[key].empty) {
                    if(valueTemp === '') {
                        objectError.error = `\nInput not empty` 
                        objectError.key = key
                    }
                }
            }

           switch (value[key].type) {
            case String:
                if(typeof valueTemp != 'string') {
                    objectError.error = `\nInput data type must be String` 
                    objectError.key = key
                }
            break;
            case Number:
                if(typeof valueTemp != 'number') {
                    objectError.error = `\nInput data type must be Number` 
                    objectError.key = key
                }
            break
            case Array:
                if(typeof valueTemp != 'object') {
                    objectError.error = `\nInput data type must be Array` 
                    objectError.key = key
                }
            break;
            case Object:
                if(typeof valueTemp != 'object') {
                    objectError.error = `\nInput data type must be Object` 
                    objectError.key = key
                }
            break;
            default:
            break;
           }

        }

        if(objectError.key != '') {
            messageError.push(objectError)
        }

    }

    if(messageError.length >= 1) throw({ message: messageError, status: 401 })
    return result
}