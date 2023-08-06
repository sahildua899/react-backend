const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 6004;
const server = http.createServer(app)


server.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})