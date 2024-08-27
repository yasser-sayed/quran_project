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
import { BsThreeDots } from "react-icons/bs";
import { FaDownload, FaList, FaMinus, FaPlay } from "react-icons/fa6";
import AddToPlayList from "../../../components/AddToPlayList";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../state-management/hooks";
import { IAudio, IPlayList } from "../../../lib/types";
import {
  setAudioIndex,
  setReadyPlayList,
} from "../../../state-management/soundSlices/soundPlayerSlice";
import { Link } from "react-router-dom";
import AlertMessage from "../../../components/AlertMessage";
import { removeAudioFromPlayList } from "../../../state-management/userDetSlice/userDetSlice";

interface IPlayListItemProps {
  audio: IAudio;
  index: number;
  playList: IPlayList;
}

const PlayListItem = ({ audio, index, playList }: IPlayListItemProps) => {
  const { isEn } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  //play surah function
  const playSurah = () => {
    dispatch(setReadyPlayList(playList.list));
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

      <p onClick={playSurah} className="cursor-pointer">
        {audio.name}
      </p>

      <Text
        as={Link}
        to={`/reciter/${audio.writerId}`}
        fontSize={"0.8rem"}
        fontFamily={"inherit"}
        className="text-gray-400 hover:text-gray-300"
      >
        {audio.writer}
      </Text>

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

              <AlertMessage
                onClick={() =>
                  dispatch(
                    removeAudioFromPlayList({ audio, name: playList.name })
                  )
                }
                title={
                  isEn
                    ? `remove ${audio.name} from ${playList.name}`
                    : `ازاله ${audio.name} من قائمه ${playList.name}`
                }
              >
                <MenuItem
                  bg={"third"}
                  borderColor={"main"}
                  _hover={{ bg: "sec.600" }}
                  color={"red"}
                >
                  <FaMinus className="me-2" />{" "}
                  {isEn
                    ? "remove from this playlist"
                    : "ازاله من قائمة تشغيل هذه"}
                </MenuItem>
              </AlertMessage>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default PlayListItem;
