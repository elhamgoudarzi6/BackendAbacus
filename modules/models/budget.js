const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BudgetSchema = new Schema({
    user_id: { type: String, required: true },
      icon: { type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String, required: true },
    amount: { type: String, required: true },
});
module.exports = mongoose.model('Budget', BudgetSchema);
