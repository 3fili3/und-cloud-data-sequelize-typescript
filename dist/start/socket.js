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
        this.serverHttp = null;
        this.SocketServer = null;
        if (WebSocket.Instance === null) {
            WebSocket.Instance = this;
            WebSocket.Instance.AppSocket = (0, express_1.default)();
            WebSocket.Instance.AppSocket.use((0, cors_1.default)());
            WebSocket.Instance.AppSocket.use(express_1.default.json());
            WebSocket.Instance.serverHttp = http_1.default.createServer(WebSocket.Instance.AppSocket);
            WebSocket.Instance.SocketServer = new socket_io_1.Server(WebSocket.Instance.getServerSocket, { cors: data.cors, path: data.path });
            this.SocketServer.listen(data.port);
            console.log('Server websocket start in port: ' + data.port);
        }
    }
    set AppSocket(app) {
        WebSocket.Instance.appSocket = app;
    }
    set ServerSocket(server) {
        WebSocket.Instance.serverHttp = server;
    }
    get getServerSocket() {
        return WebSocket.Instance.serverHttp;
    }
    get getAppSocket() {
        return WebSocket.Instance.appSocket;
    }
    set socketServer(socket) {
        WebSocket.Instance.SocketServer = socket;
    }
    get getSocketServer() {
        return WebSocket.Instance.SocketServer;
    }
}
exports.WebSocket = WebSocket;
WebSocket.Instance = null;
