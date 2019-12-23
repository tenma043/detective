const express = require('express')
const app = express()
const server = require('http').Server(app)
// const serverless = require('serverless-http')
// const io = require('socket.io')(server)

const router = express.Router()
const path = require('path')
root=path.join(__dirname,'../source/myapp/dist')
process.env.SILENCE_EMPTY_LAMBDA_WARNING=true

app.use('/.netlify/functions/app',router)

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:"./dist"})
})

router.get('/',(req,res)=>{
    res.sendFile('index.html',{root:root})
})

// io.on('connection',(socket)=>{
//     console.log('Connected done')
// })


// module.exports.handler = Server(app)