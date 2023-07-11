import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  isAdmin: { type: Boolean, default:false, required: true},
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ] 
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema);