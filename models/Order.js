import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 30,
        },
        surName: {
            type: String,
            required: true,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            maxlength: 30,
        },
        address: {
            type: String,
            required: true,
            maxlength: 200,
        },
        total: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            default: 0,
        },
        method: {
            type: Number,
            default: 0,
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);