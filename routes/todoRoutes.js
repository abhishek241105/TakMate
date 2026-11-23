
const express = require("express");

const router = express.Router();

const Todo = require("../models/Todo");

// GET - Fetch all tasks

router.get("/", async (req, res) => {

    try {

        const todos = await Todo.find();

        res.status(200).json(todos);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});

// POST - Add a new task

router.post("/", async (req, res) => {

    try {

        const newTodo = new Todo({
            task: req.body.task
        });

        const savedTodo = await newTodo.save();

        res.status(201).json(savedTodo);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});

// PUT - Update an existing task

router.put("/:id", async (req, res) => {

    try {

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                task: req.body.task
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTodo);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});

// PATCH - Mark task as completed or pending

router.patch("/:id/completed", async (req, res) => {

    try {

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                completed: req.body.completed
            },
            {
                new: true
            }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTodo);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});
// DELETE - Delete a task

router.delete("/:id", async (req, res) => {

    try {

        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

});

module.exports = router;
