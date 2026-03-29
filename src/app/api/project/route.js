import Project from "@/models/Project.model.js";

// Add Project
export const addProject = async (req, res) => {
    try {
        const { name, link } = req.body;

        if (!name || !link) {
            return res.status(400).json({ message: "Project name and link are required" });
        }

        const newProject = new Project({ name, link });
        await newProject.save();

        const projects = await Project.find().sort({ createdAt: -1 }); // Newest first

        res.status(200).json({ message: "Project added successfully", projects });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        await Project.findByIdAndDelete(id);

        const projects = await Project.find().sort({ createdAt: -1 });

        res.status(200).json({ message: "Project deleted successfully", projects });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
