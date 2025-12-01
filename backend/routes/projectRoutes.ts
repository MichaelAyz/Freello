import express, { Request, Response } from "express";
import Project from "../models/Project.js";
import { verifyToken, AuthRequest } from "../middleware/authMiddleware.js";

const router = express.Router();

// create a new project
router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;
    const { title, clientName, budget, deadline, notes, status } = req.body;

    const project = new Project({
      userId,
      title,
      clientName,
      budget,
      deadline,
      notes,
      status,
    });
    await project.save();
    return res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;
    const projects = await Project.find({ userId });
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post(
  "/:projectId/tasks",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.user?.id;
      const { text } = req.body;

      const project = await Project.findOne({
        _id: req.params.projectId,
        userId,
      });
      if (!project)
        return res.status(404).json({ message: "Project not found" });

      const newTask = {
        _id: Date.now().toString(),
        text,
        done: false,
      };

      project.tasks.push(newTask);
      await project.save();

      console.log("✅ Task added to project:", project._id);
      res.status(201).json(project);
    } catch (error) {
      console.error("Add task error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.patch(
  "/:projectId/tasks/:taskId",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.user?.id;
      const { projectId, taskId } = req.params;
      const { done, text } = req.body;

      const project = await Project.findOne({ _id: projectId, userId });
      if (!project)
        return res.status(404).json({ message: "Project not found" });

      const task = project.tasks.find((t: any) => t._id === taskId);
      if (!task) return res.status(404).json({ message: "Task not found" });

      if (done !== undefined) task.done = done;
      if (text !== undefined) task.text = text;

      await project.save();
      console.log("✅ Task updated:", taskId);
      res.json(project);
    } catch (error) {
      console.error("Update task error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.delete(
  "/:projectId/tasks/:taskId",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.user?.id;
      const { projectId, taskId } = req.params;

      const project = await Project.findOne({ _id: projectId, userId });
      if (!project)
        return res.status(404).json({ message: "Project not found" });

      project.tasks = project.tasks.filter((t: any) => t._id !== taskId);
      await project.save();

      console.log("✅ Task deleted:", taskId);
      res.json(project);
    } catch (error) {
      console.error("Delete task error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);


router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );

    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;
    const deleted = await Project.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!deleted) return res.status(404).json({ message: "Project deleted" });
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
