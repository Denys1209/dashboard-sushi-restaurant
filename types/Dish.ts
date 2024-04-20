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
  categoryId: number;
}

export interface UpdateDishDto extends IDishDto {
  id: number;
  categoryId: number;
}
