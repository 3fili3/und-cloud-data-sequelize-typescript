"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    log(logger) {
        console.log(logger);
    }
    error(logger) {
        console.error(logger);
    }
    warning(logger) {
        console.log(logger);
    }
}
exports.Logger = Logger;
