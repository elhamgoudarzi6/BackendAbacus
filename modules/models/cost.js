const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CostSchema = new Schema({
    user_id: { type: String, required: true },
    day:{ type: String, required: true },
    month:{ type: String, required: true },
    year:{ type: String, required: true },
	 date:{ type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String, required: true },
    amount: { type: Number, required: true },
    acount:{type:String},
    of_income: { type: String},
    detail: { type: String},
    image: { type: String},
    type:{type:String}

});
module.exports = mongoose.model('Cost', CostSchema);
