"use client"
import ModalWindowlayout from '@/app/componets/ModalWindowlayout';
import UserService from '@/services/UserService';
import React, { useState } from 'react';

const ModalWindowForCreateUser = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        UserService.registerUser(
            {
                email: email,
                password: password,
                username: username,
            }
        );
        setUsername('');
        setEmail('');
        setPassword('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalWindowlayout onClose={onClose}>
            <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                Create a new user
            </h3>
            <div className="mt-2">
                <form onSubmit={handleSubmit} className='text-white'>
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
                    <label htmlFor="password" className="block mt-2">Password</label>
                    <input
                        id="password"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

export default ModalWindowForCreateUser;
