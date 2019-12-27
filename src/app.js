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
var role=""
var page=""
var page2=""
var start=false
var active=-1
var word=""
var end=false
var rand=-1

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
    res.cookie('id',count-1,{MaxAge:1000*60*60})
    res.json({})
})

router.post('/send',(req,res)=>{
    word = req.body.word
    res.json({word:word})
})

router.post('/start',(req,res)=>{
    active=req.body.active
    rand = Math.floor(Math.random() * count-1);
    if(rand==active){
        rand==count
    }
    end=false
    start=true
    res.json({page:page})
})

router.post('/close',(req,res)=>{
    members.splice(req.cookies.id,1)
    count-=1
    res.json({})
})

router.post('/end',(req,res)=>{
    word=""
    page=""
    start=false
    end=true
    active=-1
    rand=-1
    res.json({})
})

router.post('/reset',(req,res) => {
    count=0
    message="Waiting"
    members=[]
    role=""
    page=""
    page2=""
    start=false
    active=-1
    word=""
    end=false
    rand=-1
    res.json({})
})


router.post('/polling',(req,res)=>{
    if(start){
    if (req.cookies.id==active){
        page = "/active"
    }
    else {
        page = "/player"
    }
    }
    res.json({message:message,members:members,count:count,page:page})
})

router.post('/role',(req,res)=>{
    if(req.cookies.id==rand){
        role="Conspirator"
    }
    else{
        role="Detective"
    }
    res.json({role:role})
})

router.post('/polling2',(req,res)=>{
    if(end){page2="/room"}
    res.json({role:role,word:word,page:page2})
})

module.exports = app
module.exports.handler = serverless(app)