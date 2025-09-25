    import React, { useState, useEffect } from "react";
    import { useTasks } from "../../contexts/TasksContext";
    import { X } from "lucide-react";

    const TaskModal = ({ isOpen, onClose, mode = "create", task = null }) => {
      const { createTask, updateTask, loading } = useTasks();
      const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
      });
      const [validationErrors, setValidationErrors] = useState({});

      // Initialize form data when editing
      useEffect(() => {
        if (mode === "edit" && task) {
          setFormData({
            title: task.title || "",
            description: task.description || "",
            status: task.status || "pending",
            priority: task.priority || "medium",
          });
        } else {
          setFormData({
            title: "",
            description: "",
            status: "pending",
            priority: "medium",
          });
        }
      }, [mode, task, isOpen]);

      const validateForm = () => {
        const errors = {};

        if (!formData.title.trim()) {
          errors.title = "Title is required";
        } else if (formData.title.trim().length < 3) {
          errors.title = "Title must be at least 3 characters";
        }

        if (formData.description && formData.description.length > 500) {
          errors.description = "Description must be less than 500 characters";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const taskData = {
          title: formData.title.trim(),
          description: formData.description.trim(),
          status: formData.status,
          priority: formData.priority,
        };

        let result;
        if (mode === "create") {
          result = await createTask(taskData);
        } else {
          result = await updateTask(task._id, taskData);
        }

        if (result.success) {
          onClose();
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));

        // Clear validation error
        if (validationErrors[name]) {
          setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
      };

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-lg font-medium text-gray-900">
                {mode === "create" ? "Create New Task" : "Edit Task"}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`input-field ${
                    validationErrors.title ? "border-red-500" : ""
                  }`}
                  placeholder="Enter task title"
                  disabled={loading}
                />
                {validationErrors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`input-field ${
                    validationErrors.description ? "border-red-500" : ""
                  }`}
                  placeholder="Enter task description (optional)"
                  disabled={loading}
                />
                {validationErrors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.description}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input-field"
                  disabled={loading}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="input-field"
                  disabled={loading}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {mode === "create" ? "Creating..." : "Updating..."}
                    </>
                  ) : mode === "create" ? (
                    "Create Task"
                  ) : (
                    "Update Task"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    export default TaskModal;