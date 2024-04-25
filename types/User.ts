import { GetDishDto } from "./Dish";

interface IUserDto {
  email: string;
  username: string;
  role: string;
  isVerify: boolean;
}

export interface RegisterUserDto {
  email: string;
  username: string;
  password: string;
}

export interface CreateUserDto extends IUserDto {
  password: string;
}

export interface GetUserDto extends IUserDto {
  id: number;
  favoriteDishesIds: number[];
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto extends IUserDto {
  id: number;
}

export interface LoginResponse extends IUserDto {
  token: string;
  id: number;
}

export interface GetUserPageDto {
  users: GetUserDto[];
  howManyPages: number;
}
