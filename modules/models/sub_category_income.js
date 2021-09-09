const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubCategoryIncomeSchema = new Schema({
    category_id: {type : Schema.Types.ObjectId,ref:'CategoryIncome'},
    sub_category: { type: String, required: true },
    user_id: { type: String, required: true },
});
module.exports = mongoose.model('SubCategoryIncome', SubCategoryIncomeSchema);
