import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customer: {
            type: String,
            required: false,
            maxlength: 50,
        },
        firstName: {
            type: String,
            required: false,
            maxlength: 30,
        },
        surName: {
            type: String,
            required: false,
            maxlength: 30,
        },
        email: {
            type: String,
            required: false,
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
            required: false,
        },
        status: {
            type: Number,
            default: 0,
        },
        method: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);