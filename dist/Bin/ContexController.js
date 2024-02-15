"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = exports.setServices = exports.Services = exports.ContextServices = exports.ContextController = void 0;
const Auth_1 = require("../contracts/Auth");
const Input_1 = require("../contracts/Input");
const Code_1 = require("../contracts/Code");
const Email_1 = require("../contracts/Email");
const Functions_1 = require("../contracts/Functions");
const Logger_1 = require("../contracts/Logger");
const Env_1 = require("../config/Env");
const Time_1 = require("../contracts/Time");
const Hash_1 = require("../contracts/Hash");
exports.ContextController = {
    auth: new Auth_1.Auth(), functions: new Functions_1.Functions(),
    logger: new Logger_1.Logger(), env: Env_1.ENV, input: Input_1.input,
    services: {}, files: []
};
exports.ContextServices = {
    code: new Code_1.Code(), functions: new Functions_1.Functions(), logger: new Logger_1.Logger(),
    time: new Time_1.Time(), hash: Hash_1.hash, email: new Email_1.Email(),
};
exports.Services = {};
const setServices = (key, object) => {
    exports.Services[key] = object;
};
exports.setServices = setServices;
const getServices = () => {
    return exports.Services;
};
exports.getServices = getServices;
