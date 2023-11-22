export type AuthPageState = "registration" | "login";

export interface User {
  id: number;
  login: string;
  password: string;
  name: string | null;
  surname: string | null;
  info: string | null;
  avatar: string | null;
  favourites: number[] | null;
  admin: boolean;
}
