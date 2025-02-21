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


interface LinkedMeRouteType {
  success: boolean;
  info: Omit<UserInfoType, "loggedIn">;
}