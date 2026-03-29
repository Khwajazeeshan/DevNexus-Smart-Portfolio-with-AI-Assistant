import Footer from "@/models/Footer.model.js";

// Add or Update Footer Info
export const addFooter = async (req, res) => {
    try {
        const { facebook, instagram, github, linkedin } = req.body;

        if (!facebook || !instagram || !github || !linkedin) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if footer info exists
        let footer = await Footer.findOne();

        if (footer) {
            // Update existing
            footer.facebook = facebook;
            footer.instagram = instagram;
            footer.github = github;
            footer.linkedin = linkedin;
            await footer.save();
            return res.status(200).json({ message: "Footer info updated successfully", footer });
        }

        // Create new
        const newFooter = new Footer({ facebook, instagram, github, linkedin });
        await newFooter.save();

        res.status(200).json({ message: "Footer info added successfully", footer: newFooter });
    } catch (error) {
        console.error("Error adding footer info:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Footer Info
export const getFooter = async (req, res) => {
    try {
        const footer = await Footer.findOne();
        if (!footer) {
            return res.status(404).json({ message: "No footer info found" });
        }
        res.status(200).json({ footer });
    } catch (error) {
        console.error("Error fetching footer info:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
