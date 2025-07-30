import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['placed', 'processing', 'shipped', 'delivered'],
    default: 'placed'
  },
  price: { // ✅ Add this
    type: Number,
    required: true,
    default: 0
  },
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
