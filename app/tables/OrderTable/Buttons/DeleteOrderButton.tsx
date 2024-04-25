"use client"
import UserService from '@/services/UserService';
import { GetOrderDto } from '@/types/Order';
import { useRouter } from 'next/navigation';
import React from 'react'

const DeleteOrderButton = ({ item }: { item: GetOrderDto}) => {
    const router = useRouter();
    const clickHandle = async () => {
        const response = await UserService.deleteUser(item.id);
        router.refresh();
    }
    return (
        <button className="block px-4 py-2 text-sm text-red-500 hover:text-red-700" role="menuitem" onClick={clickHandle}>Delete</button>
    )
}

export default DeleteOrderButton