import secureLocalStorage from "nextjs-secure-local-storage";
import { IAuthData } from "@/app/types/auth";
export const storageKey = "authData";
export const checkAuthorization = () => {
  const authData = secureLocalStorage.getItem(storageKey) as IAuthData;
  const accessToken = authData?.accessToken;
  const user = authData?.user;

  return !!(accessToken && user?.user_id);
};

export const signOut = () => secureLocalStorage.removeItem(storageKey);

export const signIn = ({ accessToken, user }: IAuthData) =>
  secureLocalStorage.setItem("authData", { accessToken, user });
