import { FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../state-management/hooks";
import { ComponentType } from "react";
import { FaList, FaRadio } from "react-icons/fa6";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
} from "@chakra-ui/react";
import LastPlayedListItem from "../LastPlayedListItem";
import { MdLastPage } from "react-icons/md";
import PlayListItem from "../../pages/playList/components/PlayListItem";
import NewPlayList from "./../NewPlayList";

type TLinks = {
  name: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
}[];

const links = (isEn: boolean): TLinks => [
  {
    name: isEn ? "home" : "الصفحه الرئيسيه",
    to: "/",
    icon: FaHome,
  },
  { name: isEn ? "radio" : "راديو", to: "/radio", icon: FaRadio },
  { name: isEn ? "search" : "البحث", to: "/search", icon: FaSearch },
];

const SideBarContent = ({ onClose }: { onClose: () => void }) => {
  const { isEn } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.userDet);

  return (
    <div className=" w-full justify-start flex flex-col gap-3 py-5 !pb-96">
      {links(isEn).map((link) => (
        <Link
          key={link.to}
          onClick={onClose}
          className="w-full py-3 hover:bg-gray-500 hover:bg-opacity-30 rounded-full flex gap-3 px-5 items-center"
          to={link.to}
        >
          <link.icon className="text-xl" /> {link.name}
        </Link>
      ))}
      <hr />

      <Accordion defaultIndex={[0]} allowMultiple>
        {user?.lastPlayed.length ? (
          <AccordionItem border={0}>
            <h2 className="w-full  hover:bg-gray-500 hover:bg-opacity-30 rounded-full flex gap-3  my-1 items-center">
              <AccordionButton>
                <Flex
                  gap={2}
                  as="span"
                  flex="1"
                  alignItems={"center"}
                  textAlign="left"
                >
                  <MdLastPage className="text-3xl" />{" "}
                  {isEn ? "LastPlayed" : "اخر ما تم تشغيله"}
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
              <Flex flexDirection={"column"} w={"100%"}>
                {user.lastPlayed.slice(0, 4).map((audio, i) => (
                  <LastPlayedListItem
                    audio={audio}
                    index={i}
                    playList={user.lastPlayed}
                    key={i}
                  />
                ))}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        ) : (
          ""
        )}

        {user
          ? Object.values(user.playLists).map((playList, i) => (
              <AccordionItem border={0} key={i}>
                <h2 className="w-full py-1 hover:bg-gray-500 hover:bg-opacity-30 rounded-full flex gap-3  my-1 items-center">
                  <AccordionButton>
                    <Flex
                      gap={2}
                      as="span"
                      flex="1"
                      alignItems={"center"}
                      textAlign="left"
                    >
                      <FaList className="text-xl" /> {playList.name}
                    </Flex>

                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                <AccordionPanel p={0}>
                  <Flex flexDirection={"column"} w={"100%"}>
                    {playList.list.length ? (
                      playList.list
                        .slice(0, 4)
                        .map((audio, i) => (
                          <PlayListItem
                            audio={audio}
                            index={i}
                            playList={playList}
                            key={i}
                          />
                        ))
                    ) : (
                      <h2 className="text-center">
                        {isEn
                          ? "no audios added yet."
                          : "لا يوجد سور اضيفت بعد."}
                      </h2>
                    )}

                    <Button
                      onClick={onClose}
                      colorScheme="sec"
                      rounded={9999}
                      as={Link}
                      to={`/profile/${user.id}/playlist/${playList.name}`}
                      fontFamily={"inherit"}
                      className="inline w-max self-center my-4 hover:shadow-green-500 hover:shadow"
                    >
                      {isEn ? `show ${playList.name}` : `عرض ${playList.name}`}
                    </Button>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            ))
          : ""}
      </Accordion>

      {user ? (
        <>
          {user.lastPlayed.length ? <hr /> : ""}
          <NewPlayList>
            <Button
              colorScheme="sec"
              rounded={9999}
              className="inline w-full self-center my-4 hover:shadow-green-500 hover:shadow"
            >
              {isEn ? "+ add playList" : "+ اضافه قائمة تشغيل جديده"}
            </Button>
          </NewPlayList>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBarContent;
