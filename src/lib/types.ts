import { z } from "zod";
import { TPageNotFoundProps } from "../pages/PageNotFound";

export const createLogInSchema = (isEn: boolean) =>
  z.object({
    userName: z
      .string()
      .min(
        4,
        isEn
          ? "userName can't be less than 4 characters"
          : "اسم المستخدم لا يمكن ان يكون اقل من اربعة احرف"
      ),
    password: z
      .string()
      .min(
        5,
        isEn
          ? "password should be at least 5 characters"
          : "كلمه السر يجب ان تكون خمسة احرف علي الاقل"
      ),
    remmberMe: z.boolean(),
  });

export const createSignUpSchema = (isEn: boolean) =>
  z
    .object({
      firstName: z
        .string()
        .min(
          2,
          isEn
            ? "name must be atleast 2 characters"
            : "الاسم يجب ان يكون حرفين علي الاقل"
        )
        .refine(
          (value) => !/\d/.test(value),

          isEn
            ? "Name must not contain any numbers"
            : "الاسم يجب ان لا يحتوي علي اي ارقام"
        ),
      lastName: z
        .string()
        .min(
          2,
          isEn
            ? "name must be atleast 2 characters"
            : "الاسم يجب ان يكون حرفين علي الاقل"
        )
        .refine(
          (value) => !/\d/.test(value),
          isEn
            ? "Name must not contain any numbers"
            : "الاسم يجب ان لا يحتوي علي اي ارقام"
        ),

      userName: z
        .string()
        .min(
          4,
          isEn
            ? "userName must be more than 3 characters"
            : "اسم المستخدم يجب ان يكون اكقر من ثلاثه اخرف"
        )
        .refine((value) => /[A-Z]/.test(value), {
          message: isEn
            ? "userName must contain at least one uppercase letter"
            : "اسم المستخدم يجب ان يحتوي علي الاقل علي حرف انجليزي capital واحد",
        })
        .refine((value) => /[a-z]/.test(value), {
          message: isEn
            ? "userName must contain at least one lowercase letter"
            : "اسم المستخدم يجب ان يحتوي علي الاقل علي حرف انجليزي small واحد",
        }),

      email: z
        .string()
        .email({ message: isEn ? "invalid email" : "ايميل غير صالح" }),
      password: z
        .string()
        .min(
          5,
          isEn
            ? "password should be at least 5 characters"
            : "كلمه السر يجب ان تكون خمسة احرف علي الاقل"
        )
        .refine(
          (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
          isEn
            ? "password must contain at least one special character, example(!)"
            : "كلمه السر يجب ان تحتوي علي علامه واحده مميزه علي الاقل , مثال(!)"
        )
        .refine(
          (value) => /\d/.test(value),
          isEn
            ? "password should contain numbers"
            : "كلمه السر يجب ان تحتوي علي ارقام"
        ),

      confirmPassword: z.string(),
      gender: z.enum(["male", "female", "other"], {
        message: isEn ? "please choose your gender" : "الرجاء اختيار النوع",
      }),
      age: z.preprocess(
        (value) => Number(value),
        z
          .number()
          .int()
          .min(
            7,
            isEn
              ? "you must be at least 7 years old"
              : "يجب ان تكون علي الاقل سبعة اعوام"
          )
          .max(
            100,
            isEn
              ? "you must be under 100 years old"
              : "يجب ان تكون اقل من مائة عام "
          )
      ),
      agreeTerms: z.boolean().refine((value) => value === true, {
        message: isEn
          ? "please read and accepts our terms"
          : "برجاء الموافقه علي الشروط و الاحكام",
      }),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: isEn ? "password don't match" : "كلمه السر غير مطابقه",
      path: ["confirmPassword"],
    });

export type TLogInSchema = z.infer<ReturnType<typeof createLogInSchema>>;
export type TSignUpSchema = z.infer<ReturnType<typeof createSignUpSchema>>;

export interface IPlayList {
  name: string;
  desc: string;
  list: IAudio[];
}
export type TLikedReciters = IReciter[];
export type TLastPlayed = IAudio[];
export type TPlayLists = {
  [key: string]: IPlayList;
};

export interface User {
  readonly id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  age: number;
  gender: "male" | "female" | "other";
  likedReciters: TLikedReciters;
  playLists: TPlayLists;
  lastPlayed: TLastPlayed;
}

//quran types

export type TMoshaf = {
  id: number;
  name: string;
  server: string;
  surah_total: number;
  moshaf_type: number;
  surah_list: string;
};

export interface IReciter {
  id: number;
  name: string;
  letter: string;
  moshaf: TMoshaf[];
}

export interface ISurah {
  id: number;
  name: string;
  start_page?: number;
  end_page?: number;
  makkia?: number;
  type?: number;
}

export interface IRewaya {
  id: number;
  name: string;
}

export interface IAudio {
  id: number;
  src: string;
  img?: string;
  name?: string;
  writer?: string;
  writerId?: number;
  live?: boolean;
}

export interface IRadio {
  id: number;
  name: string;
  url: string;
}

//network Error data

export const arNetWorkErr: TPageNotFoundProps = {
  heading: "خطأ",
  hideBtn: true,
  text: "يبدو ان هناك بعض المشاكل في السيرفر",
};

export const enNetWorkErr: TPageNotFoundProps = {
  heading: "error",
  text: "looks like there is some preblems in the server",
  hideBtn: true,
};
