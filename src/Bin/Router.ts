// Clase para controlar las rutas
// La clase tiene como objetivo hacer un Lib
// Haciendo facilmente el cambio de framewoork 
// si se requiere
import { Router } from "express";
import { ContextController, IContextController, ContextServices } from './ContexController'
 
// Clase para agregar los metodos
// de rutas
// agregando el dominio de API

enum Mehtods { get = "get", post = "post", put = "put", delete = "delete" }

const routerTemp = Router()

const contructorMethod = (target: Object, propertyKey: string, descriptor: PropertyDescriptor, method: string, path: string) => {
    let routes: { function: Function, method: string, path: string }[] = target.constructor.prototype.functions;
    if(routes === undefined) {
        routes = [ { function: target.constructor.prototype[propertyKey], method, path } ]
    } else {
        routes.push({ function: target.constructor.prototype[propertyKey], method, path })
    }
    return routes
}

export const Post = (path: string) => {
    const method = 'post';
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;  
        descriptor.value = function (contextController: IContextController) {
          return originalMethod.call(this, ContextController);
        };
        target.constructor.prototype['functions'] = contructorMethod(target, propertyKey, descriptor, method, path)
    };
}

export const Get = (path: string) => {
    const method = 'get';
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;  
        descriptor.value = function (contextController: IContextController) {
          return originalMethod.call(this, ContextController);
        };
        target.constructor.prototype['functions'] = contructorMethod(target, propertyKey, descriptor, method, path)
    };
}

export const Put = (path: string) => {
    const method = 'put';
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;  
        descriptor.value = function (contextController: IContextController) {
          return originalMethod.call(this, ContextController);
        };
        target.constructor.prototype['functions'] = contructorMethod(target, propertyKey, descriptor, method, path)
    };
}

export const Delete = (path: string) => {
    const method = 'delete';
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;  
        descriptor.value = function (contextController: IContextController) {
          return originalMethod.call(this, ContextController);
        };
        target.constructor.prototype['functions'] = contructorMethod(target, propertyKey, descriptor, method, path)
    };
}

// export const Controller = () => {

//     return (target: Function) => {
        
        
//         const controllers = [ ... target.prototype.functions]
        
//         controllers.forEach(methodController => {
//             routerTemp.route(`${ENV.domain}${path}${methodController["path"]}`)[methodController['method'] as Mehtods]
//             (async (req, res, next) => {
//                 try {
//                     res.json({ service: await methodController['function'](context) })
//                 } catch (error) {
//                     console.log(error)
//                     next(error)
//                 }
//             })
//         })
//     }

// }

export { routerTemp, ContextController, ContextServices }