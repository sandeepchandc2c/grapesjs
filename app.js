const express = require("express")
const app = express()
const fs = require("fs")
const mongoose = require('mongoose');
const EmailEditor = require("./model")
var extractCss = require('extract-css');
const hb = require("handlebars")
const puppeter = require("puppeteer")
var HTMLParser = require('node-html-parser');
const Signature = require("./model/signature")
 const path = require("path")
var shell = require('shelljs');

// app.use(cors())
var multer  = require('multer')
const SheetsModel = require("./model/sheets")
var storage = multer.diskStorage({
  destination: function(req, file, cb)
  { 
     cb(null,  __dirname+'/uploads')
  },
  filename: function (req, file, cb) {
   if(file.originalname.match(/\.(pdf)$/))
    {   
       let dd = file.originalname.replace(/ /g,'')
        cb(null, Date.now()+'-'+dd)
    }
    else {
      return cb(new Error('only pdf format'))
    }
    
    
  }
})

var upload = multer({storage: storage}).single("file")
mongoose.connect('databaseurl', {
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
app.use(express.static('pdf2'))
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
app.post("/getdata/:id", async(req, res)=>{
    const {id} = req.params
    var idd = mongoose.Types.ObjectId(id);
    console.log(idd)
    await EmailEditor.findOneAndUpdate({ sheet:idd}, {
        data:  JSON.stringify(req.body),
        sheet: idd
    } , {upsert: true})
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
  try{
    const {file} = req
  const pp = `${__dirname}/uploads/${file.filename}`
  console.log(file)
  shell.cd(__dirname+"/pdf2")
  shell.exec(`pdf2htmlEX.exe ${pp}`)
  let htmlfile = file.filename.replace(".pdf", ".html")
  console.log(htmlfile)
  let data = fs.readFileSync(`${__dirname}/pdf2/${htmlfile}`)
  const sh = new SheetsModel({
    name: htmlfile
  })
  await sh.save()
  fs.unlinkSync(pp);
  let result = data.toString() 
  res.status(200).json(result)
  }
  catch(e)
  {
    console.log("tt",e)
  }
})
app.get("/sheet", async(req, res)=>{
  let data = await SheetsModel.find()
  return res.status(200).json(data)
})
app.get("/html/:id", async(req, res)=>{
  const {id} = req.params
  const kj=  await EmailEditor.findOne({ sheet: id}).populate("sheet")
  if(kj)
  { 
    let data = JSON.parse(kj.data)
    return res.status(200).json(data)
  }
  else{
    const jj=  await SheetsModel.findOne({ _id: id})
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
  
   }
})
app.post("/savesign", async(req, res)=>{
  try{
    const {data} = req.body
       const sign = new Signature({
        signature: data
       })
       await sign.save()
       return res.status(200).json("done")
  }
  catch(e)
  {
    console.log("err", e)
  }
})
app.get("/getsign", async(req, res)=>{
  try{
       const sign = await Signature.findOne()
       return res.status(200).json(sign)
  }
  catch(e)
  {
    console.log("err", e)
  }
})
app.get("/download/:id", async(req, res)=>{
try{
  const {id} = req.params
  console.log(id)
  const jj=  await EmailEditor.findOne({ sheet: id}).populate("sheet")
  let data =  `${__dirname}/pdf2/${jj.sheet.name}`
  let dataa = JSON.parse(jj.data)
  let css = dataa["gjs-css"]
  let body = dataa["gjs-html"]
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
  const template = hb.compile(html, {strict: true})
  const rresult = template()
  const browser = await puppeter.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.setContent(rresult)
  let name = jj.sheet.name.replace("html", "pdf")
  await page.pdf({path: `${__dirname}/uploads/${name}`, displayHeaderFooter: false,
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
  
  let ress = `${__dirname}/uploads/${name}`
  res.download(ress);
}
catch(e)
{
  console.log("error",e)
}

})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.listen(3001, ()=>{
    console.log("Server Started")
})
// cxawLcuWKItQAL4sS$uUgMHYRz9GC.GU