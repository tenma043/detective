const express = require('express')
const app = express()
const serverless = require('serverless-http')
const router = express.Router()
const path = require('path')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
process.env.SILENCE_EMPTY_LAMBDA_WARNING=true
var count=0
var message="Waiting"
var members=[]

app.use(cookieparser())
app.use(bodyparser())
app.use(express.static('../dist'));
app.use('/.netlify/functions/app',router)
// app.listen(9500)
// for local
app.get('/',(req,res)=>{
    res.sendFile('home.html',{root:"../dist"})
})

//for product
app.get('/test',(req,res)=>{
    let root=path.join(__dirname,'../source/myapp/dist')
    res.sendFile('home.html',{root:root})
})

router.get('/',(req,res)=>{
    let root=path.join(__dirname,'../source/myapp/dist')
    res.sendFile('home.html',{root:root})
})

router.get('/room',(req,res)=>{
    let root=path.join(__dirname,'../source/myapp/dist')
    res.sendFile('room.html',{root:root})
})

router.get('/game1',(req,res)=>{
    let root=path.join(__dirname,'../source/myapp/dist')
    res.sendFile('game.html',{root:root})
})
router.post('/join',(req,res)=>{
    count+=1
    members[count-1]=req.body.id
    res.cookie('id',req.body.id,{MaxAge:1000*60*60})
    res.json({})
})

router.post('/set',(req,res)=>{
    message = req.body.message
    console.log(req.cookies.id)
    res.json({message:message})
})

router.post('/close',(req,res)=>{
    console.log("CLOSING")
    members=[]
    count=0
    res.json({})
})

router.post('/polling',(req,res)=>{
    res.json({message:message,members:members,count:count})
})


module.exports = app
module.exports.handler = serverless(app)