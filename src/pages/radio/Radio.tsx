import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import Loading from "../../components/Loading";
import SideBar from "../../components/SideBar";
import { IRadio, arNetWorkErr, enNetWorkErr } from "../../lib/types";
import { useGetRadiosQuery } from "../../state-management/fetchingDataSlices/quranApiSlice";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import PageNotFound from "../PageNotFound";
import radioImg from "../../assets/radio.png";
import { FaPlay } from "react-icons/fa6";
import {
  setAudioIndex,
  setRadioList,
} from "../../state-management/soundSlices/soundPlayerSlice";
import { motion } from "framer-motion";

const Radio = () => {
  const { isEn } = useAppSelector((state) => state.settings);

  const { isFetching, isError, data } = useGetRadiosQuery(isEn);

  const dispatch = useAppDispatch();

  //play surah function
  const playSurah = (index: number, radios: IRadio[]) => {
    dispatch(setRadioList(radios));
    dispatch(setAudioIndex(index));
  };

  //return
  if (isFetching) {
    return <Loading divMinHight="100vh" loaderSize={15} />;
  } else if (isError) {
    <PageNotFound {...(isEn ? enNetWorkErr : arNetWorkErr)} />;
  } else if (data?.radios) {
    return (
      <>
        <SideBar />

        <Flex
          minH={"100vh"}
          bg={"third"}
          className="col-span-full md:col-span-8"
          direction={"column"}
        >
          {/* img and radio desc section */}
          <Flex
            p={8}
            alignItems="center"
            bgGradient="linear(to-b, third, main)"
            flexWrap={"wrap"}
            textAlign={"center"}
            className="justify-center lg:justify-start"
          >
            <motion.img
              src={radioImg}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="max-w-[20%] "
              alt="radio image"
            />

            <Box m={6}>
              <Heading as="h2" size="lg" fontFamily={"inherit"}>
                {isEn ? "quran live radio" : "راديو قرأن مباشر"}
              </Heading>
              <Text mt={2}>
                {data.radios.length} {isEn ? "available radio" : "راديو متاح"}
              </Text>
            </Box>
          </Flex>

          {/* radios */}

          <Flex flexDirection={"column"} p={2}>
            {data.radios.map((radio, index) => (
              <Flex
                key={index}
                w={"100%"}
                rounded={"xl"}
                p={4}
                gap={4}
                alignItems={"center"}
                onClick={() => playSurah(index, data.radios)}
                className="group hover:bg-gray-500 hover:bg-opacity-30 text-center cursor-pointer"
              >
                <p className="inline-block group-hover:hidden">{index + 1}</p>
                <FaPlay className="hidden group-hover:inline  hover:text-gray-400 duration-[25ms]" />
                <Avatar
                  className="shadow-lg shadow-black"
                  size="sm"
                  name={radio.name}
                />

                <p className="grow">{radio.name}</p>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </>
    );
  }
};

export default Radio;
