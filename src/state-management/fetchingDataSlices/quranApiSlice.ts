import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IReciter, IRewaya, ISurah } from "../../lib/types";

export const quranApiSlice = createApi({
  reducerPath: "quran api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mp3quran.net/api/v3" }),
  endpoints: (builder) => ({
    getReciters: builder.query<{ reciters: IReciter[] }, boolean>({
      query: (isEn) => `/reciters?language=${isEn ? "eng" : "ar"}`,
    }),
    getSuwar: builder.query<{ suwar: ISurah[] }, boolean>({
      query: (isEn) => `suwar?language=${isEn ? "eng" : "ar"}`,
    }),
    getRewayat: builder.query<{ riwayat: IRewaya[] }, boolean>({
      query: (isEn) => `riwayat?language=${isEn ? "eng" : "ar"}`,
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
