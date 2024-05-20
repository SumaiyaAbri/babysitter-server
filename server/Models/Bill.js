import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  items: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

const BillModel = mongoose.model('Bill', billSchema);

export default BillModel;
