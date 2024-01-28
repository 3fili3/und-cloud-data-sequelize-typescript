"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handles = void 0;
class Handles {
    error(error, req, res, next) {
        let status = error['status'];
        if (status === "" || status === undefined) {
            status = 500;
        }
        res.status(status).json({ message: error.message, status });
        // error["status"] = 200;
        return;
    }
}
exports.handles = new Handles();
