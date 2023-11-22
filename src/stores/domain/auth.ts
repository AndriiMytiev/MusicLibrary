import { makeAutoObservable } from "mobx";
import RootStore from "..";
import { AuthPageState, User } from "../../types/authPage";
import axios, { AxiosError } from "axios";
import { Simulate } from "react-dom/test-utils";

export default class AuthStore {
  rootStore: RootStore;
  login: string = "";
  password: string = "";

  state: AuthPageState = "login";
  loginError: boolean = false;
  registrationError: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setLogin = (value: string) => {
    this.login = value;
  };

  setPassword = (value: string) => {
    this.password = value;
  };

  setLoginError = (error: boolean) => {
    this.loginError = error;
  };

  processLogin = () => {
    let tempUser: User | null = null;
    try {
      this.rootStore.usersStore.users.forEach((user) => {
        if (this.login === user?.login && this.password === user.password) {
          tempUser = user;
        }
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Login error:", axiosError.message);
    }
    if (tempUser) {
      this.rootStore.globalStore.currentUser = tempUser;
      this.setLogin("");
      this.setPassword("");
      this.setLoginError(false);
    } else {
      this.setLoginError(true);
      console.log("user not found");
    }
  };

  processRegistration = async () => {
    try {
      // Перевірка чи існує користувач з таким логіном
      const userExists = this.rootStore.usersStore.users.some(
        (user) => user.login === this.login,
      );

      if (!userExists) {
        this.registrationError = false;

        // Реєстрація нового користувача
        const response = await axios.post("http://localhost:8080/api/user", {
          login: this.login,
          password: this.password,
          admin: false,
        });

        await this.rootStore.usersStore.getUsers();
        this.rootStore.globalStore.setCurrentUser(response.data);
        this.setLogin("");
        this.setPassword("");
        console.log("New user registered:", response.data);
      } else {
        // Якщо користувач з таким логіном вже існує, виведіть помилку
        this.registrationError = true;
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  processUserDelete = async (id: number) => {
    try {
      // Виконати запит DELETE для видалення користувача з вказаним id
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      // Оновити список користувачів після видалення
      if (id === this.rootStore.globalStore.currentUser?.id) {
        this.rootStore.globalStore.currentUser = null;
      }
      await this.rootStore.usersStore.getUsers();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error deleting user:", axiosError.message);
    }
  };

  setAuthPageStateToRegistration = () => {
    this.state = "registration";
  };

  setAuthPageStateToLogin = () => {
    this.state = "login";
  };
}
