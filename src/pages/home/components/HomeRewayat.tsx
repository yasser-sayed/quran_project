import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  Skeleton,
  TabPanel,
} from "@chakra-ui/react";
import {
  useGetReciterWithRewayaQuery,
  useGetRewayatQuery,
} from "../../../state-management/fetchingDataSlices/quranApiSlice";
import { useAppSelector } from "../../../state-management/hooks";
import PageNotFound from "../../PageNotFound";
import { enNetWorkErr, arNetWorkErr } from "./../../../lib/types";
import { useState } from "react";
import Loading from "../../../components/Loading";
import ReciterCard from "../../../components/ReciterCard";

const HomeRewayat = () => {
  const [rewayaId, setRewayaId] = useState(1);
  const { isEn } = useAppSelector((state) => state.settings);
  const { isError, isFetching, data } = useGetRewayatQuery(isEn);
  const {
    isError: reciterErr,
    isFetching: reciterLoading,
    data: reciters,
  } = useGetReciterWithRewayaQuery({ isEn, rewayaId });

  return (
    <TabPanel w="100%" display={"flex"} flexDir={"column"} gap={5}>
      {isFetching ? (
        <Skeleton maxW={60} height="20px" />
      ) : isError ? (
        <PageNotFound {...(isEn ? enNetWorkErr : arNetWorkErr)} />
      ) : (
        <FormControl maxW={80} alignSelf={"end"}>
          <FormLabel>rewaya</FormLabel>
          <Select
            value={rewayaId}
            onChange={(e) => setRewayaId(+e.target.value)}
          >
            {data?.riwayat.map((rewaya) => (
              <option
                className="!bg-[#2A2A2A] !max-w-30"
                key={rewaya.id}
                value={rewaya.id}
              >
                {rewaya.name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      {reciterLoading ? (
        //loading
        <Loading loaderSize={15} divMinHight="100vh" />
      ) : //error
      reciterErr ? (
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
          {reciters?.reciters.map((reciter, i) => (
            <ReciterCard reciter={reciter} key={i} isEn={isEn} />
          ))}
        </Flex>
      )}
    </TabPanel>
  );
};

export default HomeRewayat;
