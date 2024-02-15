import { Server, Socket } from 'socket.io'
import cors from 'cors'
import express, { Application } from 'express'
import http, { createServer } from 'http'
export { Socket } from 'socket.io'

export class WebSocket {
    private appSocket: Application = null as any
    private instance: WebSocket = null as any
    private serverHttp: typeof createServer = null as any
    private SocketServer: Server = null as any

    public constructor(data: { port: number, path: string, cors: string[] }) {
        if(this.instance === null) {
            this.instance = new WebSocket(data)
            this.instance.AppSocket = express()
            this.instance.AppSocket.use(cors())
            this.instance.AppSocket.use(express.json())
            this.instance.serverHttp = http.createServer(this.instance.AppSocket) as any
            this.instance.SocketServer = new Server(this.instance.getServerSocket as any, {
                cors: data.cors as any, path: data.path
            })
            this.SocketServer.listen(data.port)
            console.log('Server websocket start in port: '+data.port)
        }
    }

    set AppSocket(app: Application){
        this.appSocket = app
    }

    set ServerSocket(server: typeof createServer) {
        this.serverHttp = server
    }

    get getServerSocket() {
        return this.serverHttp
    }

    get getAppSocket() {
        return this.appSocket
    }

    set socketServer(socket: Server) {
        this.SocketServer = socket
    }

    get getSocketServer() {
        return this.SocketServer
    }
}
