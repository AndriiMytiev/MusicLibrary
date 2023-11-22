import { makeAutoObservable } from "mobx";
import RootStore from "..";
import { User } from "../../types/authPage";

export default class GlobalStore {
  rootStore: RootStore;
  currentUser: User | null = {
    id: 1,
    login: "Galious",
    password: "admin",
    name: "Andrii",
    surname: "Mytiev",
    info: "",
    avatar: null,
    favourites: null,
    admin: true,
  };

  isEditPageAvailable: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setCurrentUser = (user: User | null) => {
    this.currentUser = user;
  };

  setIsEditPageAvailable = (isAvailable: boolean) => {
    this.isEditPageAvailable = isAvailable;
  };
}
