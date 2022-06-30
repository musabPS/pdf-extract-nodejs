const express = require('express')
const app = express()
const path = require('path')
const fileUpload = require('express-fileupload')
const util = require('util')
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');
const pdf = require('pdf-parse');

app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'./views'))
app.use('/',express.static(path.join(__dirname, './public')))


var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  var upload = multer({ storage : storage}).single('userPhoto');
   

app.get('/',(req,res)=>{


    res.render("pages/extractpdftable")
   
})

// app.post('/pdfextract',async (req,res)=>{

//     try{
//       let pagesCount=0
//       let PageData=[]
//       let items=[]

//       console.log("che",req)
//     // upload(req,res,function(err) {
//     //     if(err) {
//     //         return res.end("Error uploading file.");
//     //     }
//     //     res.end("File is uploaded");
//     // });
    
//       const file = req.files.file;
  
      
  
//       const fileName = file.name;
//       const size = file.data.length;
//       const extention = path.extname(fileName)
    
//       //const allowedExtention = /pdf/;
//      // if(!allowedExtention.test(extention)) throw "unsupported"
//       const md5 =file.md5;
  
//       const URL = md5+extention;
      
//       console.log(URL)
//          util.promisify(file.mv)("Upload/"+URL)
  
//         //  res.json({
//         //    message : "File Uploaded scuccessfully"
//         //  })
    
    
//         setTimeout(
//             function() {
            
//                 let dataBuffer = fs.readFileSync("Upload/"+"d29cc63195d7a22933758520a07e8333");

//                 pdf(dataBuffer).then(function(data) {
               
//                   // number of pages
//                   console.log(data.numpages);
//                   // number of rendered pages
//                   console.log(data.numrender);
//                   // PDF info
//                   console.log(data.info);
//                   // PDF metadata
//                   console.log(data.metadata); 
//                   // PDF.js version
//                   // check https://mozilla.github.io/pdf.js/getting_started/
//                   console.log(data.version);
//                   // PDF text
              
              
//                   page3=data.text
//                   page3=page3.split("\n\n")
//                   page3=page3[3]
//                   page3=page3.split("\n")
              
//                  // console.log(page3); 
              
              
//                   date          = page3[5].match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}")[0]
//                   to            = page3[6]
//                   attn          = page3[8]
//                   from          = page3[10]
//                   jobNumber     = page3[14]
//                   shipper       = page3[17]
//                   pol           = page3[20]
//                   term          = page3[23]
//                   pod           = page3[26]
//                   carrierRefNo  = page3[29]
//                   commodity     = page3[32]
//                   volume        = page3[35]
              
//                   let tableStartIndex = page3.indexOf("TANK NUMBERTARE WT/CAPACITYRELEASE DATERELEASE REF");
//                   let tableEndIndex = page3.indexOf("LOADING VESSEL");
              
//                   console.log("tableStartIndex",tableStartIndex)
              
              
//                     itemsLine= page3[tableStartIndex+2]
//                     console.log("items",itemsLine)
              
//                     let tankNumber = itemsLine.substring(0, 12);
//                     console.log("tankNumber",tankNumber)
              
//                     let tareWT = itemsLine.substring(12, 22);
//                     console.log("tareWT",tareWT)
              
//                     let releaseDate="RLS ON"+itemsLine.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}")[0]
//                     console.log("releaseDate",releaseDate)
              
              
              
              
//                 // for(var i=tableStartIndex+1; i<tableEndIndex; i++)
//                 // {
              
//                 //   items.push({
//                 //     tankDetails: page3[i]
//                 //   })
              
//                 // }
              
              
//                   pdfObject={
              
//                     date          : date,
//                     to            : to,
//                     attn          : attn,
//                     from          : from,
//                     jobNumber     : jobNumber,
//                     shipper       : shipper,
//                     pol           : pol,
//                     term          : term,
//                     pod           : pod,
//                     carrierRefNo  : carrierRefNo,
//                     commodity     : commodity,
//                     volume        : volume
              
//                   }
              
//                  // console.log("checkc",pdfObject)
//                   res.send(pdfObject)
//               });

                
//             }, 2000);

 
//     }
//     catch (err)
//     {
//       console.log("Error",err)
//       res.status(500).json({ message : err })
//     }
  
 
  
  
  
  
//   //   // for(var i=tableStartIndex+1; i<tableEndIndex; i++)
//   //   // {
  
//   //   //   items.push({
//   //   //     tankDetails: page3[i]
//   //   //   })
  
//   //   // }
  
  
//   //     pdfObject={
  
//   //       date          : date,
//   //       to            : to,
//   //       attn          : attn,
//   //       from          : from,
//   //       jobNumber     : jobNumber,
//   //       shipper       : shipper,
//   //       pol           : pol,
//   //       term          : term,
//   //       pod           : pod,
//   //       carrierRefNo  : carrierRefNo,
//   //       commodity     : commodity,
//   //       volume        : volume
  
//   //     }
  
//   //    // console.log("checkc",pdfObject)
//   //     res.send(page3)
//   // });
//   //     await Promise.all(files.map(async (file) => {
  
  
//     //console.log("check",patients)
  
  
//   }) 

