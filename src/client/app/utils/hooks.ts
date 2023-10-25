import secureLocalStorage from "nextjs-secure-local-storage";
import { IAuthData } from "@/app/types/auth";

export const useAuth = () => {
  const key = "authData";
  const authData = secureLocalStorage.getItem(key) as IAuthData;

  const accessToken = authData?.accessToken || null;
  const user = authData?.user || {};

  return { accessToken, user };
};
