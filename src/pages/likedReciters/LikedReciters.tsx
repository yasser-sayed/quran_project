import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import PageNotFound from "../PageNotFound";
import SideBar from "../../components/SideBar";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa6";
import ReciterCard from "../../components/ReciterCard";
import AlertMessage from "./../../components/AlertMessage";
import { clearLikedReciters } from "../../state-management/userDetSlice/userDetSlice";

const LikedReciters = () => {
  const { userId } = useParams();

  const { isEn } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.userDet);

  const dispatch = useAppDispatch();

  if (user?.id !== userId) {
    return <PageNotFound />;
  }
  return (
    <>
      <SideBar />

      <Flex
        minH={"100vh"}
        bg={"third"}
        className="col-span-full md:col-span-8"
        direction={"column"}
        gap={4}
        py={8}
        px={3}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Heading as="h2" size="lg" fontFamily={"inherit"}>
            {isEn ? "liked reciters" : "الشيوخ المفضلين"}{" "}
            <FaHeart className="text-3xl text-red-600 inline" />
          </Heading>

          {user?.likedReciters.length ? (
            <AlertMessage
              onClick={() => dispatch(clearLikedReciters())}
              title={
                isEn ? "clear liked reciters" : "افراغ قائمه الشيوخ المفضلين"
              }
            >
              <Text
                cursor={"pointer"}
                fontFamily={"inherit"}
                className="inline w-max"
                _hover={{ color: "sec.400" }}
              >
                {isEn ? "clear liked reciters" : "افراغ قائمه الشيوخ المفضلين"}
              </Text>
            </AlertMessage>
          ) : (
            ""
          )}
        </Flex>

        <Flex
          flexWrap={"wrap"}
          textAlign={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={8}
        >
          {user?.likedReciters.map((reciter, i) => (
            <ReciterCard reciter={reciter} key={i} isEn={isEn} />
          ))}
        </Flex>

        {/* message if no reciters */}

        <Flex
          hidden={!!user?.likedReciters.length}
          justifyContent={"center"}
          alignItems={"center"}
          h={"100%"}
        >
          <Heading as="h2" size="lg" fontFamily={"inherit"}>
            {isEn ? "no liked reciters yet," : "لا يوجد شيوخ مفضلين بعد,"}{" "}
          </Heading>
        </Flex>
      </Flex>
    </>
  );
};

export default LikedReciters;
