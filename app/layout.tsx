import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MySessionProvider from "./Providers/MySessionProvider";
import DashboardLayout from "./componets/layouts/DashboardLayout";
import ProtectedLayout from "./componets/layouts/ProtectedLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MySessionProvider>
      <ProtectedLayout>
        <html lang="en" className="w-full h-[100vh]">
          <body className="w-full h-[100vh]">
            <DashboardLayout>
              <div className={inter.className}>{children}</div>
            </DashboardLayout>
          </body>
        </html>
      </ProtectedLayout>
    </MySessionProvider >
  );
}
