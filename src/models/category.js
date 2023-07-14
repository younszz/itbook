import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  value: { type: Array, required: true },
});

export default mongoose.model('Category', categorySchema);