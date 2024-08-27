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
import { useAppSelector } from "../state-management/hooks";
import { ReactNode } from "react";

interface IAlertMesageProps {
  children: ReactNode;
  title: string;
  onClick: () => void;
}

const AlertMessage = ({ children, title, onClick }: IAlertMesageProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isEn } = useAppSelector((state) => state.settings);

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"third"} color={"white"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton
            left={isEn ? "unset" : 2}
            right={isEn ? 2 : "unset"}
          />
          <ModalBody>
            {isEn ? "are you sure, do you want to " : " هل انت متأكد, هل تريد"}
            {title}?
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="sec"
              onClick={() => {
                onClick();
                onClose();
              }}
            >
              {title}
            </Button>
            <Button
              variant="ghost"
              color={"white"}
              colorScheme="whiteAlpha"
              mx={3}
              onClick={onClose}
            >
              {isEn ? "cancel" : "الغاء"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AlertMessage;
