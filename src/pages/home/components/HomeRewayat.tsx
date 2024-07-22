import {
  FormControl,
  FormLabel,
  Select,
  Skeleton,
  TabPanel,
} from "@chakra-ui/react";
import { useGetRewayatQuery } from "../../../state-management/fetchingDataSlices/quranApiSlice";
import { useAppSelector } from "../../../state-management/hooks";
import PageNotFound from "../../PageNotFound";
import { enNetWorkErr, arNetWorkErr } from "./../../../lib/types";
import { useState } from "react";

const HomeRewayat = () => {
  const [rewayaId, setRewayaId] = useState(1);
  const { isEn } = useAppSelector((state) => state.settings);
  const { isError, isFetching, data } = useGetRewayatQuery(isEn);

  return (
    <TabPanel w="100%" display={"flex"}>
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
    </TabPanel>
  );
};

export default HomeRewayat;
