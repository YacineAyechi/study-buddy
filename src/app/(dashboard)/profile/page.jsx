import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import ProfileContent from "@/components/profile/ProfileContent";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-indigo-50">
        <NavbarDashboard />
        <ProfileContent />
      </div>
    </ProtectedRoute>
  );
}
