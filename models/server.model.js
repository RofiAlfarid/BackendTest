const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AccountSchema = new Schema({
    userName: {type: String, required: true, max: 100},
    accountNumber: {type: Number, required: true},
    emailAddress:{type: String},
    identityNumber:{type: String}
});

module.exports = mongoose.model('Account', AccountSchema);