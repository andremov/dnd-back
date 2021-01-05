const express = require('express');
const app = express();

// LOGGING MIDDLEWARE
const morgan = require('morgan');

// BODY PARSING MIDDLEWARE
const bodyParser = require('body-parser');

// MONGODB HANDLER PACKAGE
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://andremov:'+
    process.env.MONGO_PASS+
    '@cluster0.z83fc.mongodb.net/game-1?retryWrites=true&w=majority',
    {
        // useMongoClient: true,
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
).catch(err=>{
    console.log('There was an error with connection!');
   console.log(err);
});
mongoose.Promise = global.Promise;

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// REMOVE CORS ERRORS
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// DECLARATION  OF ROUTES
const playerRoutes = require('./api/routes/players');
const itemRoutes = require('./api/routes/items');
const spellRoutes = require('./api/routes/spells');
const noteRoutes = require('./api/routes/notes');
const questRoutes = require('./api/routes/quests');

// CALLING ROUTES
app.use('/players', playerRoutes);
app.use('/items', itemRoutes);
app.use('/spells', spellRoutes);
app.use('/notes', noteRoutes);
app.use('/quests', questRoutes);


// NO SUCH ROUTE ERROR HANDLER
app.use((req,res,next) => {
    const error = new Error('Path not found');
    error.status = 404;
    next(error);
});

// ALL ERROR HANDLING
app.use((error, req,res,next) => {
    res.status(error.status || 500).json({
        error: {
            message : error.message
        }
    });
    next(error);
});

// EXPORT APP
module.exports = app;
