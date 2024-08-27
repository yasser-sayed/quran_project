import {
  Avatar,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Select,
  Text,
} from "@chakra-ui/react";
import SideBar from "../../components/SideBar";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  useGetReciterQuery,
  useGetSuwarQuery,
} from "../../state-management/fetchingDataSlices/quranApiSlice";
import Loading from "../../components/Loading";
import PageNotFound from "../PageNotFound";
import { arNetWorkErr, enNetWorkErr } from "../../lib/types";
import { recitersPhotos } from "../../lib/recitersPhotos";
import { FaPlay } from "react-icons/fa6";
import { setReadyPlayList } from "../../state-management/soundSlices/soundPlayerSlice";
import { useEffect } from "react";
import {
  setMoshaf,
  setMoshafType,
  setReciter,
  setSuwarList,
} from "../../state-management/reciterSlice/reciterSlice";
import ReciterListItem from "./components/ReciterListItem";
import ReciterSearchBar from "./components/ReciterSearchBar";
import LoveAnimation from "./../../components/LoveAnimation";

const Reciter = () => {
  //redux distruct
  const { user } = useAppSelector((state) => state.userDet);
  const { isEn } = useAppSelector((state) => state.settings);
  const { moshafType, suwarList, moshaf, reciter, searchOn, searchSuwarList } =
    useAppSelector((state) => state.reciter);
  const { reciterId } = useParams<{ reciterId: string }>();
  const dispatch = useAppDispatch();

  const { isFetching, isError, data } = useGetReciterQuery({
    isEn,
    reciterId: Number(reciterId),
  });

  const { data: suwarData } = useGetSuwarQuery(isEn);

  //redux functions
  const handleMoshaf = () => {
    if (reciter && suwarData?.suwar) {
      dispatch(setMoshaf());

      dispatch(
        setSuwarList({
          img: recitersPhotos[reciter.id],
          name: reciter.name,
          suwar: suwarData.suwar,
          reciterId: reciter.id,
        })
      );
    }
  };

  //use effects
  useEffect(() => {
    handleMoshaf();
  }, [moshafType, suwarData, reciter]);

  useEffect(() => {
    if (data) {
      dispatch(setReciter(data.reciters[0]));
    }
  }, [data]);

  useEffect(() => {
    if (reciter) {
      dispatch(setMoshafType(reciter.moshaf[0].moshaf_type));
      return;
    }
  }, [reciter]);

  //return
  if (isFetching) {
    return <Loading divMinHight="100vh" loaderSize={15} />;
  } else if (isError) {
    <PageNotFound {...(isEn ? enNetWorkErr : arNetWorkErr)} />;
  } else if (reciter) {
    return (
      <>
        <SideBar />

        <Flex
          minH={"100vh"}
          bg={"third"}
          className="col-span-full md:col-span-8"
          direction={"column"}
        >
          {/* img, name and love section  */}
          <Flex
            p={8}
            alignItems="center"
            bgGradient="linear(to-b, third, main)"
            flexWrap={"wrap"}
            textAlign={"center"}
            className="justify-center lg:justify-start"
          >
            <Avatar
              className="shadow-lg shadow-black"
              size="2xl"
              src={recitersPhotos[reciter.id]}
            />

            <Box m={6}>
              <Heading as="h2" size="lg" fontFamily={"inherit"}>
                {reciter.name}
              </Heading>
              <Text mt={2}>
                {" "}
                {moshaf?.surah_total} {isEn ? "surah" : "سوره"} ({moshaf?.name})
              </Text>
            </Box>

            {user ? (
              <LoveAnimation
                isLoved={
                  !!user?.likedReciters.find(
                    (favItem) => favItem.id === reciter.id
                  )
                }
                reciter={reciter}
                className="ms-auto"
              />
            ) : (
              ""
            )}
          </Flex>

          {/* play and moshaf type select */}
          <Flex
            gap={3}
            alignItems={"center"}
            px={6}
            py={4}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <IconButton
              onClick={() => dispatch(setReadyPlayList(suwarList))}
              isRound={true}
              variant="solid"
              colorScheme="sec"
              aria-label="play"
              size={"lg"}
              color={"black"}
              icon={<FaPlay />}
              className="shadow-lg shadow-[#1aa63e]"
            />

            <FormControl w="fit-content">
              <FormLabel>{isEn ? "rewaya" : "روايه"}</FormLabel>
              <Select
                maxW={"fit-content"}
                size={"sm"}
                className="!text-xs"
                value={moshafType}
                onChange={(e) => dispatch(setMoshafType(+e.target.value))}
              >
                {reciter.moshaf.map((moshaf, key) => (
                  <option
                    className="!bg-[#2A2A2A] text-xs !max-w-30"
                    key={key}
                    value={moshaf.moshaf_type}
                  >
                    {moshaf.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>

          {/* suwar search bar */}
          <ReciterSearchBar />

          {/* suwar */}

          <Flex flexDirection={"column"} p={2}>
            {searchOn && searchSuwarList.length ? (
              searchSuwarList.map((surah, index) => (
                <ReciterListItem
                  index={index}
                  surah={surah}
                  key={index}
                  suwarList={searchSuwarList}
                />
              ))
            ) : searchOn ? (
              <Flex h={"100%"} justifyContent={"center"} alignItems={"center"}>
                <Heading as="h1" size="2xl" fontFamily={"inherit"} my={28}>
                  {isEn ? "sorry, surah not found" : "نأسف, السوره غير موجوده"}
                </Heading>
              </Flex>
            ) : (
              suwarList.map((surah, index) => (
                <ReciterListItem
                  index={index}
                  surah={surah}
                  key={index}
                  suwarList={suwarList}
                />
              ))
            )}
          </Flex>
        </Flex>
      </>
    );
  }
};

export default Reciter;
