const express = require("express");
const route = express.Router();
const db = require('../db/db');

let formData = {}; // Define a variable to store form data

// POST route to handle form submission
route.post('/post', async function (req, res) {
    formData = req.body; // Store the form data
    console.log(req.body);
    res.sendStatus(200); // Send a success response
});

// GET route to fetch search results
route.get('/get', async function (req, res) {
    const nom_doc = formData.nom_doc;
    const type = formData.type;
    const keywords = formData.keywords;

    try {
        const rows = await db.dbSearch(nom_doc, type, keywords);
        console.log(rows);
            res.json(rows); // Send the search results as JSON
     
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
























module.exports = route