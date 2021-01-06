const mongoose = require('mongoose');

const questSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    owner : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'player' },
    name : { type : String, required : true },
    data : { type : String },
    objectives : { type : String },
});

module.exports = mongoose.model('quest', questSchema);
