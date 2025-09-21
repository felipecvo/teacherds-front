import RecentAssessments from "../components/RecentAssessments";

const Index = () => {
  return (
    <div className="flex gap-6 flex-col">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Professor Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back! Manage your classrooms and evaluate student assessments.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Classrooms</h2>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Assessments</h2>
        <RecentAssessments />
      </div>
    </div>
  );
};
export default Index;
