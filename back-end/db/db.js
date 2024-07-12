
const mysql = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dotenv = require('dotenv');
dotenv.config({ path: '.env.database' }); // Load environment variables from .env file
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const sessionStore = new MySQLStore({
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
    },
    expiration: 86400000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});















////////////////////////querys\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

async function dbCountDocAdded(id_user) {
    try {
        const con = await pool.getConnection();
        const [result] = await con.query('SELECT COUNT(*) AS num FROM table_document WHERE id_user_source = ?', [id_user]);
        con.release();
        return result[0].num;
    } catch (error) {
        console.error( error);
        throw error; // Rethrow the error for the calling function to handle
    }
}

async function dbListDocuments(id_user) {
    try {
        const con = await pool.getConnection();
        const sql = `SELECT nom, prenom, id_user_fk, id_user_source, date_time, nom_doc 
                     FROM (
                         SELECT id_user_fk, id_user_source, date_time, table_document.nom_doc 
                         FROM table_previlege 
                         JOIN table_document ON table_document.nom_doc = table_previlege.nom_doc 
                         WHERE table_previlege.id_user_fk = ?
                     ) AS subquery 
                     JOIN user ON user.id_user = subquery.id_user_source;`;
        const [result] = await con.query(sql, [id_user]);
        con.release();
        return result;
    } catch (error) {
        console.error( error);
        throw error; // Rethrow the error for the calling function to handle
    }
}

async function dbDownloadDocument(id_user, documentId) {
    try {
        const con = await pool.getConnection();
        const sql = 'SELECT * FROM ged.table_previlege JOIN table_document ON table_document.nom_doc = table_previlege.nom_doc WHERE table_previlege.id_user_fk = ? AND table_document.nom_doc = ?;';
        const [result] = await con.query(sql, [id_user, documentId]);
      
        con.release();
        return result;
    } catch (error) {
        console.error( error);
        throw error; // Rethrow the error for the calling function to handle
    }
}
async function dbUploadDocument(id_user, filename, type, path, mot, formattedDateTime,comment,realname) {
    try {
        const con = await pool.getConnection();
   var query = `INSERT INTO table_document (nom_doc, type, path, date_time,mot_1,mot_2,mot_3,mot_4,mot_5,id_user_source,commentaire,real_name) VALUES ('${filename}', '${type}', '${path}', '${formattedDateTime}','${mot[0]}','${mot[1]}','${mot[2]}','${mot[3]}','${mot[4]}','${id_user}','${comment}','${realname}')`;
        await con.execute(query);
        con.release();
      return "Success"
    } catch (error) {
       console.log(error)
        return "Duplicate"
   
    }
}

async function dbIdReciever(target, filename) {
    
    try {
        const con = await pool.getConnection();
 console.log(target)
        await con.execute('INSERT INTO table_previlege(id_user_fk,nom_doc,download,upload,print,comment)VALUE(?,?,?,?,?)',[target.id,filename,target.download,target.upload,target.print,target.comment]);
        con.release();
         
       
    } catch (error) {
        console.error( error);
        return "fail"
        throw error; // Rethrow the error for the calling function to handle
    }
}

async function dbListUsers(id_user) {
    try {
        const con = await pool.getConnection();
      var sql =  'SELECT * FROM user WHERE not id_user = ?';
        const [result] = await con.query(sql, [id_user]);
        con.release();
        return result;
    } catch (error) {
        console.error( error);
    }
}
async function dbInsertUser (fname,lname,Email,password) {
    const con = await pool.getConnection();
 try {
    await con.execute("insert into user (prenom,nom,email,password) values(?,?,?,?)",[fname,lname,Email,password])}
    catch(err){return err}
con.release();

 }


async function dbVerifyDocument(id_user, documentId) {
    try {
        const con = await pool.getConnection();
        const sql = 'UPDATE table_document SET isVerfied =1 WHERE id_user_source = ? AND nom_doc = ?;';
        await con.execute(sql, [id_user, documentId]);
        con.release();
    } catch (error) {
        console.error( error);
        throw error; // Rethrow the error for the calling function to handle
    }
}

 async function dbFindUserByEmail(email) {
     
    const con = await pool.getConnection();

   
    
   
  const [results] = await con.query("select * from user where email = ?",[email]);
  con.release(); 
    return results
 }

 async function dbGetUserEmailById(id ) {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT email FROM user WHERE id_user = ?', [id]);
    return results
 }



 async function dbGetUnaceeptedUsers() {
    const con = await pool.getConnection();
    var sql = "select id_user ,email,prenom ,nom from user where accepted = 0";   
   const [results] = await con.query(sql);
   con.release();
   return results

 }
