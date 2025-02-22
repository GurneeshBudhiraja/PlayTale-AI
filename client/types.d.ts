interface UserInfoType {
  name: string;
  email: string;
  picture: string;
  loggedIn: boolean;
  userProfile: UserProfileType
}

interface UserInfoContextType {
  userInfo: UserInfoType,
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>
}


interface LinkedMeRouteType extends UserInfoType {
  success: boolean;
}



interface UserProfileType {
  completedUserProfile: boolean;
  preferredJobTitle: string;
  linkedInSummary: string;
  personalWebsiteLink: string;
  preferredJobCountry: string;
  profileSummary: string;
  folderName: string;
  resumeText: string;
  coverLetterText: string;
}