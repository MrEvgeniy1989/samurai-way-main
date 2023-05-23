import axios from "axios";
import { UserType } from "../types/types";

// Types
type MeReSTResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodesEnum;
  messages: string[];
};
type LoginResponseType = {
  data: { userId: number };
  resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum;
  messages: string[];
};

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "abf07995-8043-4f5a-aea7-fbec3de5488c",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};