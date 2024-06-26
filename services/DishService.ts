import { FilterPaginationDto } from "@/types/FilterPagination";
import {
 CreateDishDto,
 GetDishDto,
 GetDishPageDto,
 UpdateDishDto,
} from "@/types/Dish";
import axios, { AxiosResponse } from "axios";
import Service from "./Service";

class DishService extends Service {
  
 public constructor() {
    super("Dishes/");
 }

 async getAllDishes(
    paginationDto: FilterPaginationDto
  ): Promise<AxiosResponse<GetDishPageDto>> {
    return this.axiosInstance.get("", { params: paginationDto });
 }

 async getDishById(id: number): Promise<AxiosResponse<GetDishDto>> {
    return this.axiosInstance.get(`${id}`);
 }

 async createDish(categoryId:number,model: CreateDishDto): Promise<AxiosResponse> {
    return this.axiosInstance.post("createDish?categoryId="+String(categoryId), model);
 }

 async updateDish(dto: UpdateDishDto): Promise<AxiosResponse> {
    return this.axiosInstance.put("", dto);
 }

 async deleteDish(id: number): Promise<AxiosResponse> {
    return this.axiosInstance.delete(`${id}`);
 }

 async getDishesByCategory(categoryName: string): Promise<AxiosResponse<GetDishDto[]>> {
    return this.axiosInstance.get(categoryName);
 }

 async getAllFavoriteDishesForUser(id: number): Promise<AxiosResponse<GetDishDto[]>> {
    return this.axiosInstance.get(`favoriteDishes?id=${id}`);
 }
}

export default new DishService();
