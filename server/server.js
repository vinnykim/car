const {DB,Test} = require('./modules')
const express = require('express') // Express framework for building APIs
const cors =require('cors')
const connectDB = require('./config/db')
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

let unirest = require('unirest');
// Create an instance of the Express application
const app = express();

const urli = ""
//initialize the WebSocket server instance
const wss = {}

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

connectDB()

// Enable Cross-Origin Resource Sharing for handling requests from different origins
app.use(cors(corsOptions));


// Parse incoming request bodies as JSON
app.use(express.json());
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

app.use('/api/models/user', require('./routes/models'))

app.use('/api/models/request', require('./routes/requests'))
app.use('/api/request', require('./routes/requests'))
app.use('/api/models/admin', require('./routes/main'))
app.use('/api/models/admin2', require('./routes/admin2'))
app.use('/api/transaction', require('./routes/transactions'))

app.use(express.static(path.join(__dirname, 'files/')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'files/admin.html'));
})



const Port = 8081
// Start the Express server and listen on port 8081

app.listen(Port, '0.0.0.0',console.log(`listening on port :${Port}`));