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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";
import { IoLanguage } from "react-icons/io5";
import {
  getUser,
  unSetUser,
} from "../state-management/userDetSlice/userDetSlice";
import { useEffect, useRef, useState } from "react";
import { unSetUserId } from "../state-management/userDetSlice/userLoginSlice";
import Loading from "./Loading";
import {
  setArLang,
  setEnLang,
} from "../state-management/settingsSlice/settingsSlice";
import { setNavH } from "../state-management/navBarSlice";
import AlertMessage from "./AlertMessage";

const NavBar = () => {
  //lang modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  //scroll states
  const [scrollY, setScrollY] = useState(0);
  const [scrollUp, setScrollUp] = useState(true);

  //redux distruct
  const { user, userLoading } = useAppSelector((state) => state.userDet);
  const { isEn } = useAppSelector((state) => state.settings);
  const {
    logedIn,
    uIL1c5cVta2, //user Id
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //logout
  const logOut = () => {
    dispatch(unSetUser());
    dispatch(unSetUserId());
    navigate("/");
  };

  //scroll function
  const handleScroll = () => {
    if (scrollY > window.scrollY) {
      setScrollUp(true);
    } else if (scrollY < window.scrollY) {
      setScrollUp(false);
    }
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    //check user login
    if (logedIn) {
      dispatch(getUser(uIL1c5cVta2 as string));
    }
  }, []);

  useEffect(() => {
    //scroll handler
    setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, scrollUp]);

  //nav ref and height handler
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navRef.current) {
      dispatch(setNavH(scrollUp ? navRef.current.clientHeight : 0));
    }
  }, [navRef.current?.clientHeight, scrollY]);
  return (
    <Flex
      as="nav"
      ref={navRef}
      minH={"50px"}
      bg={"main"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p="1rem"
      boxShadow={"2px -8px 20px 20px black"}
      position={"sticky"}
      zIndex={999}
      flexWrap={"wrap"}
      rowGap={"1rem"}
      top={scrollUp ? 0 : -48}
      // top={0}
      transitionDuration={"900ms"}
    >
      <Heading
        as={Link}
        to="/"
        size={["sm", "sm", "md", "md", "lg", "lg"]}
        className="hover:scale-105"
        fontFamily={"inherit"}
      >
        {isEn ? "quran" : "قرأن"}
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
          // onChange={() => `)}
          bg={"third"}
          className="focus-within:w-[200px] md:focus-within:w-[450px]  p-3 md:p-5 overflow-hidden w-[40px] h-[40px] md:w-[400px] md:h-[40px] hover:w-[200px] md:hover:w-[450px]  shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
        >
          <div className="flex items-center justify-center fill-white">
            <FaSearch className="md:text-lg lg:text-2xl" />
          </div>
          <input
            onChange={(e) => navigate(`/search/${e.target.value}`)}
            type="text"
            placeholder={
              isEn ? "what do you want to listen?" : "ماذا تريد ان تسمع؟"
            }
            className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
          />
        </Box>
      </Flex>

      {/* choose lang  */}

      <Button
        variant="ghost"
        color={"white"}
        rounded={999}
        colorScheme="whiteAlpha"
        leftIcon={<IoLanguage />}
        onClick={onOpen}
      >
        {isEn ? "English" : "العربيه"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"third"} color={"white"}>
          <ModalHeader>{isEn ? "choose language" : "اختار اللغه"}</ModalHeader>
          <ModalCloseButton
            left={isEn ? "unset" : 2}
            right={isEn ? 2 : "unset"}
          />
          <ModalBody>
            <Button
              variant="ghost"
              color={"white"}
              rounded={999}
              colorScheme="whiteAlpha"
              w={"100%"}
              onClick={() => {
                dispatch(setArLang()), onClose();
              }}
            >
              {isEn ? "Arabic" : "العربيه"}
            </Button>
            <Button
              variant="ghost"
              color={"white"}
              rounded={999}
              colorScheme="whiteAlpha"
              w={"100%"}
              onClick={() => {
                dispatch(setEnLang()), onClose();
              }}
            >
              {isEn ? "English" : "الانجليزيه"}
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="sec" mr={3} onClick={onClose}>
              {isEn ? "Close" : "اغلاق"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
          {isEn ? "SignUp" : "انشاء حساب"}
        </Button>
        <Button
          size={["sm", "sm", "md", "md", "md", "lg"]}
          className="hover:scale-110"
          rounded={9999}
          colorScheme="gray"
          as={Link}
          to="/login"
        >
          {isEn ? "LogIn" : "تسجيل الدخول"}
        </Button>
      </Flex>

      {/* Menu Select when User is login */}
      <Flex hidden={!user}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<CgProfile className="text-3xl" />}
            variant={"text"}
            aria-label={isEn ? "Options" : "الخيارات"}
          ></MenuButton>
          <MenuList bg={"third"} borderColor={"main"}>
            <MenuGroup title={isEn ? "Options" : "الخيارات"}>
              <MenuItem
                bg={"third"}
                borderColor={"main"}
                _hover={{ bg: "sec.600" }}
                as={Link}
                to={`/profile/${user?.id}`}
              >
                {isEn ? "My Profile" : "حسابي"}
              </MenuItem>
              <MenuItem
                bg={"third"}
                borderColor={"main"}
                _hover={{ bg: "sec.600" }}
                as={Link}
                to={`/favlist/${user?.id}`}
              >
                {isEn ? "Favouraties" : "المفضله"}
              </MenuItem>

              <MenuItem
                bg={"third"}
                borderColor={"main"}
                _hover={{ bg: "sec.600" }}
                as={Link}
                to="/settings"
              >
                {isEn ? "Settings" : "الاعدادات"}
              </MenuItem>
              <MenuDivider color={"white"} />
              <AlertMessage onClick={logOut} title="log out">
                <MenuItem
                  bg={"third"}
                  color={"red"}
                  borderColor={"main"}
                  _hover={{ bg: "sec.600", color: "white" }}
                >
                  {isEn ? "Log Out" : "تسجيل الخروج"}
                </MenuItem>
              </AlertMessage>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
