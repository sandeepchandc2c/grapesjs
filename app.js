const express = require("express")
const app = express()
const fs = require("fs")
const mongoose = require('mongoose');
const EmailEditor = require("./model")
 mongoose.connect('mongodb://localhost/my_database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

app.use(express.json({ limit: '500mb' }))

app.use(function(req, res, next) {
    // console.log(req.headers)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true)
    next();
    });

app.get("/getdata",async(req, res)=>{
//    const data =  fs.readFileSync(__dirname+"/abc.json" )
//    const result = JSON.parse(data)
      const result=  await EmailEditor.findOne({ _id: "60e2f550522b991fe4b496ec"})
       if(result.data != undefined)
       {
         let data = JSON.parse(result.data)
         return res.status(200).json(data)
       }
     return res.status(200).json([])
})
app.post("/getdata", async(req, res)=>{
    fs.writeFileSync(__dirname+"/abc.json", JSON.stringify(req.body))
    // const data = new EmailEditor({
    //     data: JSON.stringify(req.body)
    // })
    // await data.save()
    // console.log("saved")
    await EmailEditor.findByIdAndUpdate({ _id: "60e2f550522b991fe4b496ec"}, {
        data:  JSON.stringify(req.body)
    })
    res.status(200).json("done")
   })

app.listen(3001, ()=>{
    console.log("Server Started")
})