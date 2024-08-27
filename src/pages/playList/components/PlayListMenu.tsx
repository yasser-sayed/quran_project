import { Menu, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { ReactNode } from "react";
import EditPlayList from "./EditPlayList";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../state-management/hooks";
import { FaPlay, FaTrash } from "react-icons/fa6";
import { IPlayList } from "../../../lib/types";
import { MdOutlineEdit } from "react-icons/md";
import AlertMessage from "./../../../components/AlertMessage";
import { deletePlayList } from "../../../state-management/userDetSlice/userDetSlice";
import { useNavigate } from "react-router-dom";
import { setReadyPlayList } from "../../../state-management/soundSlices/soundPlayerSlice";

interface IPlayListMenuProps {
  children: ReactNode;
  playList: IPlayList;
}

const PlayListMenu = ({ children, playList }: IPlayListMenuProps) => {
  const { isEn } = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Menu>
      {children}
      <MenuList bg={"third"} borderColor={"main"}>
        <MenuGroup>
          <MenuItem
            onClick={() => dispatch(setReadyPlayList(playList.list))}
            bg={"third"}
            borderColor={"main"}
            _hover={{ bg: "sec.600" }}
          >
            <FaPlay className="me-2" /> {isEn ? "play" : "تشغيل"}
          </MenuItem>

          <EditPlayList playList={playList}>
            <MenuItem
              bg={"third"}
              borderColor={"main"}
              _hover={{ bg: "sec.600" }}
            >
              {" "}
              <MdOutlineEdit className="me-2" /> {isEn ? "edit" : "تعديل"}
            </MenuItem>
          </EditPlayList>

          <AlertMessage
            onClick={() => {
              dispatch(deletePlayList(playList));
              navigate(-1);
            }}
            title={isEn ? `delete ${playList.name}` : ` حذف  ${playList.name} `}
          >
            <MenuItem
              color={"red"}
              bg={"third"}
              borderColor={"main"}
              _hover={{ bg: "sec.600" }}
            >
              {" "}
              <FaTrash className="me-2" /> {isEn ? "delete" : "حذف"}
            </MenuItem>
          </AlertMessage>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default PlayListMenu;
