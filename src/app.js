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
var role="Detective"
var page=""
var start=false
var active=0
var word=""
var end=false

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

router.post('/send',(req,res)=>{
    word = req.body.word
    res.json({word:word})
})

router.post('/start',(req,res)=>{
    active=req.body.active
    start=true
    res.json({page:page})
})

router.post('/close',(req,res)=>{
    console.log("CLOSING")
    members=[]
    count=0
    page=""
    res.json({})
})

router.post('/end',(req,res)=>{
    word=""
    page=""
    end=true
    res.json({})
})

router.post('/reset',(req,res)=>{
    count=0
    message="Waiting"
    members=[]
    roles=[]
    page=""
    start=false
    end=false
    res.json({})
})


router.post('/polling',(req,res)=>{
    if(start){
    let myindex = members.findIndex(item=>{return item==req.cookies.id}) 
    if (myindex==active){
        page = "/active"
    }
    else {
        page = "/player"
    }
    }
    res.json({message:message,members:members,count:count,page:page})
})

router.post('/polling2',(req,res)=>{
    if(end){page="/room"}
    res.json({role:role,word:word,page:page})
})

module.exports = app
module.exports.handler = serverless(app)