import Text from "./Text";
import { Link } from "react-router";

function Header() {
  return (
    <div className="flex justify-between items-start ">
      <Link to={"/"}>
        <span>
          <Text
            className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 text-transparent py-3"
            textContent="PlayTale"
          />
        </span>
      </Link>
    </div>
  );
}

export default Header;
