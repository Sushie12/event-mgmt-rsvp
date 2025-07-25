const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  rsvps: [String] 
});

module.exports = mongoose.model('Event', EventSchema);
