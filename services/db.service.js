// 'use strict';

// const MongoClient = require('mongodb').MongoClient;

// const dbURL  =  'mongodb://localhost:27017'

// module.exports = {
//     getCollection
// }

// // Database Name
// const dbName = 'evento';

// var dbConn = null;

// async function getCollection(collectionName) {
//     const db = await connect()
//     return db.collection(collectionName);
// }

// async function connect() {
//     if (dbConn) return dbConn;
//     try {
//         const client = await MongoClient.connect(dbURL, {useNewUrlParser: true});
//         const db = client.db(dbName);
//         dbConn = db;
//         return db;
//     } catch(err) {
//         console.log('Cannot Connect to DB', err)
//         throw err;
//     }
// }