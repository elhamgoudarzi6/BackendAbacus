const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategoryCostSchema = new Schema({
    category_name: { type: String, required: true },
    user_id: { type: String, required: true },
},{toJSON:{virtuals:true}});
CategoryCostSchema.virtual('SubCategoryCost',{
    ref:'SubCategoryCost',
    localField:'_id',
    foreignField:'category_id',
});
module.exports = mongoose.model('CategoryCost', CategoryCostSchema);
