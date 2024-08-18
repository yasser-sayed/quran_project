import { Link } from "react-router-dom";
import { useAppSelector } from "../state-management/hooks";

const SideBar = () => {
  const { navH } = useAppSelector((state) => state.navBar);
  return (
    <aside
      className="col-[none] hidden md:flex md:col-span-2 max-h-96  sticky w-full justify-start flex-col  py-5"
      style={{ top: navH }}
    >
      <Link
        className="w-full p-3 hover:bg-gray-500 hover:bg-opacity-30"
        to={"/search"}
      >
        search
      </Link>

      <Link
        className="w-full p-3 hover:bg-gray-500 hover:bg-opacity-30"
        to={"/radio"}
      >
        radio
      </Link>
    </aside>
  );
};

export default SideBar;
