const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategoryIncomeSchema = new Schema({
    category_name: { type: String, required: true},
    user_id: { type: String, required: true },
},{toJSON:{virtuals:true}});
CategoryIncomeSchema.virtual('SubCategoryIncome',{
    ref:'SubCategoryIncome',
    localField:'_id',
    foreignField:'category_id',
});
module.exports = mongoose.model('CategoryIncome', CategoryIncomeSchema);
