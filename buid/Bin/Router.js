"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextServices = exports.ContextController = exports.routerTemp = exports.Delete = exports.Put = exports.Get = exports.Post = void 0;
// Clase para controlar las rutas
// La clase tiene como objetivo hacer un Lib
// Haciendo facilmente el cambio de framewoork 
// si se requiere
const express_1 = require("express");
const ContexController_1 = require("./ContexController");
Object.defineProperty(exports, "ContextController", { enumerable: true, get: function () { return ContexController_1.ContextController; } });
Object.defineProperty(exports, "ContextServices", { enumerable: true, get: function () { return ContexController_1.ContextServices; } });
// Clase para agregar los metodos
// de rutas
// agregando el dominio de API
var Mehtods;
(function (Mehtods) {
    Mehtods["get"] = "get";
    Mehtods["post"] = "post";
    Mehtods["put"] = "put";
    Mehtods["delete"] = "delete";
})(Mehtods || (Mehtods = {}));
const routerTemp = (0, express_1.Router)();
exports.routerTemp = routerTemp;
const contructorMethod = (target, propertyKey, descriptor, method, path) => {
    let routes = target.constructor.prototype.functions;
    if (routes === undefined) {
        routes = [{ function: target.constructor.prototype[propertyKey], method, path }];
    }
    else {
        routes.push({ function: target.constructor.prototype[propertyKey], method, path });
    }
    return routes;
};
const Post = (path) => {
    const method = 'post';
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function (contextController) {
            return originalMethod.call(this, ContexController_1.ContextController);
        };
        target.constructor.prototype['functions'] = contructorMethod(target, propertyKey, descriptor, method, path);
    };
};
exports.Post = Post;
const Get = (path) => {
    const method = 'get';
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function (contextController) {
            return originalMethod.call(this, ContexController_1.ContextController);
        };
        target.constructor.prototype['functions'] = contructorMethod(target, propertyKey, descriptor, method, path);
    };
};
exports.Get = Get;
const Put = (path) => {
    const method = 'put';
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function (contextController) {
            return originalMethod.call(this, ContexController_1.ContextController);
        };
        target.constructor.prototype['functions'] = contructorMethod(target, propertyKey, descriptor, method, path);
    };
};
exports.Put = Put;
const Delete = (path) => {
    const method = 'delete';
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function (contextController) {
            return originalMethod.call(this, ContexController_1.ContextController);
        };
        target.constructor.prototype['functions'] = contructorMethod(target, propertyKey, descriptor, method, path);
    };
};
exports.Delete = Delete;
