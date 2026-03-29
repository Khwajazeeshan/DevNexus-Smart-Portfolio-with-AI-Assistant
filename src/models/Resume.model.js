import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    education: [
        {
            education: {
                type: String,
                required: true
            }
        }
    ],
    experience: [
        {
            experience: {
                type: String,
                required: true
            }
        }
    ],
    skills: [
        {
            name: {
                type: String,
                required: true
            },
            percentage: {
                type: Number,
                required: true
            }
        }
    ],
    resumeUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

if (mongoose.models.Resume) {
    delete mongoose.models.Resume;
}

export default mongoose.model("Resume", resumeSchema);
