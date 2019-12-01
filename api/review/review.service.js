'use strict';

const fs = require('fs');

const utils = require('../../services/util.service.js');

module.exports = {
    query,
    get,
    remove,
    save,
}

function get(_id) {
    return _createReviews()
        .then(reviews => {
            var review = reviews.find(review => review._id === _id);
            if (review) return Promise.resolve(review);
            else return Promise.reject('something went wrong');
        })
}

function save(review) {
    return _createReviews()
        .then(reviews => {
            if (review._id) {
                var idx = reviews.findIndex(currReview => currReview._id === review._id);
                if (idx !== -1) {
                    reviews.splice(idx, 1, review);
                }
            } else {
                review._id = utils.getRandomId();
                reviews.unshift(review);
            }
            _saveReviewsToFile(reviews);
            return Promise.resolve(review);

        })
}

function remove(_id) {
    return _createReviews()
        .then(reviews => {
            var idx = reviews.findIndex(review => review._id === _id);
            if (idx !== -1) {
                reviews.splice(idx, 1);
                _saveReviewsToFile(reviews);
                return Promise.resolve(_id);
            }
            else return Promise.reject('review not found, could not delete');
        })
}

function query(filterBy = {}) {
    return _createReviews()
        .then(reviews => {
            return getReviewsToSend(reviews, filterBy);
        })
        .catch(err => Promise.reject('could not get reviews'))
}

function getReviewsToSend(reviews, filterBy = {}) {
    var reviewsToSend = [...reviews];

    if (filterBy.searchStr) reviewsToSend = reviewsToSend.filter(review => review.name.toLowerCase().includes(filterBy.searchStr.toLowerCase()));
    if (filterBy.reviewerId) reviewsToSend = reviewsToSend.filter(review => review.reviewerId === filterBy.reviewerId);
    if (filterBy.aboutId) reviewsToSend = reviewsToSend.filter(review => review.aboutId === filterBy.aboutId);
    
    return reviewsToSend;
}

function _createReviews() {
    return _loadReviewsFromFile()
        .then(reviews => {
            if (!reviews || reviews.length === 0) {
                reviews = _someReviews;
                _saveReviewsToFile(reviews);
            };
            return reviews;
        })
}

function _saveReviewsToFile(reviews) {
    fs.writeFileSync('data/review.json', JSON.stringify(reviews, null, 2));
}

function _loadReviewsFromFile() {
    return Promise.resolve(require('../../data/review.json'));
}

var _someReviews = [
    {
        txt: 'some review',
        _id: '12345',
        reviewerId: '12345',
        aboutId: '123'
    },
    {
      txt: 'another review',
      _id: '123456',
      reviewerId: '123',
      aboutId: '12345'
    }
] 