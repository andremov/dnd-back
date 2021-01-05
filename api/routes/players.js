const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Player = require('../models/players');
const Item = require('../models/items');
const Spell = require('../models/spells');
const Quest = require('../models/quests');
const Note = require('../models/notes');

router.get('/', async ( req, res ) => {
    Player.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error : err });
        })
});

router.post('/', async ( req, res ) => {
    const player = new Player({
        ...req.body,
        _id : new mongoose.Types.ObjectId(),
    });
    player.save()
        .then(() => {
            res.status(200).json({ message : 'Success!' });
        }).catch(err => {
        res.status(500).json({
            error : err
        });
    })
});

router.get('/find', async ( req, res ) => {
    let codename = req.query.codename;
    Player.findOne({ codename }).select('_id').exec().then(doc => {
        if ( doc ) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message : 'Product not found.'
            });
        }
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    })
});

router.get('/all-data/:id', async ( req, res ) => {
    let id = req.params.id;
    
    let player_data = await Player.findById(id).exec()
        .then(doc => {
            if ( doc ) {
                return doc
            } else {
                res.status(404).json({
                    message : 'Player not found.'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        })
    
    let player_items = await Item.find({ owner : id }).exec()
        .then(doc => {
            return doc
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        })
    
    let player_spells = await Spell.find({ owner : id }).exec()
        .then(doc => {
            return doc
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        })
    
    let player_quests = await Quest.find({ owner : id }).exec()
        .then(doc => {
            return doc
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        })
    
    let player_notes = await Note.find({ owner : id }).exec()
        .then(doc => {
            return doc
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        })
    
    res.status(200).json({ player_data, player_items, player_spells, player_quests, player_notes });
});

router.get('/single/:id', async ( req, res ) => {
    let id = req.params.id;
    Player.findById(id).exec().then(doc => {
        if ( doc ) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message : 'Product not found.'
            });
        }
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    })
});

router.patch('/:id', async ( req, res ) => {
    let id = req.params.id;
    Player.update({ _id : id }, { ...req.body }).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    })
});

router.delete('/:id', async ( req, res ) => {
    let id = req.params.id;
    Player.deleteOne({ _id : id }).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            message : err
        });
    });
});

router.get('/others', async ( req, res ) => {
    Player.find()
        .select('_id name family')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error : err });
        })
});

module.exports = router;
