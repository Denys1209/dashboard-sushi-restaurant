"use client"
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react'
import SliderButton from './SliderButton';

interface DashboardClientProps {
  children: React.ReactNode;
}

const listOfUrls = [
  {
    text: "Categories",
    url: "/tables/CategoryTable"
  },
  {
    text: "Categories",
    url: "/tables/CategoryTable"
  },
  {
    text: "Categories",
    url: "/tables/CategoryTable"
  },
]

const DashboardClient: React.FC<DashboardClientProps> = ({ children }) => {
  const pathname = usePathname()

  if (!pathname.startsWith('/auth/')) {
    return (
      <div className={"flex h-[100vh]   bg-gray-200"}>
        <div className={"bg-gray-800 text-white w-64 p-4"}>
          {
            listOfUrls.map((e, idx) => (
              <SliderButton key={idx}
                text={e.text}
                url={e.url}
              />
            ))
          }
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
          </div>

        </div>
        <main className={"w-full h-[100vh] "}>
          {children}
        </main>
      </div>
    );
  }
  else {
    return <main className='w-full h-full'>
      {children}
    </main>;
  }
}

export default DashboardClient