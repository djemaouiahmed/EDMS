const express = require("express")
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2')
const db = require('./db/db')
const allroutes = require('./routes/routes')
const FetchingRoute = require('./routes/fetching')
const cors = require('cors')



//////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use(cors({
	origin: true,  // Allow requests from all origins
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
	exposedHeaders: ['Content-disposition','Content-type'],
	
  }));
app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


////////////////////sessions init\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use(session({
	key: 'session_cookie_name',
	secret: 'key',
	store: db.sessionStore,
	resave: false,
	saveUninitialized: false,
}));

db.sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});

////////////////////////////fichier des document js et css et autre\\\\\\\\\\\\\\\\\\\\\\\\\
const path = require("path");
const publicDir = path.join(__dirname, 'public');  
app.use(express.static(publicDir));

////////////////////////pages routes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.use(allroutes, FetchingRoute);



app.get('/pdfs/*', (req, res) => {
	const filePath = req.params[0];
	const fullPath = path.join(__dirname, filePath);

	res.setHeader('Content-Type', 'application/pdf');
	
	res.sendFile(fullPath);
  });
///////////////////////////////////fetching\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




/////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 
