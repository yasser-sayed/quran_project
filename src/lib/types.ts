import { z } from "zod";

export const logInSchema = z.object({
  userName: z.string().min(4, "userName can't be less than 4 characters"),
  password: z.string().min(5, "password should be at least 5 characters"),
  remmberMe: z.boolean(),
});

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "name must be atleast 2 characters")
      .refine(
        (value) => !/\d/.test(value),
        "Name must not contain any numbers"
      ),
    lastName: z
      .string()
      .min(2, "name must be atleast 2 characters")
      .refine(
        (value) => !/\d/.test(value),
        "Name must not contain any numbers"
      ),

    userName: z
      .string()
      .min(4, "userName must be more than 3 characters")
      .refine((value) => /[A-Z]/.test(value), {
        message: "userName must contain at least one uppercase letter",
      })
      .refine((value) => /[a-z]/.test(value), {
        message: "userName must contain at least one lowercase letter",
      }),

    email: z.string().email(),
    password: z
      .string()
      .min(5, "password should be at least 5 characters")
      .includes("!", { message: "password must cointain (!) sign" })
      .refine((value) => /\d/.test(value), "password should contain numbers"),

    confirmPassword: z.string(),
    gender: z.enum(["male", "female", "other"], {
      message: "please choose your gender",
    }),
    age: z.preprocess(
      (value) => Number(value),
      z
        .number()
        .int()
        .min(7, "you must be at least 7 years old")
        .max(100, "you must be under 100 years old")
    ),
    agreeTerms: z.boolean().refine((value) => value === true, {
      message: "please read and accepts our terms",
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "password don't match",
    path: ["confirmPassword"],
  });

export type TLogInSchema = z.infer<typeof logInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TPlayList = { name: string; shaykh: string[] };
export type TFavList = null | string[];
export type TLastPlayed = null | string[];
export type TPlayLists = null | {
  [key: string]: TPlayList;
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
  favList: TFavList;
  playLists: TPlayLists;
  lastPlayed: TLastPlayed;
}
