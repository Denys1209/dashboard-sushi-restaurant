"use client"
import React, { useState } from 'react'
import ModalWindowForUpdateDish from '../ModalWindows/ModalWindowForUpdateDish';
import { GetDishDto } from '@/types/Dish';

const UpdateDishButton = ({dish}: { dish: GetDishDto}) => {
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
           <ModalWindowForUpdateDish
            dish={dish}
            isOpen={isModalOpen}
            onClose={closeModal}
           /> 
        </>
  )
}

export default UpdateDishButton