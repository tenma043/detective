const express = require('express')
const app = express()
// const server = require('http').Server(app)
const serverless = require('serverless-http')
// const io = require('socket.io')(server,{serveClient:false})
const router = express.Router()
const path = require('path')
process.env.SILENCE_EMPTY_LAMBDA_WARNING=true

app.use(express.static('../dist'));
app.use('/.netlify/functions/app',router)

// for local
app.get('/',(req,res)=>{
    res.sendFile('home.html',{root:"../dist"})
})

//for product
router.get('/',(req,res)=>{
    let root=path.join(__dirname,'../source/myapp/dist')
    res.sendFile('home.html',{root:root})
})

module.exports = app
module.exports.handler = serverless(app)