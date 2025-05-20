import { Todo } from "../models/todo.model.js";
import { getTokenContents } from "../utils/getTokenContents.js";
import { writeErrorToFile } from "../utils/errorLog.js";
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    writeErrorToFile(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getTodosByUser = async (req, res) => {
  try {
    const { accessToken } = req.cookies;

    const { id, email } = getTokenContents(res, accessToken);

    const todos = await Todo.find({ author: id }).populate(
      "author",
      "name surname email"
    );

    res.status(200).json(todos);
  } catch (error) {
    writeErrorToFile(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    writeErrorToFile(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const { accessToken } = req.cookies;
  const { id } = getTokenContents(res, accessToken);

  const todo = new Todo({
    title,
    description,
    author: id,
  });

  try {
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    writeErrorToFile(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    writeErrorToFile(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    writeErrorToFile(error.message);
    res.status(500).json({ message: error.message });
  }
};
