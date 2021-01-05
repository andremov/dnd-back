const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../models/items');

router.get('/', async ( req, res ) => {
    Item.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error : err });
        })
});

router.post('/', async ( req, res ) => {
    const player = new Item({
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

router.get('/owned-by', async ( req, res ) => {
    let id = req.query.id;
    Item.find({ owner : id }).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    })
});

router.get('/:id', async ( req, res ) => {
    let id = req.params.id;
    Item.findById(id).exec().then(doc => {
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
    Item.update({ _id : id }, { ...req.body }).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    })
});

router.delete('/:id', async ( req, res ) => {
    let id = req.params.id;
    Item.deleteOne({ _id : id }).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            message : err
        });
    });
});

router.post('/trade', async ( req, res ) => {
    const { target_player, trade_data } = req.body;
    console.log(target_player)
    
    for ( let i = 0; i < trade_data.length; i++ ) {
        let item = await Item.findById(trade_data[i]._id).then(doc => {
            return doc
        })
        
        if (!item) {
            continue;
        }
        
        let target_item = {
            ...item,
            owner : target_player,
            quantity : Math.min(trade_data[i].trade_amount, item.quantity),
            _id : new mongoose.Types.ObjectId(),
        }
        target_item.save()
            .then(() => {
            })
            .catch(err => {
                res.status(500).json({
                    error : err
                });
            })
        if ( trade_data[i].trade_amount >= item.quantity ) {
            Item.deleteOne({ _id : trade_data[i]._id })
                .then(() => {
                })
                .catch(err => {
                    res.status(500).json({
                        error : err
                    });
                })
        } else {
            Item.updateOne({ _id : trade_data[i]._id }, { quantity : item.quantity - trade_data[i].trade_amount })
                .then(() => {
                })
                .catch(err => {
                    res.status(500).json({
                        error : err
                    });
                })
        }
    }
    
    res.status(200).json({ message : 'Success!' });
});

module.exports = router;
