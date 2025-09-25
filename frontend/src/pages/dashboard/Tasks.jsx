import React, { useState } from "react";
import { TasksProvider } from "../../contexts/TasksContext";
import TaskList from "../../components/dashboard/TaskList";
import TaskFilters from "../../components/dashboard/TaskFilters";
import TaskModal from "../../components/dashboard/TaskModal";
import { Plus } from "lucide-react";

const Tasks = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <TasksProvider>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              <p className="text-gray-600">
                Manage your tasks and stay organized
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </button>
          </div>

          {/* Filters */}
          <TaskFilters />

          {/* Task List */}
          <TaskList />

          {/* Create Task Modal */}
          <TaskModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            mode="create"
          />
        </div>
      </div>
    </TasksProvider>
  );
};

export default Tasks;
