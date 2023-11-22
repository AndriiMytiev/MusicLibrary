import { createContext } from "react";
import AuthStore from "./domain/auth";
import GlobalStore from "./domain/global";
import UsersStore from "./domain/users";

export default class RootStore {
  globalStore = new GlobalStore(this);
  authStore = new AuthStore(this);
  usersStore = new UsersStore(this);
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
