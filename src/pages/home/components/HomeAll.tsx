import { Flex, TabPanel } from "@chakra-ui/react";
import ReciterCard from "../../../components/ReciterCard";
import { useGetRecitersQuery } from "../../../state-management/fetchingDataSlices/quranApiSlice";
import PageNotFound from "../../PageNotFound";
import Loading from "../../../components/Loading";
import { useAppSelector } from "../../../state-management/hooks";

const HomeAll = () => {
  const { isEn } = useAppSelector((state) => state.settings);
  const { isError, isFetching, data } = useGetRecitersQuery(isEn);

  return (
    <TabPanel>
      {isFetching ? (
        //loading
        <Loading loaderSize={15} divMinHight="100vh" />
      ) : //error
      isError ? (
        <PageNotFound
          heading={isEn ? "error" : "خطا"}
          text={
            isEn ? "there are some prblems in server" : "هناك مشاكل في السيرفر"
          }
        />
      ) : (
        //content when fullfield
        <Flex
          flexWrap={"wrap"}
          textAlign={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={8}
        >
          {data?.reciters.map((reciter, i) => (
            <ReciterCard reciter={reciter} key={i} isEn={isEn} />
          ))}
        </Flex>
      )}
    </TabPanel>
  );
};

export default HomeAll;
