"use client"
import React, { useState } from 'react'
import ModalWindowForUpdateCategory from '../ModalWindows/ModalWindowForUpdateCategory';
import { GetCategoryDto } from '@/types/Category';

const UpdateCategoryButton = ({category}: { category: GetCategoryDto}) => {
     const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
  return (
        <>
            <button className="block px-4 py-2 text-sm text-blue-500 hover:text-blue-700" role="menuitem" onClick={openModal} >Update</button>
           <ModalWindowForUpdateCategory
            category={category}
            isOpen={isModalOpen}
            onClose={closeModal}
           /> 
        </>
  )
}

export default UpdateCategoryButton