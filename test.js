const express = require("express")


const app = express()

app.use(express.static('testlib'))
app.listen(3001, ()=>{
    console.log("Server Started")
})
