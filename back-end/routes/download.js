
const express = require("express")
const mysql = require('mysql2')
const route = express.Router()
const session=require('../application')
const fs = require('fs');
const path = require('path');
const db = require('../db/db');


route.get('/:documentId', async (req, res) => {
    // Retrieve document metadata from the database based on the document ID
    const documentId = req.params.documentId;
    const id_user= req.session.id_user;
  
    let result;
console.log(req.params.documentId)
    try {
        const rows= await db.dbDownloadDocument(id_user,documentId);
        result = rows[0]; // Assuming only one document will match the ID
    } catch (err) {
        console.error("Error occurred while fetching document metadata:", err);
        return res.status(500).send('Internal Server Error');
    }
  
    
    if (!result) {
        console.log(result)
        return res.status(404).send('Document not found');
    }

    
    // Construct the file path from the document metadata
    const filePath = path.join(result.path, result.nom_doc);
   
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
       
        return res.status(404).send('File not found');
       
    }
   
    // Set the appropriate headers for the file download
    res.setHeader('Content-disposition', `attachment; filename=${result.nom_doc}`);
    res.setHeader('Content-type', result.type); // Adjust based on the actual file type

    // Create a read stream from the file and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    console.log(fileStream)
    fileStream.on('error', (err) => {
        console.error("Error occurred while reading file:", err);
        res.status(500).send('Internal Server Error');
    });
    fileStream.pipe(res);
});

module.exports = route