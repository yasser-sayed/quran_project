import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  setArLang,
  setEnLang,
} from "../state-management/settingsSlice/settingsSlice";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";

const ChooseLang = ({ children }: { children: ReactNode }) => {
  //lang modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  //redux states
  const { isEn } = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();
  return (
    <>
      <div onClick={onOpen}>{children}</div>
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
    </>
  );
};

export default ChooseLang;
