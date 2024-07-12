const express = require("express")

const route = express.Router()

const db = require('../db/db')



route.get('/', async (req, res) => {
    // Check if the user is authenticated


    const nom = req.session.nom;
    const prenom = req.session.prenom;
    const email = req.session.email;
    

    try {
        
        // Query to get the count of documents
        const numDocuments = await db.dbCountDocAdded(req.session.id_user);

        const data = {
            username: nom + " " + prenom,
            email: email,
            document_rec_add: numDocuments
        };

        
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send("An error occurred while fetching document count.");
    }
});

module.exports = route;