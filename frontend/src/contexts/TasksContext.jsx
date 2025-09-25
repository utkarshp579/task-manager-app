import React, { createContext, useContext, useState, useEffect } from "react";
import { tasksAPI } from "../services/api";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
  });

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, [filters]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await tasksAPI.getAllTasks(filters);
      setTasks(response.data.tasks);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setLoading(true);
      const response = await tasksAPI.createTask(taskData);
      setTasks((prev) => [response.data.task, ...prev]);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create task";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      setLoading(true);
      const response = await tasksAPI.updateTask(taskId, taskData);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? response.data.task : task))
      );
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update task";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      await tasksAPI.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete task";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const value = {
    tasks,
    loading,
    error,
    filters,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
