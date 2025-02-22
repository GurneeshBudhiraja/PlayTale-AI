import Header from "../components/Header";
import BotStatus from "../components/BotPageComponents/BotStatus";
import AppliedJobs from "../components/BotPageComponents/AppliedJobs";
import { useEffect, useState } from "react";
import { useUserInfoContext } from "../context/UserInfoContext";
import { useNavigate } from "react-router";

function BotPage() {
  const [jobsCount, setJobsCount] = useState<number | null>(null);
  const { userInfo } = useUserInfoContext();
  const [mounted, setMounted] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.loggedIn) navigate("/");
    setMounted(true);
  }, [userInfo.loggedIn, navigate]);

  if (!mounted) return;
  return (
    <div className="max-h-full overflow-auto">
      {/* Header */}
      <Header />
      {userInfo.userProfile.completedUserProfile ? (
        <div className="max-w-6xl mx-auto px-8 mt-10 space-y-4 select-none">
          <BotStatus jobsCount={jobsCount} />
          <AppliedJobs setJobsCount={setJobsCount} />
        </div>
      ) : (
        <>Onboarding screeen</>
      )}
    </div>
  );
}

export default BotPage;
