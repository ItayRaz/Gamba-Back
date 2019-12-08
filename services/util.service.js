'use strict';

module.exports = {
    getRandomId,
    saveToStorage,
    loadFromStorage,
    updateTimestamp
}


function updateTimestamp(timeStamp, updateBy, toTime = Date.now()) {
    timeStamp += updateBy;
    if (timeStamp < toTime) timeStamp = updateTimestampToBy(timeStamp, updateBy, toTime);
    return timeStamp;
}

function getRandomId() {
    var pt1 = Date.now().toString(16);
    var pt2 = getRandomInt(1000, 9999).toString(16);
    var pt3 = getRandomInt(1000, 9999).toString(16);
    return `${pt3}${pt1}${pt2}`.toUpperCase();
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    let data = JSON.parse(localStorage.getItem(key));
    if (data) return data;
    else return false;
}


function getRandomInt(num1, num2) {
    var maxNum = (num1 > num2)? num1+1 : num2+1;
    var minNum = (num1 < num2)? num1 : num2;
    var randomNumber = (Math.floor(Math.random()*(maxNum - minNum)) + minNum);
    return randomNumber;
}