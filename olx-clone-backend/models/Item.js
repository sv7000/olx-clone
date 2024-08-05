const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['sold', 'unsold'], default: 'unsold' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: { 
    type: String 
  }
});

module.exports = mongoose.model('Item', itemSchema);

