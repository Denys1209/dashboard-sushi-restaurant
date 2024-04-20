import axios, { AxiosResponse } from "axios";
import Service from "./Service";
import { FilterPaginationDto } from "@/types/FilterPagination";
import {
  CreateCategoryDto,
  GetCategoryDto,
  GetCategoryPageDto,
  UpdateCategoryDto,
} from "@/types/Category";

class CategoryService extends Service {
  public constructor() {
    super("Categories/"); 
  }

  async getAllCategories(
    paginationDto: FilterPaginationDto
  ): Promise<AxiosResponse<GetCategoryPageDto>> {
    return this.axiosInstance.get("", { params: paginationDto });
  }

  async getCategoryById(id: number): Promise<AxiosResponse<GetCategoryDto>> {
    return this.axiosInstance.get(`${id}`);
  }

  async createCategory(model: CreateCategoryDto): Promise<AxiosResponse> {
    return this.axiosInstance.post("", model);
  }

  async updateCategory(dto: UpdateCategoryDto): Promise<AxiosResponse> {
    return this.axiosInstance.put("", dto);
  }

  async deleteCategory(id: number): Promise<AxiosResponse> {
    return this.axiosInstance.delete(`${id}`);
  }
}

export default new CategoryService();
