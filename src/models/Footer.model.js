import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
    facebook: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.Footer || mongoose.model("Footer", footerSchema);
