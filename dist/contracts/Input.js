"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = exports.Input = void 0;
class Input {
    static setContext(req, res, next) {
        Input.req = req;
        Input.res = res;
        Input.next = next;
        Input.next();
    }
}
exports.Input = Input;
var method;
(function (method) {
    method["body"] = "body";
    method["params"] = "params";
})(method || (method = {}));
const input = (value) => {
    var _a, _b;
    let result = {};
    let method = Input.req.method.toUpperCase() === 'GET' ? 'params' : 'body';
    const inputApi = Input.req;
    const messageError = [];
    if (inputApi[method] === undefined) {
        for (const key in value) {
            messageError.push({ key, error: 'Input Required' });
        }
        throw ({ message: messageError, status: 403 });
    }
    if (typeof value != 'object')
        throw ({ message: 'input value not object', status: 500 });
    for (const key in value) {
        let valueTemp = {};
        const objectError = { error: '', key: '' };
        if (value[key].hasOwnProperty('required')) {
            if (value[key].required && !inputApi[method].hasOwnProperty(key)) {
                objectError.error = 'Input Required';
                objectError.key = key;
            }
        }
        if (inputApi[method].hasOwnProperty(key)) {
            valueTemp = inputApi[method][key];
            result[key] = valueTemp;
            let inputStringTemp = valueTemp;
            if (typeof valueTemp != 'string' && typeof valueTemp != 'object') {
                inputStringTemp = valueTemp.toString();
            }
            if (value[key].hasOwnProperty('min')) {
                const numberMin = (_a = value[key]) === null || _a === void 0 ? void 0 : _a.min;
                if (inputStringTemp.length < numberMin) {
                    objectError.error = `\n min characters ${numberMin}`;
                    objectError.key = key;
                }
            }
            if (value[key].hasOwnProperty('max')) {
                const numberMax = (_b = value[key]) === null || _b === void 0 ? void 0 : _b.max;
                if (inputStringTemp.length > numberMax) {
                    objectError.error = `\n Max characters ${numberMax}`;
                    objectError.key = key;
                }
            }
            if (value[key].hasOwnProperty('empty')) {
                if (!value[key].empty) {
                    if (valueTemp === '') {
                        objectError.error = `\nInput not empty`;
                        objectError.key = key;
                    }
                }
            }
            switch (value[key].type) {
                case String:
                    if (typeof valueTemp != 'string') {
                        objectError.error = `\nInput data type must be String`;
                        objectError.key = key;
                    }
                    break;
                case Number:
                    if (typeof valueTemp != 'number') {
                        objectError.error = `\nInput data type must be Number`;
                        objectError.key = key;
                    }
                    break;
                case Array:
                    if (typeof valueTemp != 'object') {
                        objectError.error = `\nInput data type must be Array`;
                        objectError.key = key;
                    }
                    break;
                case Object:
                    if (typeof valueTemp != 'object') {
                        objectError.error = `\nInput data type must be Object`;
                        objectError.key = key;
                    }
                    break;
                default:
                    break;
            }
        }
        if (objectError.key != '') {
            messageError.push(objectError);
        }
    }
    if (messageError.length >= 1)
        throw ({ message: messageError, status: 401 });
    return result;
};
exports.input = input;
