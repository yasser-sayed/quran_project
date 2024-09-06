import { Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import SideBar from "../../components/sideBar/SideBar";
import { useAppSelector } from "../../state-management/hooks";
import { useParams } from "react-router-dom";
import NoValSearch from "./components/NoValSearch";
import {
  useGetReciterWithRewayaQuery,
  useGetRewayatQuery,
  useGetSuwarQuery,
} from "../../state-management/fetchingDataSlices/quranApiSlice";
import Loading from "../../components/Loading";
import PageNotFound from "../PageNotFound";
import { IReciter, arNetWorkErr, enNetWorkErr } from "../../lib/types";
import { useEffect, useState } from "react";
import ReciterCard from "../../components/ReciterCard";

const Search = ({ cols }: { cols: string }) => {
  //search value from params
  const { srchVal } = useParams();

  //states
  const [srchReciters, setSrchReciters] = useState<IReciter[]>([]);
  const [mainReciters, setMainReciters] = useState<IReciter[]>([]);
  const [rewayaId, setRewayaId] = useState<number | "none">("none");
  const [surahId, setSurahId] = useState<number | "none">("none");

  //redux distruct
  const { isEn } = useAppSelector((state) => state.settings);
  const {
    isFetching: recitersIsFetching,
    isError: recitersIsError,
    data: recitersData,
  } = useGetReciterWithRewayaQuery({
    isEn,
    rewayaId: rewayaId !== "none" ? rewayaId : null,
  });

  const {
    isFetching: suwarIsFetching,
    isError: suwarIsError,
    data: suwarData,
  } = useGetSuwarQuery(isEn);

  const {
    isFetching: rewayatIsFetching,
    isError: rewayatIsError,
    data: rewayatData,
  } = useGetRewayatQuery(isEn);

  //filters
  const searchFilter = () => {
    if (srchVal && recitersData) {
      let filteredReciters = recitersData.reciters.filter((reciter) =>
        reciter.name.includes(srchVal)
      );
      setSrchReciters(filteredReciters);
      setMainReciters(filteredReciters);
    } else if (recitersData) {
      setSrchReciters(recitersData.reciters);
      setMainReciters(recitersData.reciters);
    }
  };

  const suwarFilter = () => {
    searchFilter();
    if (surahId !== "none") {
      const newSrchReciters = mainReciters.filter((reciter) =>
        reciter.moshaf.some((mushaf) =>
          mushaf.surah_list.split(",").some((surah) => +surah === surahId)
        )
      );
      setSrchReciters(newSrchReciters);
    }
  };

  //useEffect handler
  useEffect(() => {
    searchFilter();
  }, [srchVal, recitersData]);

  useEffect(() => {
    suwarFilter();
  }, [surahId]);

  return (
    <>
      <SideBar />

      {suwarIsFetching || rewayatIsFetching || recitersIsFetching ? (
        <Loading divMinHight="100vh" loaderSize={15} />
      ) : suwarIsError || rewayatIsError || recitersIsError ? (
        <PageNotFound {...(isEn ? enNetWorkErr : arNetWorkErr)} />
      ) : (
        recitersData?.reciters && (
          <Flex
            minH={"100vh"}
            bg={"third"}
            className={`col-span-full lg:col-span-${cols}`}
            direction={"column"}
            p={8}
          >
            <FormControl maxW={80} alignSelf={"end"}>
              <FormLabel>rewaya</FormLabel>
              <Select
                value={rewayaId}
                onChange={(e) => setRewayaId(+e.target.value)}
              >
                <option className="!bg-[#2A2A2A] !max-w-30" value="none">
                  none
                </option>
                {rewayatData?.riwayat.map((rewaya) => (
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

            <FormControl maxW={"fit-content"} alignSelf={"end"}>
              <FormLabel>surah</FormLabel>
              <Select
                value={surahId}
                onChange={(e) =>
                  setSurahId(
                    e.target.value !== "none" ? +e.target.value : e.target.value
                  )
                }
              >
                <option className="!bg-[#2A2A2A] !max-w-30" value="none">
                  none
                </option>
                {suwarData?.suwar.map((surah) => (
                  <option
                    className="!bg-[#2A2A2A] !max-w-30"
                    key={surah.id}
                    value={surah.id}
                  >
                    {surah.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            {
              <Flex
                flexWrap={"wrap"}
                textAlign={"center"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={8}
              >
                {srchReciters.length ? (
                  srchReciters.map((reciter, index) => (
                    <ReciterCard isEn={isEn} reciter={reciter} key={index} />
                  ))
                ) : (
                  <NoValSearch />
                )}
              </Flex>
            }
          </Flex>
        )
      )}
    </>
  );
};

export default Search;
