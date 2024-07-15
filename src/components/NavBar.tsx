import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";
import {
  getUser,
  unSetUser,
} from "../state-management/userDetSlice/userDetSlice";
import { useEffect } from "react";
import { unSetUserId } from "../state-management/userDetSlice/userLoginSlice";
import Loading from "./Loading";

const NavBar = () => {
  const { user, userLoading } = useAppSelector((state) => state.userDet);
  const {
    logedIn,
    uIL1c5cVta2, //user Id
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(unSetUser());
    dispatch(unSetUserId());
    navigate("/");
  };

  useEffect(() => {
    if (logedIn) {
      dispatch(getUser(uIL1c5cVta2 as string));
    }
  }, []);

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

      {/* login user loading */}

      <Loading divMinHight="unset" loaderSize={10} hidden={!userLoading} />

      {/* login and sign up */}
      <Flex
        hidden={!!user || userLoading}
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

      {/* Menu Select when User is login */}
      <Flex hidden={!user}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<CgProfile className="text-3xl" />}
            variant={"text"}
            aria-label="Options"
          ></MenuButton>
          <MenuList bg={"third"} borderColor={"main"}>
            <MenuGroup title="optins">
              <MenuItem
                bg={"third"}
                borderColor={"main"}
                _hover={{ bg: "sec.600" }}
                as={Link}
                to={`/profile/${user?.id}`}
              >
                My Account
              </MenuItem>
              <MenuItem
                bg={"third"}
                borderColor={"main"}
                _hover={{ bg: "sec.600" }}
                as={Link}
                to={`/favlist/${user?.id}`}
              >
                Favouraties{" "}
              </MenuItem>

              <MenuItem
                bg={"third"}
                borderColor={"main"}
                _hover={{ bg: "sec.600" }}
                as={Link}
                to="/settings"
              >
                Settings{" "}
              </MenuItem>
              <MenuDivider color={"white"} />
              <MenuItem
                onClick={logOut}
                bg={"third"}
                color={"red"}
                borderColor={"main"}
                _hover={{ bg: "sec.600", color: "white" }}
              >
                Log Out
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
