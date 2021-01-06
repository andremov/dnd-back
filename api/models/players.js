const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type : String, required : true },
    family : { type : String },
    codename : { type : String, required : true, unique : true },
    
    alignment : { type : Number, required : true },
    char_class : { type : Number, required : true },
    race : { type : Number, required : true },
    height : { type : Number, required : true },
    age : { type : Number, required : true },
    
    level : { type : Number, required : true, default : 1 },
    hit_points : { type : Number, required : true },
    max_hit_points : { type : Number, required : true },
    stats : { type : String, required : true },
    
    background : { type : String },
    armor_class : { type : Number, default : 0 },
    attack_dice_sides : { type : Number, default : 2 },
    attack_dice_number : { type : Number, default : 1 }
});

module.exports = mongoose.model('player', playerSchema);
