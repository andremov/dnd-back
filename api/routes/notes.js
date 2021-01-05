const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/notes');

router.get('/', async ( req, res ) => {
    Note.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error : err });
        })
});

router.post('/', async ( req, res ) => {
    const player = new Note({
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
    Note.find({ owner : id }).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    })
});

router.get('/:id', async ( req, res ) => {
    let id = req.params.id;
    Note.findById(id).exec().then(doc => {
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
    Note.update({ _id : id }, { ...req.body }).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error : err
        });
    })
});

router.delete('/:id', async ( req, res ) => {
    let id = req.params.id;
    Note.deleteOne({ _id : id }).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            message : err
        });
    });
});

module.exports = router;
