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
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../state-management/hooks";
import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa6";
import NewPlayList from "./NewPlayList";
import { IAudio } from "../lib/types";
import { addAudioToPlayList } from "../state-management/userDetSlice/userDetSlice";

interface IAddToPlayListProps {
  children: ReactNode;
  audio: IAudio;
}

const AddToPlayList = ({ children, audio }: IAddToPlayListProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //redux
  const { isEn } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.userDet);

  const dispatch = useAppDispatch();

  const handleAddToPlayList = (name: string) => {
    dispatch(addAudioToPlayList({ name, audio }));
    toast({
      title: isEn ? "surah added." : "السوره اضيفت",
      description: isEn
        ? `We've added ${audio.name} to ${name} for you.`
        : `لقد اضفنا سوره ${audio.name} الي ${name} بنجاح.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };
  if (user) {
    return (
      <>
        <div onClick={onOpen}>{children}</div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={"third"} color={"white"}>
            <ModalHeader>
              {isEn ? "add to playlist" : "اضافه الي قائمة تشغيل"}
            </ModalHeader>
            <ModalCloseButton
              left={isEn ? "unset" : 2}
              right={isEn ? 2 : "unset"}
            />
            <ModalBody px={0}>
              {Object.values(user.playLists).map((playList, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  color={"white"}
                  rounded={0}
                  colorScheme="whiteAlpha"
                  w={"100%"}
                  onClick={() => handleAddToPlayList(playList.name)}
                >
                  {playList.name}
                </Button>
              ))}

              <p
                className={`text-center ${
                  Object.keys(user.playLists).length && "hidden"
                }`}
              >
                {isEn
                  ? "there are no playlists yet,"
                  : "لا يوجد قوائم تشغيل بعد,"}{" "}
              </p>
            </ModalBody>

            <ModalFooter>
              <NewPlayList>
                <Button colorScheme="sec" mr={3}>
                  <FaPlus /> {isEn ? " new playlist" : " قائمة تشغيل جديده"}
                </Button>
              </NewPlayList>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};

export default AddToPlayList;
