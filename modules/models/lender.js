const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LenderSchema = new Schema({
    lender_name:  { type: String, required: true },
    user_id: { type: String, required: true },
    acount_num: { type: String, required: true },
    card_num: { type: String, required: true },

});
module.exports = mongoose.model('Lender', LenderSchema);
