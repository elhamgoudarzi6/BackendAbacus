const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String ,default:'تکمیل نشده'},
    city: { type: String ,default:'تکمیل نشده'},
    age: { type: String ,default:'تکمیل نشده'},
    major: { type: String,default:'تکمیل نشده' },
    gender: { type: String,default:'تکمیل نشده' },
    image: { type: String ,default:'تکمیل نشده'},

});
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('User', UserSchema);
