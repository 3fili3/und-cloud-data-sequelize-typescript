import { kernel } from './start/kernel';

export { kernel } from './start/kernel';
export { ContextController, ContextServices, Delete, Get, Post, Put, } from './Bin/Router';

const app: kernel = new kernel({ domain: '/api/v1', port: 3001 })

app.middlewares().start()