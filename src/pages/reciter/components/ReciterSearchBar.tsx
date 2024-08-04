import { Box } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../state-management/hooks";
import { setWithReciterSearch } from "../../../state-management/reciterSlice/reciterSlice";
import { useEffect } from "react";

const ReciterSearchBar = () => {
  const { isEn } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWithReciterSearch(""));
    return;
  }, []);
  return (
    <Box
      bg={"main"}
      className="max-w-full p-3 mx-4 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
    >
      <div className="flex items-center justify-center fill-white">
        <FaSearch className="md:text-lg lg:text-2xl" />
      </div>
      <input
        type="search"
        placeholder={
          isEn
            ? "search in suwar (with choosen language)"
            : "ابحث في السور (باللغه المختاره)"
        }
        className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
        onChange={(e) => dispatch(setWithReciterSearch(e.target.value))}
      />
    </Box>
  );
};

export default ReciterSearchBar;
