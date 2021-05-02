const mongoose = require('mongoose');

// mongoose.set('debug', true);

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE,{ 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true 
});

module.exports.User = require('./user');
module.exports.Pool = require('./pool');
module.exports.Subject = require('./subject');