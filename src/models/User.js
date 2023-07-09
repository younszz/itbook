import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  isAdmin: { type: Boolean, default:false, required: true},
  cart: { type: Array, default: [], required: false },
});

module.exports = mongoose.model('User', userSchema);
