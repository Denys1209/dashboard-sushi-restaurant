import UserService from "@/services/UserService";
import { CreateUserDto } from "@/types/User";

export async function POST(params:Request) {
    const model:CreateUserDto = await params.json();
    const user = await UserService.registerUser(model);

    return user;
}