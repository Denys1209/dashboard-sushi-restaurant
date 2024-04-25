"use client"
import ModalWindowlayout from '@/app/componets/ModalWindowlayout';
import UserService from '@/services/UserService';
import { GetUserDto } from '@/types/User';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ModalWindowForUpdateUser = ({ isOpen, onClose,  user }: { isOpen: boolean, onClose: () => void, user:GetUserDto }) => {
    const router = useRouter();
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [isVerify, setIsVerify] = useState(Number(user.isVerify));

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await UserService.updateUser(
            {
                id: user.id,
                username: username,
                email: email,
                isVerify: Boolean(isVerify),
                role: role,
            }
        );
        user.username = username,
        user.email = email;
        user.isVerify = Boolean(isVerify);
        user.role = role;
        router.refresh();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalWindowlayout onClose={onClose}>
            <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                Update user
            </h3>
            <div className="mt-2">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className="block mt-2">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />

                        <label htmlFor="email" className="block mt-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />

                         <label htmlFor="verify" className="block mt-2">Vefiry</label>
                        <input
                            id="verify"
                            type="number"
                            min={0}
                            max={1}
                            value={Number(isVerify)}
                            onChange={(e) => setIsVerify(Number(e.target.value))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                         <label htmlFor="role" className="block mt-2">Role</label>
                        <input
                            id="role"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />


                    <div className="mt-5">
                        <button
                            type="submit"
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </ModalWindowlayout>
    );
};

export default ModalWindowForUpdateUser;
