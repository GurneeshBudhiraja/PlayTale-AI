import { createContext, useContext, useState } from "react";

const JOB_PROFILE: JobProfileType = {
  resumeLink: "",
  coverLetterLink: "",
  botAssignedFolder: "",
  userLinkedinProfileInfo: "",
  personalWebsiteLink: "",
  jobLocationCountry: "",
  jobLocationCity: "",
  completed: true,
};

const JobProfileContext = createContext<JobProfileContextType>({
  jobProfile: JOB_PROFILE,
  setJobProfile: () => {},
});

export default function JobProfileContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jobProfile, setJobProfile] = useState<JobProfileType>(JOB_PROFILE);
  return (
    <JobProfileContext.Provider
      value={{
        jobProfile,
        setJobProfile,
      }}
    >
      {children}
    </JobProfileContext.Provider>
  );
}

export function useJobProfileContextType() {
  const jobProfileContext = useContext(JobProfileContext);
  if (!jobProfileContext)
    throw new Error(
      "JobProfileContext should be used within the context wrapper"
    );
  return jobProfileContext;
}
