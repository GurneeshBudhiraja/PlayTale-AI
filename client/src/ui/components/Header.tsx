import React, { useEffect, useRef, useState } from "react";
import Text from "./Text";
import Button from "./Button";
import { useUserInfoContext } from "../context/UserInfoContext";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router";

const menuOptions = [
  {
    optionName: "My Profile Settings",
    className: "text-gray-700 hover:text-indigo-600 font-medium",
    onClick: () => {
      console.log("hello ");
    },
  },
  {
    optionName: "Sign Out",
    className: "text-red-600 hover:text-red-700 font-medium",
    onClick: () => {},
  },
];

function Header() {
  const { userInfo } = useUserInfoContext();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node) // Type assertion
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className="flex justify-between items-start px-8 py-2">
      <Link to={"/"}>
        <span>
          <Text
            className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 text-transparent"
            textContent="JobPilot AI"
          />
          <Text
            className="text-sm bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 text-transparent shadow-2xl"
            textContent="Land your dream job, on autopilot."
          />
        </span>
      </Link>
      <div ref={profileMenuRef}>
        <Button onClick={() => setShowMenu(!showMenu)}>
          {userInfo.picture ? (
            <img
              width={32}
              height={32}
              src={
                userInfo.picture ||
                "https://avatars.githubusercontent.com/u/140137709?s=400&u=dd7f429eed3ace708c5353bc49ce420b361a025f&v=4"
              }
              alt="Profile icon"
              className="rounded-full"
            />
          ) : (
            <CircleUserRound
              width={35}
              height={35}
              className="text-indigo-300"
            />
          )}
        </Button>
        {showMenu && (
          <div className="bg-indigo-100 absolute right-20 mt-2 py-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {menuOptions.map((option, index) => (
              <Button
                className={`${option.className} block w-full text-left px-4 py-2 text-sm`}
                onClick={option.onClick}
                key={index}
              >
                {option.optionName}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
