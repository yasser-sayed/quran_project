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
import { ReactNode, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../state-management/hooks";
import { editPlayList } from "../../../state-management/userDetSlice/userDetSlice";
import { IPlayList } from "../../../lib/types";
import { useNavigate, useParams } from "react-router-dom";

interface IEditPlayListProps {
  children: ReactNode;
  playList: IPlayList;
}

const EditPlayList = ({ children, playList }: IEditPlayListProps) => {
  const { userId } = useParams();
  const [newPlayList, setNewPlayList] = useState<IPlayList>(playList);
  const [titleReq, setTitleReq] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { isEn } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = () => {
    setTitleReq("");
    if (!newPlayList.name) {
      setTitleReq(
        isEn ? "please enter playlist title" : "برجاء ادخال اسم قائمة التشغيل"
      );
    } else {
      dispatch(editPlayList({ newPlayList, playList }));
      navigate(`/profile/${userId}/playlist/${newPlayList.name}`);
      toast({
        title: isEn ? "playlist edited." : "تم التعديل على قائمة التشغيل",
        description: isEn
          ? "We've edited your playlist for you."
          : "لقد قمنا بالتعديل على قائمة التشغيل لك بنجاح.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
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
              {isEn ? " save" : " حفظ"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPlayList;
