const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const http = require('http');
const multer = require('multer');
const uuid = require('uuid/v4');
const path = require('path');

const { mongoose } = require('./database');
const server = http.createServer(app);
const hand = require('./socket.hanlder')

// Settings
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'public')))

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.static(__dirname+'public'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.resolve('./uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({storage: storage}).single('file'));

// Routes
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/activities', require('./routes/activity.routes'));
app.use('/api/crypto', require('./routes/crypto.routes'));
app.use('/api/files', require('./routes/file.routes'));
app.use('/api/pdfs', require('./routes/pdf.routes'));
/*app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});*/

//  Static files
app.use(express.static(path.resolve('./')));

// Starting the server
server.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    const socketIO = require('socket.io');
    const io = socketIO(server);
    hand(io);
});