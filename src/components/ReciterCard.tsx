import { Avatar, Flex, IconButton, Text, WrapItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IReciter, TMoshaf } from "../lib/types";
import { recitersPhotos } from "../lib/recitersPhotos";
import { setPlayList } from "../state-management/soundSlices/soundPlayerSlice";
import { useAppDispatch } from "../state-management/hooks";
import { useGetSuwarQuery } from "../state-management/fetchingDataSlices/quranApiSlice";
import { FaPlay } from "react-icons/fa6";

type reciterCardProps = { reciter: IReciter; isEn: boolean };

const ReciterCard = ({ reciter, isEn }: reciterCardProps) => {
  const dispatch = useAppDispatch();
  const { data: suwarData } = useGetSuwarQuery(isEn);

  const handlePlayListClick = async (
    moshaf: TMoshaf,
    img: string,
    name: string
  ) => {
    const suwar = await suwarData;
    if (suwar) {
      dispatch(setPlayList({ moshaf, suwar: suwar?.suwar, img, name }));
    }
  };

  return (
    <Flex
      as={Link}
      to={`/reciter/${reciter.id}`}
      key={reciter.id}
      flexDirection={"column"}
      px={6}
      py={4}
      w={150}
      gap={4}
      rounded={10}
      alignItems={"center"}
      justifyContent={"center"}
      className="group hover:bg-gray-500 hover:bg-opacity-30"
    >
      {" "}
      <WrapItem position={"relative"}>
        <Avatar
          className="shadow-lg shadow-black"
          size="2xl"
          name={reciter.name}
          src={recitersPhotos[reciter.id]}
        />{" "}
        <IconButton
          onClick={() =>
            handlePlayListClick(
              reciter.moshaf[0],
              recitersPhotos[reciter.id],
              reciter.name
            )
          }
          className=" group-hover:!scale-100 !scale-0    "
          position={"absolute"}
          bottom={0}
          isRound={true}
          variant="solid"
          colorScheme="sec"
          aria-label="play"
          fontSize="20px"
          color={"black"}
          icon={<FaPlay />}
        />
      </WrapItem>
      <Text fontSize={"0.8rem"} fontFamily={"inherit"}>
        {reciter.name}
      </Text>
    </Flex>
  );
};

export default ReciterCard;
