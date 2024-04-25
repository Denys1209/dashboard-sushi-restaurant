"use client"
import ModalWindowlayout from '@/app/componets/ModalWindowlayout';
import OrderService from '@/services/OrderService';
import { GetOrderDto } from '@/types/Order';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';



const ModalWindowForUpdateOrder = ({ isOpen, onClose, order }: { isOpen: boolean, onClose: () => void, order: GetOrderDto }) => {
    const router = useRouter();
    const [cost, setCost] = useState(order.cost);
    const [dateTime, setDateTime] = useState<string>(order.dateTime.toISOString().substring(0, 16));
    const [phoneNumber, setPhoneNumber] = useState(order.phoneNumber);
    const [userId, setUserId] = useState(order.user.id);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        OrderService.createOrder(
            userId,
            [],
            [],
            {
                cost: cost,
                dateTime: new Date(Date.parse(dateTime)),
                phoneNumber: phoneNumber,
            }
        );

        router.refresh();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalWindowlayout onClose={onClose}>
            <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                Update order
            </h3>
            <div className="mt-2">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="cost" className="block mt-2">Cost</label>
                    <input
                        id="cost"
                        type="number"
                        min={0}
                        value={cost}
                        onChange={(e) => setCost(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <label htmlFor="dateTime" className="block mt-2">DateTime</label>
                    <input
                        id="dateTime"
                        type="datetime-local"
                        value={Date.parse(dateTime.toString())}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <label htmlFor="phoneNumber" className="block mt-2">Phone number</label>
                    <input
                        id="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <label htmlFor="userId" className="block mt-2">User id</label>
                    <input
                        id="userId"
                        type="number"
                        min={0}
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
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

export default ModalWindowForUpdateOrder;
