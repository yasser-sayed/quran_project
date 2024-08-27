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
  WrapItem,
} from "@chakra-ui/react";
import { IAudio } from "../lib/types";
import { FaDownload, FaList, FaPlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";
import {
  setAudioIndex,
  setReadyPlayList,
} from "../state-management/soundSlices/soundPlayerSlice";
import { BsThreeDots } from "react-icons/bs";
import AddToPlayList from "./AddToPlayList";

const AudioCard = ({
  audio,
  playList,
}: {
  audio: IAudio;
  playList: IAudio[];
}) => {
  const dispatch = useAppDispatch();
  const { isEn } = useAppSelector((state) => state.settings);

  //play surah function
  const playSurah = () => {
    dispatch(setReadyPlayList(playList));
    dispatch(setAudioIndex(audio.id));
  };
  return (
    <Flex
      key={audio.id}
      flexDirection={"column"}
      rounded={10}
      gap={2}
      position={"relative"}
      className="group"
    >
      <Menu>
        <MenuButton
          as={IconButton}
          icon={
            <BsThreeDots className="cursor-pointer text-2xl  !justify-self-end" />
          }
          variant={"text"}
          aria-label={isEn ? "Options" : "الخيارات"}
          className="hover:bg-opacity-50 rotate-90 z-10 hover:bg-gray-400 !rounded-full  group-hover:!scale-100 !scale-0  !absolute end-2 top-2"
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

      <WrapItem
        onClick={playSurah}
        position={"relative"}
        className="group cursor-pointer hover:opacity-70"
      >
        <Avatar
          className="shadow-lg shadow-black"
          size="2xl"
          rounded={0}
          name={audio.writer}
          display={audio.img ? "none" : "flex"}
        />{" "}
        <img
          src={audio.img}
          className={`${
            audio.img ? "" : "hidden"
          } h-[128px] w-[128px] min-w-[128px] min-h-[128px] shadow-lg shadow-black`}
          alt=""
        />
        <IconButton
          className=" group-hover:!scale-100 !scale-0  !absolute start-2 bottom-2 "
          isRound={true}
          variant="solid"
          colorScheme="sec"
          aria-label="play"
          fontSize="20px"
          color={"black"}
          icon={<FaPlay />}
        />
      </WrapItem>
      <Text
        cursor={"pointer"}
        onClick={playSurah}
        fontSize={"0.8rem"}
        fontFamily={"inherit"}
      >
        {audio.name}
      </Text>
      <Text
        as={Link}
        to={`/reciter/${audio.writerId}`}
        fontSize={"0.8rem"}
        fontFamily={"inherit"}
        color={"gray"}
      >
        {audio.writer}
      </Text>
    </Flex>
  );
};

export default AudioCard;
