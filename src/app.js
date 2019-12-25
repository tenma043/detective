const express = require('express')
const app = express()
const serverless = require('serverless-http')
const router = express.Router()
const path = require('path')
process.env.SILENCE_EMPTY_LAMBDA_WARNING=true
var count=60

app.use(express.static('../dist'));
app.use('/.netlify/functions/app',router)
app.listen(9500)
// for local
app.get('/',(req,res)=>{
    res.sendFile('home.html',{root:"../dist"})
})

app.post('/polling',(req,res)=>{
    count-=1
    res.json({message:count})
})
//for product
router.get('/',(req,res)=>{
    let root=path.join(__dirname,'../source/myapp/dist')
    res.sendFile('home.html',{root:root})
})

router.post('/polling',(req,res)=>{
    count-=1
    res.json({message:count})
})


module.exports = app
module.exports.handler = serverless(app)