import { useAppSelector } from "../../state-management/hooks";
import SideBarContent from "./SideBarContent";

const SideBar = () => {
  const { navH } = useAppSelector((state) => state.navBar);
  return (
    <aside
      className="col-[none] hidden lg:flex lg:col-span-3 max-h-screen  sticky w-full  px-2 overflow-y-scroll "
      style={{ top: navH }}
    >
      <SideBarContent onClose={() => {}} />
    </aside>
  );
};

export default SideBar;
