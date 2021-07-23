const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors({
    origin: "http://localhost:3000/"
}))
app.use(express.json())



app.get("/getdata", async(req, res)=>{
 return res.status(200).json("not found")
})
app.post("/getdata", async(req, res)=>{
    console.log(req.body)
   })

app.listen(3001, ()=>{
    console.log("Server Started")
})