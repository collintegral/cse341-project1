const { application } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

let userController = {};

userController.getAll = async (req, res) => {
    await mongodb.getDatabase()
    .db()
    .collection('users')
    .find()
    .toArray((err, lists) => {
        if (err) {
            res.status(404).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

userController.getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    await mongodb.getDatabase()
    .db()
    .collection('users')
    .find({_id: userId})
    .toArray((err, result) => {
        if (err) {
            res.status(404).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
}

userController.createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the user.')
    }
}

userController.updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the user.')
    }
}

userController.deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the user.')
    }
}

module.exports = userController;