const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    owner : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'player' },
    name : { type : String, required : true },
    data : { type : String }
});

module.exports = mongoose.model('note', noteSchema);
