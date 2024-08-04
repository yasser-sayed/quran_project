import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../state-management/hooks";

export type TPageNotFoundProps = {
  heading?: string;
  text?: string;
  hideBtn?: boolean;
};

const PageNotFound = ({
  hideBtn = false,
  heading = "404",
  text = "",
}: TPageNotFoundProps) => {
  const { isEn } = useAppSelector((state) => state.settings);
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgGradient="linear(to-b, third, main)"
      color="white"
      textAlign="center"
      p={4}
      className="col-span-full"
    >
      <Box>
        <Heading as="h1" size="2xl" mb={4}>
          {heading}
        </Heading>
        <Text fontSize="xl" mb={4}>
          {text
            ? text
            : isEn
            ? "Oops! The page you're looking for doesn't exist."
            : "ناسف! الصفحه التي تبحث عنها غير موجوده."}
        </Text>
        <Button
          hidden={hideBtn}
          as={Link}
          to="/"
          colorScheme="sec"
          variant="solid"
          size="lg"
          rounded="full"
        >
          {isEn ? "Go Home" : "عد للصفحه الرئيسيه"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PageNotFound;
