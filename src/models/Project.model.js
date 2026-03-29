import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: [String],
        required: true
    },
    position: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
