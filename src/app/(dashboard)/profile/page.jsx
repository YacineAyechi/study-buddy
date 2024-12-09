import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import ProfileContent from "@/components/profile/ProfileContent";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-indigo-50">
      <NavbarDashboard />
      <div className="flex-1 p-8">
        <ProfileContent />
      </div>
    </div>
  );
}
