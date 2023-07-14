import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [
      {
        id: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    addressDetail: { type: String, required: true },
    deliveryStatus: { type: String, default: '상품 준비중', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
