const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ 
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        price: Number 
    }],
    subtotal: Number,
    couponDiscount: { type: Number, default: 0 },
    tax: { type: Number, default: 5 }, 
    totalAmount: Number,
    paymentMethod: { type: String, enum: ['PayPal', 'AMEX', 'Visa', 'Mastercard'] },
    cardName: String,
    status: { type: String, default: 'Success' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);