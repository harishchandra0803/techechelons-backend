const Project = require("../models/Project");

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Add a new project
exports.addProject = async (req, res) => {
    try {
        const { name, description, skillSet, noOfMembers, isActive } = req.body;

        if (!name || !description || !skillSet || !noOfMembers) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newProject = new Project({
            name,
            description,
            skillSet,
            noOfMembers,
            isActive
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const { name, description, skillSet, noOfMembers, isActive } = req.body;
        project.name = name || project.name;
        project.description = description || project.description;
        project.skillSet = skillSet || project.skillSet;
        project.noOfMembers = noOfMembers || project.noOfMembers;
        project.isActive = isActive !== undefined ? isActive : project.isActive;

        await project.save();
        res.json(project);
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        await project.deleteOne();
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
