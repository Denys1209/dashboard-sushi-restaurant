import { GetDishDto } from "./Dish";
import { GetUserDto } from "./User";

export interface CreateOrderDto {
 cost: number;
 phoneNumber: string;
 dateTime: Date;
}
export interface GetOrderDishDto {
    dish: GetDishDto;
    quantity: number;
}

export interface GetOrderDto {
 id: number;
 cost: number;
 user: GetUserDto;
 dateTime: Date;
 phoneNumber: string;
 orderDishDtos: GetOrderDishDto[];
}

export interface UpdateOrderDto {
 id: number;
 cost: number;
 user: GetUserDto; 
 phoneNumber: string;
 dateTime: Date;
}
