// import mongoose, { model } from 'mongoose';
import mongoose from 'mongoose';
//const { Schema, model } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  isAdmin: { type: Boolean, default:false, required: true},
  cart: { type: Array, default: [], required: false },
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.models.User || mongoose.model('User', userSchema);