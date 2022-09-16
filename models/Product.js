import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLenght: 60,
    },
    desc: {
        type: String,
        required: true,
        maxLenght: 200,
    },
    img: {
        type: String,
        required: true,
    },
    prices: {
        type: [Number],
        required: true,
    },
    extraOptions: {
        type: [{ text: { type: String, required: true }, price: { type: Number, required: true } }],
        required: true,
        maxLenght: 60,
    }
}, { timestamps: true }
)

export default mongoose.model.Product || mongoose.model("Product", ProductSchema)