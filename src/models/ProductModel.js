const mongoose = require('mongoose')

const arr = []
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        size: { type: arr, required: true },
        color: { type: arr, required: true },
        price: { type: String, required: true },
        countInStock: { type: String, required: true },
        rating: { type: String, default : "0" },
        description: { type: String, default : "" },
        discount: { type: String, default : "0" },
        sold: { type: String, default : "0" }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;