import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import { AuthProvider } from "../../contexts/AuthContext";

import ProtectedRoute from "./components/common/ProtectedRoute";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard pages
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Tasks from "./pages/dashboard/Tasks";

// Layout components
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Tasks />
                </ProtectedRoute>
              }
            />

            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
