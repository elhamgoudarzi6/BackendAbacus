const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TypeSchema = new Schema({
    type_name:  { type: String, required: true },
    user_id: { type: String, required: true },
});
module.exports = mongoose.model('Type', TypeSchema);
