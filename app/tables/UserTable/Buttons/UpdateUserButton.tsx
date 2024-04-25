"use client"
import React, { useState } from 'react'
import ModalWindowForUpdateUser from '../ModalWindows/ModalWindowForUpdateUser';
import { GetUserDto } from '@/types/User';

const UpdateUserButton = ({user}: { user: GetUserDto}) => {
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
           <ModalWindowForUpdateUser
            user={user}
            isOpen={isModalOpen}
            onClose={closeModal}
           /> 
        </>
  )
}

export default UpdateUserButton