////////////////////////////////////////////////
 async function dbDelUserById(id) {
   
    const con = await pool.getConnection();
    const sql = "DELETE FROM user WHERE id_user = ?";
  await con.execute(sql, [id]);
  con.release();
 }
/////////////////////////////////////////////////////////
async function dbVerifyUserByID (id) {
    const con = await pool.getConnection();
   await con.execute( 'UPDATE user SET verified = ? WHERE id_user = ?',
    [1, id])
    con.release();
  } 
async function dbAddPrevileges(id,diffuse,upload,download,print,roles) {
const con = await pool.getConnection();
await con.execute('UPDATE user SET diffuse = ? ,upload = ? ,download = ?, print = ?, roles = ?, accepted=? WHERE id_user = ?',[diffuse,upload,download,print,roles,1,id])
con.release();
}
async function dbCheckVerified (email)
{
    const con = await pool.getConnection();
    const [results] = await con.query('SELECT verified FROM user WHERE email = ?', [email]);
    con.release();
    return results
}
async function dbGetCount() {
    const con = await pool.getConnection();
    var sql = "SELECT COUNT(*) AS accepted_users FROM user WHERE accepted = 1;";   
   const ver = await con.query(sql);
   var sql2 = "SELECT COUNT(*) AS unaccepted_users FROM user WHERE accepted = 0;";   
const unver = await con.query(sql2);
   con.release();
   return [ver[0],unver[0]]

 }
 async function dbVerifyUserByID (id,upload,print,download) {
    const con = await pool.getConnection();
   await con.execute( 'UPDATE user SET upload = ?, print = ?, download = ? WHERE id_user = ?',
    [upload, print, download, id])
    con.release();
  } 
  async function dbGetAcceptedUsers() {
    const con = await pool.getConnection();
    var sql = "select id_user ,email,prenom ,nom,upload,diffuse,print,download,roles,verified from user where accepted = 1";   
   const [results] = await con.query(sql);
   con.release();
   return results
  }
  async function dbSearch(name, type, keyword) {
    const con = await pool.getConnection();
    try {
          let query = `SELECT * FROM table_document WHERE 1`;

    // Add conditions based on the provided search criteria
    if (name) {
        query += ` AND nom_doc LIKE '${name}%'`;
    }
    if (type) {
        query += ` AND type LIKE '%${type}%'`;
    }
    if (keyword) {
        query += ` AND (mot_1 LIKE '%${keyword}%' OR mot_2 LIKE '%${keyword}%' OR mot_3 LIKE '%${keyword}%' OR mot_4 LIKE '%${keyword}%' OR mot_5 LIKE '%${keyword}%')`;
    }
        const [result] = await con.query(query);
        con.release();
        return result;
    } catch (error) {
        console.error( error);
        throw error; // Rethrow the error for the calling function to handle
    }
}
async function dbListDocumentsNV() {
    try {
        const con = await pool.getConnection();
        const sql = `SELECT user.nom, user.prenom, id_user_source, date_time, nom_doc,commentaire,path
                     FROM table_document
                     JOIN user ON   table_document.id_user_source = user.id_user WHERE table_document.isVerfied = 0;`;
        const [result] = await con.query(sql);
        con.release();
        return result;
    } catch (error) {
        console.error( error);
        throw error; // Rethrow the error for the calling function to handle
    }
}


