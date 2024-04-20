import { GetDishDto } from "./Dish";

interface IUserDto {

 email: string;
 username: string;
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

export interface UpdateUserDto extends IUserDto  {
 id: number;
 password: string;
}

export interface LoginResponse extends IUserDto {
 token: string;
 id: number;
}