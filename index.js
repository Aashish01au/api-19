const http = require("http")
const app = require("./src/config/express.config")
const server = http.createServer(app)
server.listen(9000,"localhost",(error)=>{
    if(!error){
        console.log("Server is running on port number 9000")
        console.log("Browse Server at http://localhost:9000")
        console.log("press CTRL + C to disconnect the server")
    }
})