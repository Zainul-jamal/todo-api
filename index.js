const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const TodoModel = require('./Models/Todos');
console.log(TodoModel);

require("dotenv").config();
app.use(cors());
app.use(express.json());
``
// Add a new task
app.post("/add", (req, res) => {
  const task = req.body.task;
  
  // Create a new todo task
  TodoModel.create({ task })
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "Task added successfully", task: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error adding task", error: err });
    });
});

// Get all tasks
app.get("/get", (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: "Error fetching tasks", error: err }));
});

// Delete a task by id
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Task deleted successfully", deletedTask: result });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error deleting task", error: err });
    });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
