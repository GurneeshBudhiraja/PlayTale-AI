import Header from "../components/Header";
import BotStatus from "../components/BotPageComponents/BotStatus";
import AppliedJobs from "../components/BotPageComponents/AppliedJobs";
import { useState } from "react";

function BotPage() {
  const [jobsCount, setJobsCount] = useState<number | null>(null);
  return (
    <div className="max-h-full overflow-auto">
      {/* Header */}
      <Header />
      <div className="max-w-6xl mx-auto px-8 mt-10 space-y-4 select-none">
        <BotStatus jobsCount={jobsCount} />
        <AppliedJobs setJobsCount={setJobsCount}/>
      </div>
    </div>
  );
}

export default BotPage;