async function dbListDocumentsReceved(id_user) {
    try {
        const con = await pool.getConnection();
        const sql = `SELECT nom, prenom, id_user_fk, id_user_source, date_time, nom_doc,commentaire,path
                     FROM (
                         SELECT id_user_fk, id_user_source, date_time, table_document.nom_doc ,commentaire ,path
                         FROM table_previlege 
                         JOIN table_document ON table_document.nom_doc = table_previlege.nom_doc 
                         WHERE table_previlege.id_user_fk = ? AND table_document.isVerfied = 1
                     ) AS subquery 
                     JOIN user ON user.id_user = subquery.id_user_source;`;
        const [result] = await con.query(sql, [id_user]);
        con.release();
        return result;
    } catch (error) {
        console.error( error);
        throw error; // Rethrow the error for the calling function to handle
    }
}
async function dbFrequentlyOpenedDocuments(userId) {
    try {
        // Execute a query to get frequently opened documents for the user
        const query = `      
                SELECT nom_doc, SUM(open_count) AS open_count
                FROM document_log where user_id=? AND last_opened_at >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 2 DAY)
                GROUP BY nom_doc
                ORDER BY open_count DESC
                LIMIT 10; -- Limit to top 10 frequently opened documents
                        `;   const [rows, fields] = await pool.query(query, [userId]);

        // Process the query result and return the data
        const frequentlyOpenedDocs = rows.map(row => ({
            documentName: row.nom_doc,
            openCount: row.open_count,
            path: row.path
        }));
        return frequentlyOpenedDocs;
    } catch (error) {
        console.error("Error occurred while fetching frequently opened documents:", error);
        throw error;
    }
}

async function dbDocumentLog(nom_doc, id_user) {
    const con = await pool.getConnection();
    try {
        // Check if the row already exists
        const [rows] = await con.query(`SELECT * FROM document_log WHERE nom_doc = ? AND user_id = ?`, [nom_doc, id_user]);
        
        if (rows.length > 0) {
            // If the row exists, update the open_count
            await con.execute(`UPDATE document_log SET open_count = open_count + 1 WHERE nom_doc = ? AND user_id = ?`, [nom_doc, id_user]);
        } else {
            // If the row doesn't exist, insert a new row
            await con.execute(`INSERT INTO document_log (nom_doc, user_id, open_count) VALUES (?, ?, 1);`, [nom_doc, id_user]);
        }
    } catch (error) {
        console.error("Error occurred while updating or inserting document log:", error);
        throw error;
    } finally {
        con.release();
    }
}

async function dbGetPath(nom_doc) {
    const con = await pool.getConnection();
    try {
        const sql = `SELECT path FROM table_document WHERE nom_doc = ?  `;
        const [result] = await con.query(sql, [nom_doc]);
        con.release();
        return result;
    } catch (error) {
        console.error( error);
        throw error; // Rethrow the error for the calling function to handle
    }
}


async function dbAllDocs() {
    try {
        const con = await pool.getConnection();
        const sql = 'SELECT * FROM table_document JOIN user ON table_document.id_user_source = user.id_user ;';
        const [result] = await con.query(sql);
       
        con.release();
        return result;
    }catch (error) {
        console.error( error);
        throw error; // Rethrow the error for the calling function to handle
    }}


    async function dbGetPrevileges(id_user, nom_doc) {
        try {
            const con = await pool.getConnection();
            const sql = `SELECT * FROM table_previlege WHERE id_user_fk = ? AND nom_doc = ?;`;
            const [result] = await con.query(sql, [id_user, nom_doc]);
            con.release();
            return result;
        } catch (error) {
            console.error( error);
            throw error;
        }
        
    }
    async function dbPermaPrevileges(id_user) {
        try {
            const con = await pool.getConnection();
            const sql = `SELECT download, upload,roles, print,diffuse FROM user WHERE id_user = ?;`;
            const [result] = await con.query(sql, [id_user]);
            con.release();
            return result;
        } catch (error) {
            console.error( error);
            throw error;
        }
    }
    async function dbGetUserNameById(id_user) {
        const con = await pool.getConnection();
        const [results] = await con.query('SELECT nom, prenom FROM user WHERE id_user = ?', [id_user]);
        con.release();
        return results;
    }
module.exports = {dbGetUserNameById,dbPermaPrevileges ,dbGetPrevileges,dbAllDocs, dbGetPath, dbListDocumentsReceved,dbCountDocAdded,dbListDocumentsNV,dbVerifyDocument, dbListDocuments, dbDownloadDocument , dbUploadDocument , dbListUsers,dbIdReciever,sessionStore,dbInsertUser,dbFindUserByEmail,dbGetUserEmailById,dbGetUnaceeptedUsers,dbDelUserById,dbVerifyUserByID,dbCheckVerified,dbAddPrevileges,dbGetCount,dbGetAcceptedUsers,dbSearch,dbDocumentLog,dbFrequentlyOpenedDocuments};
