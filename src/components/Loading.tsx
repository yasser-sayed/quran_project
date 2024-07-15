import { Flex } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

type TLoadingProps = {
  loaderSize: number;
  divMinHight: "100vh" | "50vh" | "unset";
  divBgGradient?: "linear(to-b, third, main)" | "unset";
  hidden?: boolean;
};

const Loading = ({
  divMinHight,
  loaderSize,
  divBgGradient = "unset",
  hidden = false,
}: TLoadingProps) => {
  return (
    <Flex
      px={"1rem"}
      alignItems={"center"}
      justifyContent={"center"}
      bgGradient={divBgGradient}
      minH={divMinHight}
      hidden={hidden}
    >
      <BeatLoader color="#4bc970" size={loaderSize} />
    </Flex>
  );
};

export default Loading;
