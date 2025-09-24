const express = require("express");
const Task = require("../models/Task");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user
// @access  Private
router.get("/", async (req, res) => {
  try {
    const { search, status, priority, sort = "-createdAt" } = req.query;

    // Build query
    const query = { userId: req.user._id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (priority && priority !== "all") {
      query.priority = priority;
    }

    const tasks = await Task.find(query)
      .sort(sort)
      .populate("userId", "name email");

    res.json({ tasks, count: tasks.length });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ task });
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ message: "Server error fetching task" });
  }
});

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post("/", async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title: title.trim(),
      description: description ? description.trim() : "",
      priority: priority || "medium",
      status: status || "pending",
      userId: req.user._id,
    });

    await task.save();

    // Populate user info
    await task.populate("userId", "name email");

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server error creating task" });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update fields
    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) task.status = status;

    await task.save();
    await task.populate("userId", "name email");

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error updating task" });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server error deleting task" });
  }
});

module.exports = router;
