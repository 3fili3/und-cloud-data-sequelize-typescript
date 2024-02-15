import { Server, Socket } from 'socket.io'
import cors from 'cors'
import express, { Application } from 'express'
import http, { createServer } from 'http'
export { Socket } from 'socket.io'

export class WebSocket {

    private appSocket: Application = null as any
    private static Instance: WebSocket = null as any
    private serverHttp: typeof createServer = null as any
    private SocketServer: Server = null as any

    public constructor(data: { port: number, path: string, cors: string[] }) {
        if(WebSocket.Instance === null) {
            WebSocket.Instance = this
            WebSocket.Instance.AppSocket = express()
            WebSocket.Instance.AppSocket.use(cors())
            WebSocket.Instance.AppSocket.use(express.json())
            WebSocket.Instance.serverHttp = http.createServer(WebSocket.Instance.AppSocket) as any
            WebSocket.Instance.SocketServer = new Server(WebSocket.Instance.getServerSocket as any, { cors: data.cors as any, path: data.path })
            this.SocketServer.listen(data.port)
            console.log('Server websocket start in port: '+data.port)
        }
    }

    set AppSocket(app: Application) { 
        WebSocket.Instance.appSocket = app
    }

    set ServerSocket(server: typeof createServer) {
        WebSocket.Instance.serverHttp = server
    }

    get getServerSocket() {
        return WebSocket.Instance.serverHttp
    }

    get getAppSocket() {
        return WebSocket.Instance.appSocket
    }

    set socketServer(socket: Server) {
        WebSocket.Instance.SocketServer = socket
    }

    get getSocketServer() {
        return WebSocket.Instance.SocketServer
    }
}
