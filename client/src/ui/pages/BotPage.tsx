import { useEffect } from "react";
import { getUserProfileDetails } from "../../utils";
import Header from "../components/Header";
import BotStatus from "../components/BotPageComponents/BotStatus";
import AppliedJobs, { Job } from "../components/BotPageComponents/AppliedJobs";

const sampleJobs: Job[] = [
  {
    id: "1",
    position: "Software Engineer",
    companyName: "Google",
    appliedDate: "2023-10-26",
    jobUrl: "https://careers.google.com/jobs/results/",
    location: "Mountain View, CA",
  },
  {
    id: "2",
    position: "Frontend Developer",
    companyName: "Amazon",
    appliedDate: "2023-11-15",
    jobUrl: "https://www.amazon.jobs/en/",
    location: "Seattle, WA",
  },
  {
    id: "3",
    position: "Data Scientist",
    companyName: "Microsoft",
    appliedDate: "2023-12-02",
    jobUrl: "https://careers.microsoft.com/us/en",
    location: "Redmond, WA",
  },
  {
    id: "4",
    position: "UX Designer",
    companyName: "Apple",
    appliedDate: "2024-01-10",
    jobUrl: "https://www.apple.com/careers/us/",
    location: "Cupertino, CA",
  },
  {
    id: "5",
    position: "Product Manager",
    companyName: "Facebook",
    appliedDate: "2024-02-18",
    jobUrl: "https://www.metacareers.com/",
    location: "Menlo Park, CA",
  },
  {
    id: "6",
    position: "Software Engineer",
    companyName: "Google",
    appliedDate: "2023-10-26",
    jobUrl: "https://careers.google.com/jobs/results/",
    location: "New York, NY",
  },
  {
    id: "7",
    position: "Frontend Developer",
    companyName: "Amazon",
    appliedDate: "2023-11-15",
    jobUrl: "https://www.amazon.jobs/en/",
    location: "Austin, TX",
  },
  {
    id: "8",
    position: "Data Scientist",
    companyName: "Microsoft",
    appliedDate: "2023-12-02",
    jobUrl: "https://careers.microsoft.com/us/en",
    location: "Boston, MA",
  },
  {
    id: "9",
    position: "UX Designer",
    companyName: "Apple",
    appliedDate: "2024-01-10",
    jobUrl: "https://www.apple.com/careers/us/",
    location: "San Diego, CA",
  },
  {
    id: "10",
    position: "Product Manager",
    companyName: "Facebook",
    appliedDate: "2024-02-18",
    jobUrl: "https://www.metacareers.com/",
    location: "Los Angeles, CA",
  },
];

function BotPage() {
  useEffect(() => {
    getUserProfileDetails();
  }, []);
  return (
    <div className="max-h-full overflow-auto">
      {/* Header */}
      <Header />
      <div className="max-w-6xl mx-auto px-8 mt-10 space-y-4 select-none">
        <BotStatus />
        <AppliedJobs jobs={sampleJobs} />
      </div>
    </div>
  );
}

export default BotPage;
