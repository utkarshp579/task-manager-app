import React from "react";
import { useTasks } from "../../contexts/TasksContext";
import { Search, Filter } from "lucide-react";

const TaskFilters = () => {
  const { filters, updateFilters } = useTasks();

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleStatusChange = (e) => {
    updateFilters({ status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    updateFilters({ priority: e.target.value });
  };

  const clearFilters = () => {
    updateFilters({ search: "", status: "all", priority: "all" });
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Tasks
          </label>
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by title or description..."
              className="input-field pl-10"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="input-field"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            className="input-field"
            value={filters.priority}
            onChange={handlePriorityChange}
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.search ||
        filters.status !== "all" ||
        filters.priority !== "all") && (
        <div className="mt-4">
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;
