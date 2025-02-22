import React, { createContext, useContext, useState } from "react";

const USER: UserInfoType = {
  email: "",
  name: "",
  picture: "",
  loggedIn: false,
  userProfile: {
    completedUserProfile: false,
    preferredJobTitle: "",
    linkedInSummary: "",
    personalWebsiteLink: "",
    preferredJobCountry: "",
    profileSummary: "",
    folderName: "",
    resumeText: "",
    coverLetterText: "",
  },
};

const UserInfoContext = createContext<UserInfoContextType>({
  userInfo: USER,
  setUserInfo: () => {},
});

function UserInfoContextWrapper({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfoType>(USER);
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoContextWrapper;

export function useUserInfoContext() {
  const userInfoContext = useContext(UserInfoContext);
  if (!userInfoContext)
    throw new Error(
      "UserInfoContext should be used within the context wrapper"
    );
  return userInfoContext;
}
