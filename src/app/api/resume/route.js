import Resume from "@/models/Resume.model.js";

// Add Education
export const addEducation = async (req, res) => {
    try {
        const { education } = req.body;

        if (!education) {
            return res.status(400).json({ message: "Education field is required" });
        }

        let resume = await Resume.findOne();

        if (!resume) {
            resume = new Resume({ education: [{ education }] });
        } else {
            resume.education.unshift({ education });
        }

        await resume.save();

        res.status(200).json({ message: "Education added successfully", education: resume.education });
    } catch (error) {
        console.error("Error adding education:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Education
export const deleteEducation = async (req, res) => {
    try {
        const { id } = req.params;

        const resume = await Resume.findOneAndUpdate(
            {},
            { $pull: { education: { _id: id } } },
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.status(200).json({ message: "Education deleted successfully", education: resume.education });
    } catch (error) {
        console.error("Error deleting education:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add Experience
export const addExperience = async (req, res) => {
    try {
        const { experience } = req.body;

        if (!experience) {
            return res.status(400).json({ message: "Experience field is required" });
        }

        let resume = await Resume.findOne();

        if (!resume) {
            resume = new Resume({ experience: [{ experience }] });
        } else {
            resume.experience.unshift({ experience });
        }

        await resume.save();

        res.status(200).json({ message: "Experience added successfully", experience: resume.experience });
    } catch (error) {
        console.error("Error adding experience:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Experience
export const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const resume = await Resume.findOneAndUpdate(
            {},
            { $pull: { experience: { _id: id } } },
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.status(200).json({ message: "Experience deleted successfully", experience: resume.experience });
    } catch (error) {
        console.error("Error deleting experience:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add Skill
export const addSkill = async (req, res) => {
    try {
        const { name, percentage } = req.body;

        if (!name || !percentage) {
            return res.status(400).json({ message: "Skill name and percentage are required" });
        }

        let resume = await Resume.findOne();

        if (!resume) {
            resume = new Resume({ skills: [{ name, percentage }] });
        } else {
            // Add to the beginning of the array to show on top
            resume.skills.unshift({ name, percentage });
        }

        await resume.save();

        res.status(200).json({ message: "Skill added successfully", skills: resume.skills });
    } catch (error) {
        console.error("Error adding skill:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Skill
export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const resume = await Resume.findOneAndUpdate(
            {},
            { $pull: { skills: { _id: id } } },
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.status(200).json({ message: "Skill deleted successfully", skills: resume.skills });
    } catch (error) {
        console.error("Error deleting skill:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Resume Data
export const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne();
        if (!resume) {
            return res.status(200).json({ education: [], experience: [], skills: [] });
        }
        res.status(200).json(resume);
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
