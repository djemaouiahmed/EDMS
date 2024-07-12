const express = require("express");
const route = express.Router();
const db = require('../db/db');


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

module.exports = route