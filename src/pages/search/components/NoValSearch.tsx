import { Flex, Heading } from "@chakra-ui/react";
import moshafImg from "../../../assets/mushaf.png";
import { useAppSelector } from "../../../state-management/hooks";

const NoValSearch = () => {
  const { isEn } = useAppSelector((state) => state.settings);
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-evenly"}
      flexDirection={"column"}
      minH={"80vh"}
    >
      <img src={moshafImg} alt="moshaf img" className="max-w-80" />

      <Heading size={"lg"} fontFamily={"inherit"}>
        {isEn ? "reciter not found :(" : "الشيخ غير موجود :("}
      </Heading>
    </Flex>
  );
};

export default NoValSearch;
