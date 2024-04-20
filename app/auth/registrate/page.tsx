"use client"
import UserService from "@/services/UserService";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const RegistratePage = () => {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setShowPopup(true);
      return;
    }
    const result = await UserService.registerUser({
      email: email,
      password: password,
      username: username,
    });
    if (result.status !== 200) {
      setErrorMessage("Registration failed. Please try again.");
      setShowPopup(true);
    } else {
      route.push('/');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen  gap-1 ">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>{errorMessage}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
      <div className="px-7 py-4  bg-white rounded-md flex flex-col gap-2 border-black border shadow-2xl">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-4 mb-3 h-14 block w-full rounded-md border px-3 text-gray-600 outline-none focus:border-stone-500 focus:outline-none md:mb-0"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 mb-3 h-14 block w-full rounded-md border px-3 text-gray-600 outline-none focus:border-stone-500 focus:outline-none md:mb-0"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 mb-3 h-14 block w-full rounded-md border px-3 text-gray-600 outline-none focus:border-stone-500 focus:outline-none md:mb-0"
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-4 mb-3 h-14 block w-full rounded-md border px-3 text-gray-600 outline-none focus:border-stone-500 focus:outline-none md:mb-0"
            required
          />

          <Link href={"/auth/login"} className="hover:text-gray-400 text-black cursor-pointer">
            Login
          </Link>
          <button
            type="submit"
            className="bg-blue-700 px-6 py-3 disabled:bg-gray-500 block-primary rounded-md cursor-pointer text-white mt-4 font-bold w-full hover:opacity-70"
          >
            Registate
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistratePage;
