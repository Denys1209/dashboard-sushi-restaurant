"use client"
import CategoryService from '@/services/CategoryService'
import { GetCategoryDto, GetCategoryPageDto } from '@/types/Category';
import { useRouter } from 'next/navigation';
import React from 'react'

const DeleteCategoryButton = ({ item, page }: { item: GetCategoryDto, page: GetCategoryPageDto }) => {
    const router = useRouter();
    const clickHandle = async () => {
        const response = await CategoryService.deleteCategory(item.id);
        router.refresh();
    }
    return (
        <button className="block px-4 py-2 text-sm text-red-500 hover:text-red-700" role="menuitem" onClick={clickHandle}>Delete</button>
    )
}

export default DeleteCategoryButton