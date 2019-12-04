'use strict';

const dbService = require('../../services/db.service.js');
const ObjectId = require('mongodb').ObjectId;


module.exports = {
    query,
    get,
    remove,
    save,
}

async function get(_id) {
    const collection = await _connectToCollection();
    try {
        var review = collection.findOne({"_id":ObjectId(_id)});
        return review;
    } catch(err) {
        throw err
    }
}

async function save(review) {
    const collection = await _connectToCollection();

    if (review._id) {
        try {
            review._d = ObjectId(review._id);
            await collection.updateOne({"_id":ObjectId(review._id)}, {$set: review});
        } catch(err) {
            throw err;
        }
    } else {
        try {
            await collection.insertOne(review);
            return review;
        } catch(err) {
            throw err;
        }
    }
}

async function remove(_id) {
    const collection = await _connectToCollection();
    try {
        return await collection.deleteOne({"_id":ObjectId(_id)});
    } catch(err) {
        throw err;
    }
}

async function query(filterBy = {}) {
    const collection = await _connectToCollection();
    try {
        // var reviews = await collection.find({}).toArray();
        var reviews = await collection.find(filterBy).toArray();
        if (!reviews || !reviews.length) {
            await collection.insert(_someReviews);
            return collection.find({}).toArray();
        }
        return reviews;
    } catch(err) {
        throw err;
    }
}

// function getReviewsToSend(reviews, filterBy = {}) {
//     var reviewsToSend = [...reviews];

//     if (filterBy.searchStr) reviewsToSend = reviewsToSend.filter(review => review.name.toLowerCase().includes(filterBy.searchStr.toLowerCase()));
//     if (filterBy.reviewerId) reviewsToSend = reviewsToSend.filter(review => review.reviewer._id === filterBy.reviewerId);
//     if (filterBy.aboutId) reviewsToSend = reviewsToSend.filter(review => review.aboutId === filterBy.aboutId);
    
//     return reviewsToSend;
// }


async function _connectToCollection() {
    return await dbService.getCollection('review');
}

var _someReviews = [
    // {
    //     txt: 'some review',
    //     // _id: '123425',
    //     reviewer: {
    //         // _id: '12345',
    //         name: 'Aviv',
    //         img: 'https://api.adorable.io/avatars/285/aviv.png'
    //     },
    //     // aboutId: '123'
    // },
    // {
    //   txt: 'another review',
    // //   _id: '123456',
    //   reviewer: {
    //     //   _id: '123',
    //       name: 'Paz',
    //       img: 'https://api.adorable.io/avatars/285/paz.png'
    //     },
    // //   aboutId: '12345'
    // }
] 