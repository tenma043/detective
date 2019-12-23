const express = require('express')
const serverless = require('serverless-http')

const app = express()
const router = express.Router()


app.use('/.netlify/functions/app',router)

router.get('/',(req,res)=>{
    console.log("Initial")
    res.sendfile('./dist/index.html')
})

module.exports.handler = serverless(app)