app.post('/pdfextract',async (req,res)=>{

    try{
      let pagesCount=0
      let PageData=[]
      let items=[]
  
      console.log("che",req.files)
  
      
    // upload(req,res,function(err) {
    //     if(err) {
    //         return res.end("Error uploading file.");
    //     }
    //     res.end("File is uploaded");
    // });
    
      const file = req.files.file;
  
      
  
      const fileName = file.name;
      const size = file.data.length;
      const extention = path.extname(fileName)
    
      //const allowedExtention = /pdf/;
     // if(!allowedExtention.test(extention)) throw "unsupported"
      const md5 =file.md5;
  
      const URL = md5+extention;
      
      console.log(URL)
         util.promisify(file.mv)("Upload/"+URL)
  
        //  res.json({
        //    message : "File Uploaded scuccessfully"
        //  })
    
    
        setTimeout(
            function() {
            
                let dataBuffer = fs.readFileSync("Upload/"+URL);
  
                pdf(dataBuffer).then(function(data) {
               
                  // number of pages
                  console.log(data.numpages);
                  // number of rendered pages
                  console.log(data.numrender);
                  // PDF info
                  console.log(data.info);
                  // PDF metadata
                  console.log(data.metadata); 
                  // PDF.js version
                  // check https://mozilla.github.io/pdf.js/getting_started/
                  console.log(data.version);
                  // PDF text
              
              
                  page3=data.text
                  page3=page3.split("\n\n")
                  page3=page3[3]
                  page3=page3.split("\n")
              
                 // console.log(page3); 
              
              
                  date          = page3[5].match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}")[0]
                  to            = page3[6]
                  to=to.replace("TO     : ","")
                  attn          = page3[8]
                  attn=attn.replace(":","")
                  from          = page3[10]
                  from = from.replace(":","")
                  jobNumber     = page3[14]
                  shipper       = page3[17]
                  pol           = page3[20]
                  term          = page3[23]
                  pod           = page3[26]
                  carrierRefNo  = page3[29]
                  commodity     = page3[32]
                  volume        = page3[35]
              
                  let tableStartIndex = page3.indexOf("TANK NUMBERTARE WT/CAPACITYRELEASE DATERELEASE REF");
                  let tableEndIndex = page3.indexOf("LOADING VESSEL");
              
                  console.log("tableStartIndex",tableStartIndex)
              
                 var counts=0
                 var items=[]
                  for(var i=tableStartIndex; i<tableEndIndex; i++)
                  {
                   
                    if(i==tableStartIndex){counts=2}
                    if(i>tableStartIndex){counts+=5}
                    itemsLine= page3[tableStartIndex+counts]
                    if(itemsLine==":"){break}
  
                    console.log("items1",itemsLine)
  
                      let tankNumber = itemsLine.substring(0, 12);
                     console.log("tankNumber",tankNumber)
              
                     let tareWT = itemsLine.substring(12, 22);
                     console.log("tareWT",tareWT)
              
                     let releaseDate=itemsLine.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}")[0]
                     console.log("releaseDate",releaseDate)
                     let releaseDateIndex = itemsLine.indexOf(releaseDate);
                     let releaseRef = itemsLine.substring(releaseDateIndex, 50);
                     releaseRef=releaseRef.replace(releaseDate,"")
  
                     console.log("releaseRef",releaseRef)
                        items.push({
  
                          tankNumber   : tankNumber,
                          tareWT       : tareWT,
                          releaseDate  : releaseDate,
                          releaseRef   : releaseRef
  
                                     })
                                        
  
                    }
  
  
              
                  pdfObject={
              
                    date          : date,
                    to            : to,
                    attn          : attn,
                    from          : from,
                    jobNumber     : jobNumber,
                    shipper       : shipper,
                    pol           : pol,
                    term          : term,
                    pod           : pod,
                    carrierRefNo  : carrierRefNo,
                    commodity     : commodity,
                    volume        : volume,
                    items          :items
              
                  }
              
                 // console.log("checkc",pdfObject)
                  res.send(pdfObject)
              });
  
                
            }, 2000);
  
  
    }
    catch (err)
    {
      console.log("Error",err)
      res.status(500).json({ message : err })
    }
  
  
  
  
  
  
  //   // for(var i=tableStartIndex+1; i<tableEndIndex; i++)
  //   // {
  
  //   //   items.push({
  //   //     tankDetails: page3[i]
  //   //   })
  
  //   // }
  
  
  //     pdfObject={
  
  //       date          : date,
  //       to            : to,
  //       attn          : attn,
  //       from          : from,
  //       jobNumber     : jobNumber,
  //       shipper       : shipper,
  //       pol           : pol,
  //       term          : term,
  //       pod           : pod,
  //       carrierRefNo  : carrierRefNo,
  //       commodity     : commodity,
  //       volume        : volume
  
  //     }
  
  //    // console.log("checkc",pdfObject)
  //     res.send(page3)
  // });
  //     await Promise.all(files.map(async (file) => {
  
  
    //console.log("check",patients)
  
  
  }) 

  app.post('upload-avatar',function(req,res){


    console.log("che",req)
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
  



app.listen(3000,()=>{
    console.log("port 3000")
})
