const mongoose = require('mongoose');

const spellSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    owner : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'player' },
    name : { type : String, required : true },
    quantity : { type : Number, min : 1 },
    data : { type : String }
});

module.exports = mongoose.model('spell', spellSchema);
