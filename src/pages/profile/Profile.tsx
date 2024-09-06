import { Avatar, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/sideBar/SideBar";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import PageNotFound from "../PageNotFound";
import AudioCard from "../../components/AudioCard";
import { useEffect, useState } from "react";
import { IAudio, User } from "../../lib/types";
import { FaCirclePlay, FaHeart, FaList, FaTrash } from "react-icons/fa6";
import ReciterCard from "../../components/ReciterCard";
import AlertMessage from "./../../components/AlertMessage";
import { deleteUser } from "../../state-management/fetchingDataSlices/userApis";
import { unSetUser } from "../../state-management/userDetSlice/userDetSlice";
import { unSetUserId } from "../../state-management/userDetSlice/userLoginSlice";

const Profile = ({ cols }: { cols: string }) => {
  const { userId } = useParams();

  const [lastPlayedList, setlastPlayedList] = useState<IAudio[]>([]);

  const { isEn } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.userDet);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const deleteAccount = (user: User) => {
    // delete user function
    dispatch(deleteUser(user));

    // remove user from redux
    dispatch(unSetUser());

    //remove user id
    dispatch(unSetUserId());

    //toast done message
    toast({
      title: isEn ? "user deleted successfully." : "تم حذف المستخدم بنجاحز",
      description: isEn
        ? "We've deleted your account successfully."
        : "لقد قمنا بحذف حسابك بنجاح.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    navigate("/");
  };

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
          className={`col-span-full lg:col-span-${cols}`}
          direction={"column"}
          gap={4}
        >
          {/* img and delete account section */}
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
              <AlertMessage
                title="delete your account"
                onClick={() => deleteAccount(user)}
              >
                <FaTrash className="text-2xl cursor-pointer hover:text-red-700 text-red-500" />
              </AlertMessage>
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
