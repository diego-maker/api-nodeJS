
const http = require('http');
const debug = require('debug')('nodestr:server');

const app = require('../src/app');
const port =  normalizePort(process.env.PORT || '4000');

app.set('port', port);

const server = http.createServer(app);


server.listen(port);
server.on('error',  onError);
server.on('listening' , onListening)
console.log('servidor iniciado na porta', port);

function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val
    }
    if(port >= 0){
        return port
    }
    return false
}

function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind  = typeof port === 'string' ?
    'Pipe' + port :
    'Port' + port ;
    
    switch(error.code){
        case 'EACCES':
            console.error(bind , "Necessario nivel de privilegio");
            process.exit(1)
        case 'EADDRINUSE':
            console.log(bind , "Todas as portas ja estao em uso no momento");
            process.exit(1)
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();
    const bind = typeof  addr === 'string'
    ? 'pipe' + addr 
    : 'port' + addr.port;
    debug("listenig on" + bind);
}