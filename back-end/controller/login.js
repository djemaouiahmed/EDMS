
const bcrypt = require('bcrypt');

 
const { dbFindUserByEmail, dbInsertUser, dbCheckVerified} = require('../db/db');
const { verify } = require('jsonwebtoken');




async function login (req, res) {

  const login = req.body

 

console.log(login.loguser,login.logpass)
  
  if (login.loguser == null || login.logpass == null) {
    return res.status(422)
  }
 

  const results = await dbFindUserByEmail(login.loguser);
  const responseBody = {
  results : results
  }
  console.log(login.loguser)
  const verified = await dbCheckVerified(login.loguser)
  
     if (results.length == 0) {console.log("not found")
   
res.status(422).json(responseBody)
    }


      else{ if (verified[0].verified === 0)
        {

          res.status(422).json(verified[0].verified)
          
        }
        else{
     const valid =  await bcrypt.compare(login.logpass, results[0].password);
     if( valid ){req.session.id_user = results[0].id_user;
      req.session.nom =results[0].nom;
      req.session.prenom =results[0].prenom;
      req.session.role=results[0].roles; console.log(req.session) ;res.json("Success")}


     else{console.log("wrong Password");res.status(422).json(responseBody)}
     
      }
    }
    };


      async function register (req, res) {

        const register = req.body


        if (register.fname == null || register.lname == null || register.email == null || register.password == null) {
          console.log(register);
          res.sendStatus(422)
        }
        let hashedPassword = await bcrypt.hash(register.password, 10);
        
         err= await dbInsertUser(register.fname,register.lname,register.email,hashedPassword);
        if (err != null) {
          
          return res.json('err')
        }
        res.json("Success");



      }


      module.exports = {login :login ,register :register}