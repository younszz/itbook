// import mongoose, { model } from 'mongoose';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  isAdmin: { type: Boolean, default:false, required: true},
  //cart: { type: Array, default: [], required: false },
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

//카트 데이터 가져오고 수정. 
userSchema.methods.addToCart = async function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }

  this.cart = {
    items: updatedCartItems
  };

  try {
    await this.save();
  } catch (err) {
    console.error(err);
  }
};

//removeFromCart
userSchema.methods.removeFromCart = async function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;

  try {
    await this.save();
  } catch (err) {
    console.error(err);
  }
};

//clearCart
userSchema.methods.clearCart = async function() {
  this.cart = { items: [] };
  
  try {
    await this.save();
  } catch (err) {
    console.error(err);
  }
};

// module.exports = mongoose.model('User', userSchema);
export default mongoose.models.User || mongoose.model('User', userSchema);