import { Box, Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

const NavBar = () => {
  return (
    <Flex
      as="nav"
      minH={"50px"}
      bg={"main"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p="1rem"
      boxShadow={"2px -8px 20px 20px black"}
      position={"sticky"}
      top={0}
      zIndex={999}
      flexWrap={"wrap"}
      rowGap={"1rem"}
    >
      <Heading
        as={Link}
        to="/"
        size={["sm", "sm", "md", "md", "lg", "lg"]}
        className="hover:scale-105"
        fontFamily={"inherit"}
      >
        quran
      </Heading>

      {/* search bar */}

      <Flex alignItems={"center"} justifyContent={"center"} gap={"0.8rem"}>
        <IconButton
          as={Link}
          to={"/"}
          icon={<FaHome className="text-xl" />}
          aria-label={""}
          bg={"third"}
          color={"white"}
          colorScheme="grey"
          className="hover:scale-110"
          rounded={9999}
        />

        <Box
          bg={"third"}
          className="focus-within:w-[200px] md:focus-within:w-[450px]  p-3 md:p-5 overflow-hidden w-[40px] h-[40px] md:w-[400px] md:h-[40px] hover:w-[200px] md:hover:w-[450px]  shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
        >
          <div className="flex items-center justify-center fill-white">
            <FaSearch className="md:text-lg lg:text-2xl" />
          </div>
          <input
            type="text"
            placeholder="type here"
            className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
          />
        </Box>
      </Flex>

      {/* login and sign up */}
      <Flex
        gap={"1rem"}
        px={"1rem"}
        rounded={9999}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <Button
          size={["sm", "sm", "md", "md", "md", "lg"]}
          className="hover:scale-110"
          variant={"text"}
          _hover={{ color: "gray.100" }}
          as={Link}
          to="/signup"
          rounded={9999}
        >
          SignUp
        </Button>
        <Button
          size={["sm", "sm", "md", "md", "md", "lg"]}
          className="hover:scale-110"
          rounded={9999}
          colorScheme="gray"
          as={Link}
          to="/login"
        >
          LogIn
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
