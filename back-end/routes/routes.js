const express = require("express");
const route = express.Router();

const downloadRoute = require('./download')
const HMPAGE = require('./home_page')
const login=require('../controller/login')
const adminFonctionalities = require('../controller/adminFonctionalities')
const authenticate = require('../middleware/authenticate')
const SRHroute = require('./search')
const diffuser = require('./diffuser')

const post_docRoute = require('./post_doc');
const session = require("express-session");



route.get('/logout', (req, res) => { 
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Error destroying session");
        }
       
        res.clearCookie();
        res.redirect('/');
    });
});
route.use('/download',downloadRoute)
route.use("/post_docs", post_docRoute);
route.use('/home_page',HMPAGE)
route.use('/search',SRHroute);
route.get('/verify')
//route.use('/login',loginRoute)
///////////////////////////////////////////////////////////////////////////////
route.post('/login',login.login);
route.post('/register', login.register);
route.get('/admin' ,adminFonctionalities.admin);



route.post('/admin/del', adminFonctionalities.deleteUser);


route.post('/admin/add', adminFonctionalities.acceptUser);
route.get('/admin/modify', adminFonctionalities.getAcceptedUsr);
route.get('/admin/validation', adminFonctionalities.getUsers);

route.get('/admin/info',adminFonctionalities.getInfo);
route.post('/admin/update',adminFonctionalities.UpdateUser);

/////////////////////////////////////////////////////////////////////////////
module.exports = route