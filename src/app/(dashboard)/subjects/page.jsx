import NavbarDashboard from "@/components/dashboard/NavbarDashboard";

const SubjectsPage = () => {
  return (
    <div className="flex min-h-screen bg-indigo-50">
      <NavbarDashboard />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Manage Subjects</h1>
        {/* Add subjects management content here */}
      </div>
    </div>
  );
};

export default SubjectsPage;
