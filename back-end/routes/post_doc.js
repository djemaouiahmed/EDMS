
const express = require("express")
const mysql = require('mysql2')
const route = express.Router()
const session=require('../application')
const db = require('../db/db')








////////////////////uploads files//////////////////////////
const multer  = require('multer');
const { error, debug } = require("console");

const filsaveengine = multer.diskStorage({
  filename: function (req, file, cb) {

    cb(null,file.originalname)}, 
    destination:  function (req, file, cb) {
        var t=req.body.type;
       
        cb(null, './uploads/'+t)
    },
   
       
    
}) 
const upload = multer({ storage: filsaveengine })


route.post('/', upload.single('file','type'), async function (req, res) {
console.log(req.body);
  if(!req.file){
        console.log(req.file);
    }else{

       
        
   var type=req.body.type;
   var filename;
  
    filename=req.file.originalname 
   
   
    var id_user = req.session.id_user;
  var mots = req.body.mot_cle;
    var path = req.file.destination; // Access file type using req.file.mimetype
    var datetime = new Date();
    var realname = req.body.name
  
    var mot=mots.split(";");
  
    for(var i=0;i<5;i++){if(mot[i]==undefined){mot[i]="";}}
   
        
      // Format the date to MySQL datetime format
    const formattedDateTime = datetime.toISOString().slice(0, 19).replace('T', ' ')
  console.log("ppppp")
     var result = await db.dbUploadDocument(id_user, filename, type, path, mot, formattedDateTime,req.body.comment,realname);
   res.json(result)
        
    }});















////////////////////////////////////////



// Optionally use onReady() to get a promise that resolves when store is ready.


module.exports = route
