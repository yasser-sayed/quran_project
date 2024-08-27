import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import PageNotFound from "../PageNotFound";
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  MenuButton,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import { BsThreeDots } from "react-icons/bs";
import PlayListMenu from "./components/PlayListMenu";
import { setReadyPlayList } from "../../state-management/soundSlices/soundPlayerSlice";
import { FaPlay } from "react-icons/fa6";
import PlayListItem from "./components/PlayListItem";

const PlayList = () => {
  const { userId, playListName } = useParams() as {
    userId: string;
    playListName: string;
  };

  const { isEn } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.userDet);

  const dispatch = useAppDispatch();

  if (user?.id !== userId || !user?.playLists[playListName]) {
    return <PageNotFound />;
  } else if (user?.playLists[playListName]) {
    const playList = user.playLists[playListName];
    return (
      <>
        <SideBar />

        <Flex
          minH={"100vh"}
          bg={"third"}
          className="col-span-full md:col-span-8"
          direction={"column"}
          gap={4}
        >
          {/* playlist desc section */}
          <Flex
            p={8}
            alignItems="center"
            bgGradient="linear(to-b, third, main)"
            flexWrap={"wrap"}
            textAlign={"center"}
            className="justify-between"
          >
            <Flex
              alignItems={"center"}
              gap={3}
              className="text-center md:text-start"
            >
              <Avatar size={"lg"} name={playList.name} />

              <div>
                <Text>{isEn ? "playList" : "قائمة تشغيل"}</Text>

                <Heading as="h2" size="lg" fontFamily={"inherit"}>
                  {playList.name}
                </Heading>

                <Text> {playList.desc} </Text>
              </div>
            </Flex>

            <PlayListMenu playList={playList}>
              <MenuButton
                as={IconButton}
                icon={
                  <BsThreeDots className="cursor-pointer text-2xl  !justify-self-end" />
                }
                variant={"text"}
                aria-label={isEn ? "Options" : "الخيارات"}
                className="hover:bg-opacity-50 hover:bg-gray-400 !rounded-full"
              ></MenuButton>
            </PlayListMenu>
          </Flex>

          {/* play all button */}
          <Flex alignItems={"center"} justifyContent={"start"} px={6}>
            <IconButton
              hidden={!playList.list.length}
              onClick={() => dispatch(setReadyPlayList(playList.list))}
              isRound={true}
              variant="solid"
              colorScheme="sec"
              aria-label="play"
              size={"lg"}
              color={"black"}
              icon={<FaPlay />}
              className="shadow-lg shadow-[#1aa63e]"
            />
          </Flex>

          {/* suwar list */}
          <Flex flexDirection={"column"} p={2}>
            {playList.list.map((audio, index) => (
              <PlayListItem
                audio={audio}
                index={index}
                playList={playList}
                key={index}
              />
            ))}
          </Flex>

          {/* if there is no suwar here */}
          <Flex
            hidden={!!playList.list.length}
            justifyContent={"center"}
            alignItems={"center"}
            h={"100%"}
          >
            <Heading as="h2" size="lg" fontFamily={"inherit"}>
              {isEn
                ? "there is no suwar in this playList yet,"
                : "لا يوجد سور في هذه القائمه بعد بعد,"}{" "}
            </Heading>
          </Flex>
        </Flex>
      </>
    );
  }
};

export default PlayList;
