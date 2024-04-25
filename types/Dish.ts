import { GetCategoryDto } from "./Category";

interface IDishDto {
  name: string;
  description: string;
  imageURL: string;
  cost: number;
}

export interface GetDishDto extends IDishDto {
  id: number;
  category: GetCategoryDto;
}

export interface CreateDishDto extends IDishDto {
}

export interface UpdateDishDto extends IDishDto {
  id: number;
  categoryId: number;
}

export interface GetDishPageDto{
    dishes: GetDishDto[];
    howManyPages: number;
}