const http = require('http'),
    app = require('./app');

const PORT = process.env.PORT||3000;

const server = http.createServer(app);

server.listen(PORT,()=>{
   console.log(`Listening at ${PORT}` )
});
