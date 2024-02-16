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
        this.SocketServer = null;
        if (WebSocket.Instance === null) {
            WebSocket.Instance = this;
            const appSocket = (0, express_1.default)();
            WebSocket.Instance.appSocket = (0, express_1.default)();
            appSocket.use((0, cors_1.default)());
            appSocket.use(express_1.default.json());
            const createServer = http_1.default.createServer(appSocket);
            WebSocket.Instance.SocketServer = new socket_io_1.Server(createServer, { cors: data.cors, path: data.path });
            WebSocket.Instance.SocketServer.listen(data.port);
            console.log('Server websocket start in port: ' + data.port);
        }
    }
    // set AppSocket(app: Application) { 
    //     WebSocket.Instance.appSocket = app
    // }
    // set ServerSocket(server: typeof createServer) {
    //     WebSocket.Instance.serverHttp = server
    // }
    // get getServerSocket() {
    //     return WebSocket.Instance.serverHttp
    // }
    // get getAppSocket() {
    //     return WebSocket.Instance.appSocket
    // }
    // set socketServer(socket: Server) {
    //     WebSocket.Instance.SocketServer = socket
    // }
    get stocket() {
        return WebSocket.Instance.SocketServer;
    }
}
exports.WebSocket = WebSocket;
WebSocket.Instance = null;
