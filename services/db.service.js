'use strict';

const MongoClient = require('mongodb').MongoClient;

// const dbURL  =  'mongodb://localhost:27017'
/*
mongodb+srv://gerti:gerti764@cluster0-na2km.mongodb.net/test?retryWrites=true&w=majority*/

// const dbURL = (false && process.env.NODE_ENV === 'production')? 
//     'mongodb+srv://paz:9imG%40Y4feHeDqyh@cluster0-na2km.mongodb.net/test?retryWrites=true&w=majority'
//     : 'mongodb://localhost:27017';

const dbURL = 
    'mongodb+srv://paz:9imG%40Y4feHeDqyh@cluster0-na2km.mongodb.net/test?retryWrites=true&w=majority'

    // 9imG@Y4feHeDqyh
module.exports = {
    getCollection
}

// Database Name
const dbName = 'gamba';

var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(dbURL, {useNewUrlParser: true});
        // const client = await new MongoClient(dbURL, {useNewUrlParser: true});
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch(err) {
        throw err;
    }
}