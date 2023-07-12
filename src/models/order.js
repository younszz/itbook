import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productData: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientContact: { type: String, required: true },
  deliveryStatus: { type: String, default: '상품 준비중', required: true },
});

export default mongoose.model('Order', orderSchema);