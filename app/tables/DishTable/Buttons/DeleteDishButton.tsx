"use client"
import DishService from '@/services/DishService';
import { GetDishDto, GetDishPageDto } from '@/types/Dish';
import { useRouter } from 'next/navigation';
import React from 'react'

const DeleteDishButton = ({ item, page }: { item: GetDishDto, page: GetDishPageDto }) => {
    const router = useRouter();
    const clickHandle = async () => {
        const response = await DishService.deleteDish(item.id);
        router.refresh();
    }
    return (
        <button className="block px-4 py-2 text-sm text-red-500 hover:text-red-700" role="menuitem" onClick={clickHandle}>Delete</button>
    )
}

export default DeleteDishButton