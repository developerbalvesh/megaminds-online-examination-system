const express = require("express");

// rest object
const app = express();

// rest api
app.get('/',(req, res)=>{
    res.send({
        message:'welcome to online shopee'
    })
})

// port
const port = 8080;

app.listen(port, ()=>{
    console.log('app is running')
})