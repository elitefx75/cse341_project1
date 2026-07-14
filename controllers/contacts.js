const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('contacts').find();
        const contacts = await result.toArray();
        res.status(200).type('json').send(JSON.stringify(contacts, null, 2));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);
        const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
        res.status(200).type('json').send(JSON.stringify(result, null, 2));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const create = async (req, res) => {
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    try {
        const result = await mongodb.getDatabase().collection('contacts').insertOne(newContact);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const update = async (req, res) => {
    const contactId = new objectId(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    try {
        const result = await mongodb.getDatabase().collection('contacts').updateOne({ _id: contactId }, { $set: updatedContact });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteContact = async (req, res) => {
    const contactId = new objectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    delete: deleteContact
};