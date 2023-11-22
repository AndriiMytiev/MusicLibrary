import { makeAutoObservable } from "mobx";
import RootStore from "..";
import { User } from "../../types/authPage";
import axios, { AxiosError } from "axios";

export default class UsersStore {
  rootStore: RootStore;

  users: User[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setUsers = (users: User[]) => {
    this.users = users;
  };

  getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      this.setUsers(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching users:", axiosError.message);
    }
  };

  getUserByID = async (userId: number): Promise<User | null> => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}`,
      );
      return response.data as User; // Повертаємо конкретного користувача
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching user:", axiosError.message);
      return null; // Повертаємо null у разі помилки
    }
  };

  processEditing = async (user: User) => {
    try {
      // Ваш запит PUT для оновлення користувача
      const response = await axios.put(`http://localhost:8080/api/users`, user);

      // Опціонально, обробляйте відповідь від сервера
      console.log("Updated user:", response.data);
      return true;
    } catch (error) {
      // Обробка помилок
      console.error("Error updating user:", error);
      return false;
    }
  };

  processDeleting = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/users/${id}`,
      );

      console.log("Delete user:", response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
}
