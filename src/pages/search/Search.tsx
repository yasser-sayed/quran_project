import { Box, Flex } from "@chakra-ui/react";
import SideBar from "../../components/SideBar";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "../../state-management/hooks";

const Search = () => {
  const { isEn } = useAppSelector((state) => state.settings);
  return (
    <>
      <SideBar />

      <Flex
        minH={"100vh"}
        bg={"third"}
        className="col-span-full md:col-span-8"
        direction={"column"}
        p={8}
      >
        <Box
          bg={"main"}
          className="focus-within:w-[200px] md:focus-within:w-[450px]  p-3 md:p-5 overflow-hidden w-[40px] h-[40px] md:w-[400px] md:h-[40px] hover:w-[200px] md:hover:w-[450px]  shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
        >
          <div className="flex items-center justify-center fill-white">
            <FaSearch className="md:text-lg lg:text-2xl" />
          </div>
          <input
            type="text"
            placeholder={
              isEn ? "what do you want to listen?" : "ماذا تريد ان تسمع؟"
            }
            className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
          />
        </Box>
      </Flex>
    </>
  );
};

export default Search;
