var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/gpt', indexRouter);
app.use('/users', usersRouter);

const PORT = 3333
const start = async () => {
    try {

        app.listen(PORT, () => {
            console.log("Server started on port ", PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
