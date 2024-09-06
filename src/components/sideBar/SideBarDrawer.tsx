import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useAppSelector } from "../../state-management/hooks";
import ChooseLang from "../ChooseLang";
import { IoLanguage } from "react-icons/io5";
import SideBarContent from "./SideBarContent";

const SideBarDrawer = ({ children }: { children: ReactNode }) => {
  const { isEn } = useAppSelector((state) => state.settings);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        size={"full"}
        onClose={onClose}
        colorScheme="blackAlpha"
      >
        <DrawerOverlay />
        <DrawerContent bg={"main"} color={"white"}>
          <DrawerCloseButton
            right={isEn ? 3 : "unset"}
            left={isEn ? "unset" : 3}
          />
          <DrawerHeader display={"flex"} alignItems={"center"} gap={6}>
            {isEn ? "quran app" : "تطبيق القرأن"}

            {/* choose lang */}
            <ChooseLang>
              <Button
                variant="ghost"
                color={"white"}
                rounded={999}
                colorScheme="whiteAlpha"
                leftIcon={<IoLanguage />}
              >
                {isEn ? "English" : "العربيه"}
              </Button>
            </ChooseLang>
          </DrawerHeader>
          <hr />
          <DrawerBody>
            <SideBarContent onClose={onClose} />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBarDrawer;
