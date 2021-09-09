const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubCategoryCostSchema = new Schema({
    category_id: {type : Schema.Types.ObjectId,ref:'CategoryCost'},
    sub_category: { type: String, required: true },
    user_id: { type: String, required: true },
});
module.exports = mongoose.model('SubCategoryCost', SubCategoryCostSchema);
