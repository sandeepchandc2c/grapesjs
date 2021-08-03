const express = require("express")


const app = express()

app.use(express.static('testlib'))
var html_to_pdf = require('html-pdf-node');
const fs = require("fs")
let options = { format: 'A4' };
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

let file = { content: `<input type="text"></input>` };
// or //
// let file = { url: "https://example.com" };
// html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//     fs.writeFileSync(__dirname+"/two.pdf",pdfBuffer, 
//     (err)=>{
//         console.log("err",err)
//     } )
//   console.log("PDF Buffer:-", pdfBuffer);
// });


//
//2
var pdf = require('html-pdf');
// pdf.create(`<input type="text"></input>`, options).toFile(__dirname+'/businesscard.pdf', function(err, res) {
//     if (err) return console.log(err);
//     console.log(res); // { filename: '/app/businesscard.pdf' }
//   });
//3
var htmlToPdf = require('html-to-pdf');
// htmlToPdf.convertHTMLFile(`<input type="password"></input>`, 'next.pdf',
//     function (error, success) {
//        if (error) {
//             console.log('Oh noes! Errorz!');
//             console.log(error);
//         } else {
//             console.log('Woot! Success!');
            
//             console.log(success);
//         }
//     }
// );

// 4 test 
// var conversion = require("phantom-html-to-pdf")();
// conversion({ html: `<input type="password"></input>`}, function(err, pdf) {
//     var output = fs.createWriteStream('output.pdf')
//     console.log(pdf.logs);
//     console.log(pdf.numberOfPages);
//       // since pdf.stream is a node.js stream you can use it
//       // to save the pdf to a file (like in this example) or to
//       // respond an http request.
//     pdf.stream.pipe(output);
 
// });
// 5
const HTML5ToPDF = require("html5-to-pdf")
const path = require("path")
 
// const run = async () => {
//   const html5ToPDF = new HTML5ToPDF({
//     inputPath: path.join(__dirname, "kbc.html"),
//     outputPath: path.join(__dirname, "output1.pdf"),
//     // include: [
//     //   path.join(__dirname, "assets", "basic.css"),
//     //   path.join(__dirname, "assets", "custom-margin.css"),
//     // ],
//   })
 
//   await html5ToPDF.start()
//   await html5ToPDF.build()
//   await html5ToPDF.close()
// }
 
// (async () => {
//   try {
//     await run()
//     console.log("DONE")
//   } catch (error) {
//     console.error(error)
//     process.exitCode = 1
//   } finally {
//     process.exit();
//   }
// })()
 
 
app.listen(3001, ()=>{
    console.log("Server Started")
})
