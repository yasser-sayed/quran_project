import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { FaDownload, FaPlay } from "react-icons/fa6";
import { IAudio } from "../../../lib/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../state-management/hooks";
import {
  setAudioIndex,
  setReadyPlayList,
} from "../../../state-management/soundSlices/soundPlayerSlice";

type TReciterListItem = {
  surah: IAudio;
  index: number;
  suwarList: IAudio[];
};

const ReciterListItem = ({ index, surah, suwarList }: TReciterListItem) => {
  //redux distruct
  const { isEn } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  //play surah function
  const playSurah = (index: number) => {
    dispatch(setReadyPlayList(suwarList));
    dispatch(setAudioIndex(index));
  };
  return (
    <Flex
      w={"100%"}
      rounded={"xl"}
      p={4}
      gap={4}
      alignItems={"center"}
      className="group hover:bg-gray-500 hover:bg-opacity-30 "
    >
      <p className="inline-block group-hover:hidden">{index + 1}</p>
      <FaPlay
        onClick={() => playSurah(index)}
        className="hidden group-hover:inline cursor-pointer hover:text-gray-400 duration-[25ms]"
      />
      <Avatar className="shadow-lg shadow-black" size="sm" src={surah.img} />

      <p onClick={() => playSurah(index)} className="cursor-pointer">
        {surah.name}
      </p>

      <Flex ml={isEn ? "auto" : "unset"} mr={isEn ? "unset" : "auto"}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={
              <BsThreeDots className="cursor-pointer text-2xl  !justify-self-end" />
            }
            variant={"text"}
            aria-label={isEn ? "Options" : "الخيارات"}
          ></MenuButton>
          <MenuList bg={"third"} borderColor={"main"}>
            <MenuGroup>
              <MenuItem
                bg={"third"}
                borderColor={"main"}
                _hover={{ bg: "sec.600" }}
                onClick={() => playSurah(index)}
              >
                <FaPlay className="me-2" /> {isEn ? "play" : "تشغيل"}
              </MenuItem>

              <MenuItem
                bg={"third"}
                borderColor={"main"}
                _hover={{ bg: "sec.600" }}
                as={"a"}
                download={surah.name}
                target="_blank"
                href={surah.src}
              >
                <FaDownload className="me-2" /> {isEn ? "download" : "تحميل"}
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default ReciterListItem;
