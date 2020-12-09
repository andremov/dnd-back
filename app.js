const express = require('express');
const app = express();

// LOGGING MIDDLEWARE
const morgan = require('morgan');

// BODY PARSING MIDDLEWARE
const bodyParser = require('body-parser');

// MONGODB HANDLER PACKAGE
const mongoose = require('mongoose');

// DECLARATION OF ROUTES
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(
    'mongodb+srv://andremov:'+
    process.env.MONGO_PASS+
    '@node-rest-api-test-byh61.mongodb.net/test?retryWrites=true&w=majority',
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

// CALLING ROUTES
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// NO SUCH ROUTE ERROR HANDLER
app.use((req,res,next) => {
    const error = new Error('Not found');
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
