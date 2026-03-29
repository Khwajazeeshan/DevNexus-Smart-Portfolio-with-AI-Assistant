import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    skills: {
        type: String,
        required: false,
        trim: true
    },
    imagePath: {
        type: String,
        required: false
    },
    experienceYears: {
        type: String,
        default: "0"
    },
    projectsCount: {
        type: String,
        default: "0"
    }
}, { timestamps: true });

export default mongoose.models.About || mongoose.model("About", aboutSchema);
