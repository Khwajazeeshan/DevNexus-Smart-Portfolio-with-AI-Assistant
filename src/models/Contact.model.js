import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    mapLink: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
