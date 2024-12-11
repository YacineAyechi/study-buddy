"use client";

import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import DashboardContent from "@/components/dashboard/DashboardContent";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-indigo-50">
        <NavbarDashboard />
        <DashboardContent />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
