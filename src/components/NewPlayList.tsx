import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";
import { ReactNode, useState } from "react";
import { IPlayList } from "../lib/types";
import { addNewPlayList } from "../state-management/userDetSlice/userDetSlice";

interface INewPlayListProps {
  children: ReactNode;
}

const NewPlayList = ({ children }: INewPlayListProps) => {
  const [newPlayList, setNewPlayList] = useState<IPlayList>({
    name: "",
    desc: "",
    list: [],
  });
  const [titleReq, setTitleReq] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { isEn } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const submit = () => {
    setTitleReq("");
    if (!newPlayList.name) {
      setTitleReq(
        isEn ? "please enter playlist title" : "برجاء ادخال اسم قائمة التشغيل"
      );
    } else {
      dispatch(addNewPlayList(newPlayList));
      toast({
        title: isEn ? "playlist created." : "تم انشاء قائمة التشغيل",
        description: isEn
          ? "We've created your playlist for you."
          : "لقد قمنا بإنشاء قائمة التشغيل لك بنجاح.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      setNewPlayList({
        name: "",
        desc: "",
        list: [],
      });
    }
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={"third"} color={"white"}>
          <ModalHeader>
            {isEn ? "new playlist" : "قائمة تشغيل جديده"}
          </ModalHeader>
          <ModalCloseButton
            left={isEn ? "unset" : 2}
            right={isEn ? 2 : "unset"}
          />
          <ModalBody>
            <FormControl isInvalid={!!titleReq}>
              <FormLabel>{isEn ? "title" : "الاسم"}</FormLabel>
              <Input
                placeholder={isEn ? "title" : "الاسم"}
                value={newPlayList.name}
                onChange={(e) =>
                  setNewPlayList({ ...newPlayList, name: e.target.value })
                }
              />
              <FormErrorMessage>{titleReq}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{isEn ? "descripsion" : "وصف"}</FormLabel>
              <Input
                placeholder={isEn ? "descripsion" : "وصف القائمه"}
                value={newPlayList.desc}
                onChange={(e) =>
                  setNewPlayList({ ...newPlayList, desc: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="sec" mr={3} onClick={submit}>
              {isEn ? " create" : " انشاء"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewPlayList;
