"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocket = exports.Socket = void 0;
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
var socket_io_2 = require("socket.io");
Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_io_2.Socket; } });
class WebSocket {
    constructor(data) {
        this.appSocket = null;
        this.instance = null;
        this.serverHttp = null;
        this.SocketServer = null;
        if (this.instance === null) {
            this.instance = new WebSocket(data);
            this.instance.AppSocket = (0, express_1.default)();
            this.instance.AppSocket.use((0, cors_1.default)());
            this.instance.AppSocket.use(express_1.default.json());
            this.instance.serverHttp = http_1.default.createServer(this.instance.AppSocket);
            this.instance.SocketServer = new socket_io_1.Server(this.instance.getServerSocket, {
                cors: data.cors, path: data.path
            });
            this.SocketServer.listen(data.port);
            console.log('Server websocket start in port: ' + data.port);
        }
    }
    set AppSocket(app) {
        this.appSocket = app;
    }
    set ServerSocket(server) {
        this.serverHttp = server;
    }
    get getServerSocket() {
        return this.serverHttp;
    }
    get getAppSocket() {
        return this.appSocket;
    }
    set socketServer(socket) {
        this.SocketServer = socket;
    }
    get getSocketServer() {
        return this.SocketServer;
    }
}
exports.WebSocket = WebSocket;
