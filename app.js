const express = require("express")
const app = express()
const fs = require("fs")
const mongoose = require('mongoose');
const EmailEditor = require("./model")
// var pdf = require('html-pdf');
const hb = require("handlebars")
const puppeter = require("puppeteer")
var HTMLParser = require('node-html-parser');
app.use(express.static('public'))
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
app.get("/createhtml",async(req, res)=>{
    try{
      const result=  await EmailEditor.findOne({ _id: "60e2f550522b991fe4b496ec"})
      let values = [
        {
          key: "name",
          value: "sandeep"
        },
        {
          key: "place",
          value: "dehradun"
        },
        {
          key: "email",
          value: "chandsandeep"
        },
        {
          key: "gender",
          value: "M",
          checked: true
        },
        {
          key: "gender",
          value: "F",
          checked: false
        },
        {
          key: "message",
          value: "wow what a day",
          type: "textarea"
        },
        {
          key: "rythm",
          value: "day",
          type: "textarea"
        },
        {
          key: "age",
          value: "23",
          checked: true
        },
        {
          key: "fruits",
          value:"2",
          type: "select"
        }
      ]
      let example = {
        
      }
      
      if(result.data != undefined)
      {
        let data = JSON.parse(result.data)
        let css = data["gjs-css"]
        let body = data["gjs-html"]
        let html = `<!doctype html>
        <html lang="en"
        ><head><meta charset="utf-8">
            <style>
            ${css}
            </style>
        </head>
        <body>
          ${body}
        </body>
        <html>`
        for(let i = 0; i < values.length; i++)
        {
          if(values[i].checked!= undefined  )
          { 
            
            html = html.replace(`name="${values[i].key}"`, `name="${values[i].key}" checked=${values[i].checked}`)
          }
          else if (values[i].type == "select")
          { 
            html = html.replace(`<option value="${values[i].value}">${values[i].value}</option>`, `<option value=${values[i].value} selected>${values[i].value}</option>`)
          }
          else if( values[i].type == "textarea")
          {
            let textarea = HTMLParser.parse(html)
            let data = HTMLParser.parse(html)
            let newdata = textarea.querySelector(`textarea[name="${values[i].key}"]`).innerHTML = values[i].value
            let replacedata = textarea.querySelector(`textarea[name="${values[i].key}"]`).toString()
            let olddata = data.querySelector(`textarea[name="${values[i].key}"]`).toString()
            console.log(replacedata, olddata)
            html = html.replace(olddata,replacedata)
            
          }
          else{
            example[values[i].key] = values[i].value
            html = html.replace(`name="${values[i].key}"`, `name="${values[i].key}" value={{${values[i].key}}}`)
          }

        }
      const template = hb.compile(html, {strict: true})
      const rresult = template(example)
      const browser = await puppeter.launch({
        headless: true
      })
      const page = await browser.newPage()
      await page.setContent(rresult)
      await page.pdf({path: "test.pdf", displayHeaderFooter: false,
      printBackground: true,
      pageRanges: '1-2',
      height: 220+'mm', 
      width: 275+'mm', 
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },})
      await browser.close()
      console.log("done")
      return  res.send(rresult)
      }
    }
    catch(e)
      {
        console.log("err", e)
      }
    })
app.listen(3001, ()=>{
    console.log("Server Started")
})