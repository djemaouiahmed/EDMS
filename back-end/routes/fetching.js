const express = require("express")
const route = express.Router()
const db = require('../db/db')
const adminFonctionalities = require('../controller/adminFonctionalities')


route.post('/getuser', async function (req, res) {
    var id = req.body.id;
    console.log(id)
  res.json(await db.dbGetUserNameById(id)); 
});

route.get('/documents', async function (req, res) {
    var docs;
    var id_user = req.session.id_user;
    
    try {
        const rows = await db.dbListDocumentsReceved(id_user);
        if (rows.length > 0) {
            docs = rows;
            console.log(docs)
            res.json(docs); // Send JSON response
        } else {
            res.send({ message: "You don't have any documents" }); // Send JSON response with a message
        }
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ error: "Internal Server Error" }); // Send JSON response for errors
    }
});


route.get('/list_user',async(req, res) => {
       var valid;
  try {
        const rows = await db.dbListUsers(req.session.id_user);
           valid=rows;

    } catch (err) {
        console.error("Error occurred:", err);
        
    }
     res.json(valid);
})
 let EMAIL_SECRET = 'your_secret_key';
 route.get ('/confirmation/:token', async (req, res) => { await adminFonctionalities.confirmationToken(req.params.token,EMAIL_SECRET)
 res.redirect('/');
});
route.get('/verifydoc', async function (req, res) {
    var docs;
   
    const rows = await db.dbListDocumentsNV();
    docs = rows;
    res.json(docs);
})
route.post('/VerifyFun', async function (req, res) {
    const nom = req.body.nom_doc;
    const id = req.body.id_user;
   
    try {
       await db.dbVerifyDocument(id,nom);
        res.redirect('/home_page');
        
    } catch (err) {
        console.error("Error occurred:", err);
    }
})

route.post('/doc/open/:nom_doc', async function (req, res) {
    const nom_doc = req.params.nom_doc;
    const id_user = req.session.id_user;
    try{
  await db.dbDocumentLog(nom_doc,id_user);
    }catch(err){
        console.error("Error occurred:", err);
    }
    
})

route.get('/FrequentlyUsed', async function (req, res) {
    var docs;
   

    var id_user = req.session.id_user;
    try {
        const  rows = await db.dbFrequentlyOpenedDocuments(id_user);
        if (rows.length > 0) {
            docs = rows;
            
            
        }
    } catch (err) {
        console.error("Error occurred:", err);
    }
    res.json(docs);

})
route.get('/getpath/:nom_doc', async function (req, res) {
    const nom_doc = req.params.nom_doc;
    try {
       const path = await db.dbGetPath(nom_doc);
    
   

       res.json(path[0].path.replace(".",""));
    } catch (err) {
        console.error("Error occurred:", err);
    }
})
route.get('/MyDocumentsList', async function (req, res) {
    var docs;
    const id_user = req.session.id_user;
   const roles=req.session.role;
   console.log(roles)
  if(roles=="user"){
        const rows = await db.dbMyDocuments(id_user);
        docs = rows;
        if (rows.length > 0) {
            docs = rows;
              res.json(docs);
        }else{
            res.render('./MyDocuments',{
                "message":"u dont have any documents"
            })
        }}else if(roles=="responsable"){
            const rows = await db.dbAllDocs();
          
          if (rows.length > 0) {
            docs = rows;
              res.json(docs);
          }
  


  
}});
route.post('/diffuser', async function (req, res) {
    console.log(req.body);
const nom_doc= req.body.nom_doc;
    const target =  req.body.target ;
    console.log(nom_doc,target);
    // Ensure targets is an array
    if (!Array.isArray(target)) {
        res.status(400).json({ error: 'Target must be an array' });
    }else{
    // Iterate over targets and perform necessary actions
    for (const targe of target) {
        await db.dbIdReciever(targe, nom_doc);
    }
    // Respond with success
    res.status(200).json({ success: true });}
});
route.get('/Previleges/:nom_doc', async function (req, res) {
    const nom_doc = req.params.nom_doc;
    const id_user = req.session.id_user;
    try {
        const  rows = await db.dbGetPrevileges(id_user,nom_doc);
        res.json(rows)
    } catch (err) {
        console.error("Error occurred:", err);
    }
   })




route.post('admin/add', adminFonctionalities.acceptUser);
route.get('admin/validation', adminFonctionalities.getUsers);




module.exports = route
