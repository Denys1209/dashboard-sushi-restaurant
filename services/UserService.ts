import { FilterPaginationDto } from "@/types/FilterPagination";
import {
  CreateUserDto,
  GetUserDto,
  LoginResponse,
  LoginUserDto,
  UpdateUserDto,
} from "@/types/User";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Service from "./Service";


class UserService extends Service {
  
  public constructor() {
    super("User/");
  }

  async getAllUsers(
    paginationDto: FilterPaginationDto
  ): Promise<AxiosResponse<GetUserDto[]>> {
    return this.axiosInstance.get("", { params: paginationDto });
  }

  async getUserById(id: number): Promise<AxiosResponse<GetUserDto>> {
    return this.axiosInstance.get(`${id}`);
  }

  async registerUser(model: CreateUserDto): Promise<AxiosResponse> {
    try {
      return await this.axiosInstance.post("registerAdmin", model);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The client was given an error response (5xx, 4xx)
        if (axiosError.response.status === 404) {
          // Handle 404 error specifically
          throw new Error("Resource not found. Please check the URL." + axiosError.toJSON());
        }
      } else if (axiosError.request) {
        // The client never received a response, or the request was never left
        console.log("Request was made but no response was received.");
      } else {
        // Anything else
        console.log("An error occurred:", axiosError.message);
      }
      throw axiosError;
    }
  }

  async verifyUser(email: string, token: string): Promise<AxiosResponse> {
    return this.axiosInstance.post("verify", { email, token });
  }

  async forgotPassword(email: string): Promise<AxiosResponse> {
    return this.axiosInstance.post("forgot-password", { email });
  }

  async resetPassword(request: any): Promise<AxiosResponse> {
    return this.axiosInstance.post("reset-password", request);
  }

  async updateUser(dto: UpdateUserDto): Promise<AxiosResponse> {
    return this.axiosInstance.put("", dto);
  }

  async deleteUser(id: number): Promise<AxiosResponse> {
    return this.axiosInstance.delete(`${id}`);
  }

  async checkUserExists(email: string): Promise<AxiosResponse> {
    return this.axiosInstance.get("exists", { params: { email } });
  }

  async loginUser(model: LoginUserDto): Promise<AxiosResponse<LoginResponse>> {
    return this.axiosInstance.post("login", model);
  }

  async addFavoriteDish(
    userId: number,
    dishId: number
  ): Promise<AxiosResponse> {
    return this.axiosInstance.post(`addFavoriteDish?userId=${userId}&dishId=${dishId}`);
  }
  
  async deleteFavoriteDish(
    userId: number,
    dishId: number
  ): Promise<AxiosResponse> {
    return this.axiosInstance.delete(`deleteFavoriteDish?userId=${userId}&dishId=${dishId}`);
  }
}

export default new UserService();
