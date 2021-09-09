const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DebtSchema = new Schema({
    user_id: { type: String, required: true },
    date_debt: { type: String, required: true },
    date_giveback: { type: String, required: true },
    amount: { type: String, required: true },
    lender: { type: String, required: true },
    acount:{type:String},
    detail: { type: String},
    image: { type: String},
});
module.exports = mongoose.model('Debt', DebtSchema);
