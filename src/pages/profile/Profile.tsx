import { Avatar, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import SideBar from "../../components/SideBar";
import { useAppSelector } from "../../state-management/hooks";
import PageNotFound from "../PageNotFound";
import AudioCard from "../../components/AudioCard";
import { useEffect, useState } from "react";
import { IAudio } from "../../lib/types";
import { FaCirclePlay, FaHeart, FaList } from "react-icons/fa6";
import ReciterCard from "../../components/ReciterCard";

const Profile = () => {
  const { userId } = useParams();

  const [lastPlayedList, setlastPlayedList] = useState<IAudio[]>([]);

  const { isEn } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.userDet);

  useEffect(() => {
    if (user) {
      let newlastPlayedList: IAudio[] = user.lastPlayed.map((surah, i) => ({
        ...surah,
        id: i,
      }));
      setlastPlayedList(newlastPlayedList);
    }
  }, [user]);
  if (user?.id !== userId) {
    return <PageNotFound />;
  } else if (user) {
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
          {/* img and radio desc section */}
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
              <Avatar
                size={"lg"}
                name={`${user?.firstName} ${user?.lastName}`}
              />

              <div>
                <Text>{isEn ? "profile" : "حساب"}</Text>

                <Heading as="h2" size="lg" fontFamily={"inherit"}>
                  {user?.firstName} {user?.lastName}
                </Heading>

                <Text> {isEn ? "member" : "عضو"} </Text>
              </div>
            </Flex>

            <div>
              <IconButton
                as={Link}
                to={`/profile/${user?.id}/edit`}
                icon={<MdOutlineEdit className="text-4xl" />}
                variant={"ghost"}
                rounded={9999}
                colorScheme="whiteAlpha"
                color={"white"}
                p={3}
                aria-label="Options"
              />
            </div>
          </Flex>

          {/* last played section */}
          {user.lastPlayed.length ? (
            <Flex flexDirection={"column"} px={2} gap={3} py={4}>
              <Heading as="h2" size="lg" fontFamily={"inherit"}>
                {isEn ? "last played" : "اخر ما تم تشغيله"}{" "}
                <FaCirclePlay className="inline" />
              </Heading>

              <div className=" flex overflow-x-scroll  my-5 pb-2 gap-5">
                {lastPlayedList.map((audio, i) => (
                  <AudioCard audio={audio} key={i} playList={lastPlayedList} />
                ))}
              </div>
              <Text
                as={Link}
                to={`/profile/${user.id}/lastplayed`}
                fontFamily={"inherit"}
                className="inline w-max"
                _hover={{ color: "sec.400" }}
              >
                {isEn ? "show all last played" : "عرض كل اخر ما تم تشغيله"}
              </Text>
            </Flex>
          ) : (
            ""
          )}

          {/* liked reciters section */}
          {user.likedReciters.length ? (
            <Flex flexDirection={"column"} px={2} gap={3} py={4}>
              <Heading as="h2" size="lg" fontFamily={"inherit"}>
                {isEn ? "liked reciters" : "الشيوخ المفضلين"}{" "}
                <FaHeart className="text-3xl text-red-600 inline" />
              </Heading>

              <div className=" flex overflow-x-scroll  my-5 pb-2 gap-5">
                {user.likedReciters.slice(0, 20).map((reciter, i) => (
                  <ReciterCard isEn={isEn} reciter={reciter} key={i} />
                ))}
              </div>

              <Text
                as={Link}
                to={`/profile/${user.id}/likedreciters`}
                fontFamily={"inherit"}
                className="inline w-max"
                _hover={{ color: "sec.400" }}
              >
                {isEn ? "show all liked reciters" : "عرض كل الشيوخ المفضلين"}
              </Text>
            </Flex>
          ) : (
            ""
          )}

          {/* playlists */}
          {Object.values(user.playLists).map((playList, i) => (
            <Flex key={i} flexDirection={"column"} px={2} gap={3} py={4}>
              <Heading
                as="h2"
                size="lg"
                fontFamily={"inherit"}
                display={"flex"}
                alignItems={"center"}
                gap={2}
              >
                {playList.name}{" "}
                <FaList className="text-2xl text-[#1EBC4B] inline" />
              </Heading>

              <div className=" flex overflow-x-scroll  my-5 pb-2 gap-5">
                {playList.list.map((audio, i) => (
                  <AudioCard audio={audio} key={i} playList={playList.list} />
                ))}
              </div>

              <Text
                as={Link}
                to={`/profile/${user.id}/playlist/${playList.name}`}
                fontFamily={"inherit"}
                className="inline w-max"
                _hover={{ color: "sec.400" }}
              >
                {isEn ? `show ${playList.name}` : `عرض ${playList.name}`}
              </Text>
            </Flex>
          ))}
        </Flex>
      </>
    );
  }
};

export default Profile;
