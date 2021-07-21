const express = require("express")
const app = express()
const fs = require("fs")
const mongoose = require('mongoose');
const EmailEditor = require("./model")
var extractCss = require('extract-css');
const hb = require("handlebars")
const puppeter = require("puppeteer")
var HTMLParser = require('node-html-parser');
const cors = require("cors")
 const path = require("path")
var shell = require('shelljs');
app.use(express.static('public'))
app.use(express.static('pdf2'))
// app.use(cors())
var multer  = require('multer')
const sheets = require("./model/sheets")
var storage = multer.diskStorage({
  destination: function(req, file, cb)
  {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
   if(file.originalname.match(/\.(pdf)$/))
    {
        cb(null, Date.now()+'-'+file.originalname)
    }
    else {
      return cb(new Error('only pdf format'))
    }
    
    
  }
})

var upload = multer({storage: storage}).single("file")
mongoose.connect('mongodb://CallingServiceUser:user0000912939123@ec2-3-8-84-88.eu-west-2.compute.amazonaws.com:27017/CallingService', {
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
app.use(express.static('client/build'));
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
    // const data = new EmailEditor({
    //     data: JSON.stringify(req.body)
    // })
    // await data.save()
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
app.post("/upload", upload, async(req, res)=>{
  const {file} = req
  const pp = `${__dirname}/uploads/${file.filename}`
  console.log(file)
  shell.cd("./pdf2")
  shell.exec(`pdf2htmlEX.exe ${pp}`)
  let htmlfile = file.filename.replace(".pdf", ".html")
  console.log(htmlfile)
  let data = fs.readFileSync(`${__dirname}/pdf2/${htmlfile}`)
  const sh = new sheets({
    name: htmlfile
  })
  await sh.save()
  fs.unlinkSync(pp);
  let result = data.toString() 
  res.status(200).json(result)
})
app.get("/sheet", async(req, res)=>{
  let data = await sheets.find()
  return res.status(200).json(data)
})
app.get("/html/:id", async(req, res)=>{
  const {id} = req.params
  const jj=  await sheets.findOne({ _id: id})
  if(jj)
  {
    let data = fs.readFileSync(`${__dirname}/pdf2/${jj.name}`)
    var options = {
     url: './',
     applyStyleTags: true,
     removeStyleTags: true,
     applyLinkTags: true,
     removeLinkTags: true,
     preserveMediaQueries: false
   };
   
   let result = data.toString() 
   extractCss(result, options, function (err, html, css) {
     let data = {}
      let rr = HTMLParser.parse(result)
     data["gjs-css"] = css
     data["gjs-html"] = rr.querySelector("body").toString()
     console.log("working")
       return res.status(200).json(data)
   })
  }

})

app.get("/download/:id", async(req, res)=>{
  const {id} = req.params
  const jj=  await sheets.findOne({ _id: id})
  let data =  `${__dirname}/pdf2/${jj.name}`
  return res.status(200).json(data)

})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.listen(3001, ()=>{
    console.log("Server Started")
})