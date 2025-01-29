import React from "react";
import { Coffee } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#E5E5CB]">
      <header className="bg-[#3C2A21] text-[#E5E5CB] p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Coffee className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Coffee Admin Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
