const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const initializeDatabase = require('./db');
const errorHandler = require('./middlerware/error-handler');
const usersRouter = require('./routes/users.route');
const path = require('path');
const app = express();
const morgan = require('morgan');
require('./config')();

const port = process.env.PORT || 4000;


app.use(morgan('combined'));
app.use(express.json({}));
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
    app.get('*', function (req, res) {
        console.log(path.resolve(__dirname,'public', 'index.html'));
        res.sendFile(path.resolve(__dirname,'public', 'index.html'));
    });
}

app.use('/api/users', usersRouter);

app.use(errorHandler);

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
    initializeDatabase();
    app.listen(port, () => console.log(`Server started successfully listening to port:${port}`));
}

module.exports = app; // needed for testing;
