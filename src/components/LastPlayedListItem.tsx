import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";
import {
  setAudioIndex,
  setReadyPlayList,
} from "../state-management/soundSlices/soundPlayerSlice";
import { FaDownload, FaList, FaPlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import AddToPlayList from "./AddToPlayList";
import { IAudio } from "../lib/types";

interface ILastPlayedListItemProps {
  audio: IAudio;
  index: number;
  playList: IAudio[];
}

const LastPlayedListItem = ({
  audio,
  index,
  playList,
}: ILastPlayedListItemProps) => {
  const { isEn } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  //play surah function
  const playSurah = () => {
    dispatch(setReadyPlayList(playList));
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
        onClick={playSurah}
        className="hidden group-hover:inline cursor-pointer hover:text-gray-400 duration-[25ms]"
      />
      <Avatar className="shadow-lg shadow-black" size="sm" src={audio.img} />

      <p onClick={playSurah} className="cursor-pointer text-xs">
        {audio.name}
      </p>

      <Text
        as={Link}
        to={`/reciter/${audio.writerId}`}
        fontSize={"0.5rem"}
        fontFamily={"inherit"}
        className="text-gray-400 hover:text-gray-300"
      >
        {audio.writer}
      </Text>

      <Flex ml={isEn ? "auto" : "unset"} mr={isEn ? "unset" : "auto"}>
        <Menu placement={isEn ? "bottom-end" : "bottom-start"}>
          <MenuButton
            as={IconButton}
            icon={
              <BsThreeDots className="cursor-pointer text-lg  !justify-self-end" />
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
                onClick={playSurah}
              >
                <FaPlay className="me-2" /> {isEn ? "play" : "تشغيل"}
              </MenuItem>

              <MenuItem
                bg={"third"}
                borderColor={"main"}
                _hover={{ bg: "sec.600" }}
                as={"a"}
                download={audio.name}
                target="_blank"
                href={audio.src}
              >
                <FaDownload className="me-2" /> {isEn ? "download" : "تحميل"}
              </MenuItem>

              <AddToPlayList audio={audio}>
                <MenuItem
                  bg={"third"}
                  borderColor={"main"}
                  _hover={{ bg: "sec.600" }}
                >
                  <FaList className="me-2" />{" "}
                  {isEn ? "add to playlist" : "اضافه الي قائمة تشغيل"}
                </MenuItem>
              </AddToPlayList>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default LastPlayedListItem;
