"use client"
import UserService from '@/services/UserService';
import { GetUserDto, GetUserPageDto } from '@/types/User';
import { useRouter } from 'next/navigation';
import React from 'react'

const DeleteUserButton = ({ item, page }: { item: GetUserDto, page: GetUserPageDto }) => {
    const router = useRouter();
    const clickHandle = async () => {
        const response = await UserService.deleteUser(item.id);
        router.refresh();
    }
    return (
        <button className="block px-4 py-2 text-sm text-red-500 hover:text-red-700" role="menuitem" onClick={clickHandle}>Delete</button>
    )
}

export default DeleteUserButton