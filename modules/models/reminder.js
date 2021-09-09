const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReminderSchema = new Schema({
    title:  { type: String, required: true },
    user_id: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    repeat: { type: String},
    image: { type: String},
    type: { type: String},
});
module.exports = mongoose.model('Reminder', ReminderSchema);
