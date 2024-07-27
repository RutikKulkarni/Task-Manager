import { Request, Response } from "express";
import Task, { ITask } from "../models/Task";
import { AuthRequest } from "../middlewares/auth";

const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, status, priority, deadline } = req.body;
  try {
    const task = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      user: req.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

export { createTask, getTasks, updateTask, deleteTask };
