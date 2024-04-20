import axios, { AxiosResponse } from 'axios';
import Service from './Service';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from '@/types/Order';
import { FilterPaginationDto } from '@/types/FilterPagination';

class OrderService extends Service {
 constructor() {
    super("Order/");
 }

 async getAllOrders(paginationDto: FilterPaginationDto): Promise<AxiosResponse<GetOrderDto[]>> {
    return this.axiosInstance.get("", { params: paginationDto });
 }

 async getOrderById(id: number): Promise<AxiosResponse<GetOrderDto>> {
    return this.axiosInstance.get(`${id}`);
 }

 async deleteOrder(id: number): Promise<AxiosResponse> {
    return this.axiosInstance.delete(`${id}`);
 }

 async createOrder(userId: number | null, dishesId: number[], dishesQuantity: number[], dto: CreateOrderDto): Promise<AxiosResponse> {
   if (userId == null){
      return this.axiosInstance.post(`createOrder?dishesId=${dishesId.join(',')}&dishesQuantity=${dishesQuantity.join(',')}`, dto);
   }
   else{
      return this.axiosInstance.post(`createOrder?userId=${userId}&dishesId=${dishesId.join(',')}&dishesQuantity=${dishesQuantity.join(',')}`, dto);
   }
 }

 async updateOrder(userId: number, dishesId: number[], dishesQuantity: number[], dto: UpdateOrderDto): Promise<AxiosResponse> {
if (userId == null){
      return this.axiosInstance.put(`?dishesId=${dishesId.join(',')}&dishesQuantity=${dishesQuantity.join(',')}`, dto);
   }
   else{
      return this.axiosInstance.put(`?userId=${userId}&dishesId=${dishesId.join(',')}&dishesQuantity=${dishesQuantity.join(',')}`, dto);
   }

 }

}

export default new OrderService();
