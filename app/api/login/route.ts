// Import necessary types and services
import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from "@/services/UserService";
import { LoginResponse, LoginUserDto } from "@/types/User";
import { signJwtAccessToken } from '@/lib/utils';

// Define the POST handler for the login route
export async function POST(body: Request) {

    const model : LoginUserDto = await body.json();
    const user = await UserService.loginUser(model);



  if (user.status == 200) {
    const accessToken = signJwtAccessToken(user.data);
    const result = {
      accessToken,
      ...user.data,
    };
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}