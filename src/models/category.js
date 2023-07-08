import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  value: { type: Array, required: true },
});

module.exports = mongoose.model('Category', categorySchema);