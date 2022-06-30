/**
* @NApiVersion 2.1
* @NScriptType Suitelet
*/


define([
   'N/render',
   'N/file',
   'N/search',
   'N/redirect',
   'N/url',
   'N/https',
   'N/format',
   'N/record',
   'N/email',
   'SuiteScripts/Vendor Test Theme/moment.js',
   'N/ui/serverWidget',
   'N/encode'

 
 ], function (render, file, search, redirect, url, https,format,record,email,moment,serverWidget,encode) {
 
 
   function onRequest(context) {
       // var request = context.request;
       // var response = context.response;
       if (context.request.method === "GET") {

         log.debug("GET voidTicket", context.request.parameters);


         var form = serverWidget.createForm({
            title: 'PDF TO Sale Order'
        });

        var field = form.addField({
         id: 'custpage_file',
         type: 'file',
         label: 'Document'
     });
     form.addSubmitButton({
      label: 'Upload'
  });

  context.response.writePage(form);

         // if(context.request.parameters.type=="invoice")
         // {
         //    var id = context.request.parameters.internalid
         //   log.debug("check",getInvoice(id))

         //   context.response.write(getInvoice(id))
         //   return 
         // }


       }

       if (context.request.method === "POST")  
       {
         var headers = {};
         
         var fileObj = context.request.files['custpage_file'];
         // Setting Folder in File Cabinet
         fileObj.folder = 9054;
         var fileId = fileObj.save();
         // Getting/Logging File Contents
         var templateFile = file.load({
            id: fileId
        });
         var fileContents = templateFile.getContents();
         log.debug({title: 'File Contents', details: fileContents});
         // File Contents = UEsDBBQABgAIAAAAIQDfpNJsWgEAACAFAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAIooAACAAAAAAAAAAAAAAAAA


         var decodedStr = encode.convert({
            string: fileContents,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_64
        });
         log.debug({title: 'Decoded Contents', details: decodedStr});



        
          headers["Content-Type"] = "application/json";

          var response = https.post({
            url:"https://d830-2400-adc1-18f-5d00-9cf4-ddc8-2a6c-1e32.ngrok.io/pdfextract",
            headers: headers,
            body: {file : decodedStr}
          });


          log.debug("check data postRequest response",response)


        // var fileObj = context.request.files.custpage_file;
            ///  fileObj.folder = 4601; //replace with own folder ID
             // var id = fileObj.save();

         // log.debug("POST voidTicket parameters", context.request.parameters);
         // log.debug("POST voidTicket body", context.request.body);
         // log.debug("files",context.request.files)

         // var parseBody= JSON.parse( context.request.body)
         // var internalId = parseBody.pointernalid
         // var date       =  parseBody.changeallitemdate
         // var lineCount=parseBody.linenumbertop
         // var selectedLine=[]
         // log.debug("selectlinein loop", parseBody.save)
        

 
       }
      
   }

 





   return {
       onRequest: onRequest,
     
   }
 
 });
 