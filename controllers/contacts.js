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


module.exports = {
    getAll,
    getSingle
};