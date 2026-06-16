const Payment = require('../../../models/Payment');
const Course = require('../../../models/Course');
const ApiResponse = require('../../../utils/ApiResponse');
const AppError = require('../../../utils/AppError');

// 1. Checkout Page ka Data Load karna
exports.getCheckoutPage = async (req, res, next) => {
    try {
        // Maan lijiye cart me ye items hain (Session se bhi le sakte hain)
        const cartItems = await Course.find().limit(2); 
        
        const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
        const tax = 5;
        const total = subtotal + tax;

        const topOffers = await Course.find({ discountPrice: { $exists: true } }).limit(3);

        return res.status(200).json(
            new ApiResponse(200, {
                summary: { cartItems, subtotal, tax, total },
                topOffers: topOffers 
            }, "Checkout data fetched")
        );
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// 2. "Confirm Payment" button click hone par logic
exports.processCheckout = async (req, res, next) => {
    try {
        const { cardName, cardNumber, paymentMethod, totalAmount, items } = req.body;

        if (!cardName || !cardNumber) {
            return next(new AppError("Please fill all card details", 400));
        }

        const newPayment = await Payment.create({
            user: req.user?._id,
            cardName,
            paymentMethod,
            totalAmount,
            items,
            status: 'Success'
        });

        return res.status(201).json(
            new ApiResponse(201, newPayment, "Payment successfully processed")
        );
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};