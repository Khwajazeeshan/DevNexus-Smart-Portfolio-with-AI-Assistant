import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    personalInfo: {
        name: String,
        title: String,
        careerObjective: String,
        bio: [String],
        contact: {
            address: String,
            email: String,
            phone: String,
            mapsLink: String,
        },
        socialLinks: {
            facebook: String,
            instagram: String,
            github: String,
            linkedin: String,
        },
        languages: [String],
    },

    education: [
        {
            degree: String,
            institute: String,
            years: String,
            cgpa: Number,
        },
    ],

    experience: [String],

    skills: [
        {
            name: String,
        },
    ],

    softSkills: [String],

    certifications: [
        {
            name: String,
            institute: String,
        },
    ],

    projects: [
        {
            title: String,
            description: String,
            link: String,
        },
    ],
});

export default mongoose.models.Data || mongoose.model("Data", portfolioSchema);
