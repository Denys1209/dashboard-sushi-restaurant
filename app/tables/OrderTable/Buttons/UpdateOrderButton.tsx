"use client"
import React, { useState } from 'react'
import ModalWindowForUpdateOrder from '../ModalWindows/ModalWindowForUpdateOrder';
import { GetOrderDto } from '@/types/Order';

const UpdateOrderButton = ({order}: { order: GetOrderDto}) => {
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
           <ModalWindowForUpdateOrder
            order={order}
            isOpen={isModalOpen}
            onClose={closeModal}
           /> 
        </>
  )
}

export default UpdateOrderButton