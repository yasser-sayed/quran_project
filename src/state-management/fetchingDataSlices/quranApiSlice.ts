import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IReciter, IRewaya, ISurah } from "../../lib/types";

export const quranApiSlice = createApi({
  reducerPath: "quran api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mp3quran.net/api/v3" }),
  endpoints: (builder) => ({
    getReciters: builder.query<{ reciters: IReciter[] }, boolean>({
      query: (isEn) => `/reciters?language=${isEn ? "eng" : "ar"}`,
    }),
    getReciterWithRewaya: builder.query<
      { reciters: IReciter[] },
      { isEn: boolean; rewayaId: number }
    >({
      query: ({ isEn, rewayaId }) =>
        `/reciters?language=${isEn ? "eng" : "ar"}&&rewaya=${rewayaId}`,
    }),
    getSuwar: builder.query<{ suwar: ISurah[] }, boolean>({
      query: (isEn) => `suwar?language=${isEn ? "eng" : "ar"}`,
    }),
    getRewayat: builder.query<{ riwayat: IRewaya[] }, boolean>({
      query: (isEn) => `riwayat?language=${isEn ? "eng" : "ar"}`,
    }),
    getReciter: builder.query<
      { reciters: IReciter[] },
      { isEn: boolean; reciterId: number }
    >({
      query: ({ isEn, reciterId }) =>
        `reciters?language=${isEn ? "eng" : "ar"}&reciter=${reciterId}`,
    }),
  }),
});

export type QuranApiSlice = typeof quranApiSlice;
export const useGetRecitersQuery: QuranApiSlice["useGetRecitersQuery"] =
  quranApiSlice.useGetRecitersQuery;

export const useGetSuwarQuery: QuranApiSlice["useGetSuwarQuery"] =
  quranApiSlice.useGetSuwarQuery;

export const useGetRewayatQuery: QuranApiSlice["useGetRewayatQuery"] =
  quranApiSlice.useGetRewayatQuery;

export const useGetReciterQuery: QuranApiSlice["useGetReciterQuery"] =
  quranApiSlice.useGetReciterQuery;

export const useGetReciterWithRewayaQuery: QuranApiSlice["useGetReciterWithRewayaQuery"] =
  quranApiSlice.useGetReciterWithRewayaQuery;
