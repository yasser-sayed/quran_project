import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../state-management/hooks";

const PageNotFound = () => {
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
    >
      <Box>
        <Heading as="h1" size="2xl" mb={4}>
          404
        </Heading>
        <Text fontSize="xl" mb={4}>
          {isEn
            ? "Oops! The page you're looking for doesn't exist."
            : "ناسف! الصفحه التي تبحث عنها غير موجوده."}
        </Text>
        <Button
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
