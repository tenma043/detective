const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const router = express.Router()
const path = require('path')
process.env.SILENCE_EMPTY_LAMBDA_WARNING=true

app.use('/.netlify/functions/app',router)

// for local
app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:"./dist"})
})

//for product
router.get('/',(req,res)=>{
    let root=path.join(__dirname,'../source/myapp/dist')
    res.sendFile('index.html',{root:root})
})

server.listen(9500)

io.on('connection',(socket)=>{
    console.log('Connected done')
})

// module.exports.handler = Server(app)