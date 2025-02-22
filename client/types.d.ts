interface UserInfoType {
  name: string;
  email: string;
  picture: string;
  loggedIn: boolean;
}

interface UserInfoContextType {
  userInfo: UserInfoType,
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>
}


interface LinkedMeRouteType extends UserInfoType {
  success: boolean;
}



interface JobProfileType {
  resumeLink: string;
  coverLetterLink: string;
  botAssignedFolder: string;
  userLinkedinProfileInfo: string;
  personalWebsiteLink: string;
  jobLocationCountry: string;
  jobLocationCity?: string;
  completed: boolean
}

interface JobProfileContextType {
  jobProfile: JobProfileType,
  setJobProfile: React.Dispatch<React.SetStateAction<JobProfileType>>
}