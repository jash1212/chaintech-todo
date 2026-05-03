const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/todo");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  dueDate: Date,
  category: String
});

const Task = mongoose.model("Task", TaskSchema);

// CREATE
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      category
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// GET
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.completed && req.body.completed === true) {
      return res.status(400).json({ error: "Task already completed" });
    }

    if (req.body.title !== undefined && req.body.title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    Object.assign(task, req.body);

    await task.save();
    res.json(task);
  } catch {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.listen(3000, () => console.log("Server running"));