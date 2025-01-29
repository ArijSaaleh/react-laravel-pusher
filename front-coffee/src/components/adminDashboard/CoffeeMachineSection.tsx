import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Coffee, Settings } from "lucide-react";

const CoffeeMachineSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#E5E5CB] rounded-lg shadow-lg p-6">
      <div className="absolute top-0 left-0 -mt-10 -ml-10 w-40 h-40 bg-[#3C2A21] rounded-full opacity-10"></div>
      <div className="absolute bottom-0 right-0 -mb-10 -mr-10 w-40 h-40 bg-[#3C2A21] rounded-full opacity-10"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A120B] flex items-center">
            <Coffee className="h-8 w-8 mr-2" />
            Coffee Machines
          </h2>
          <p className="mt-2 text-[#3C2A21]">
            Monitor and manage your coffee machines.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <Coffee className="h-5 w-5 mr-2 text-[#3C2A21]" />
              <span>
                Total Machines: <strong>8</strong>
              </span>
            </div>
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-green-600" />
              <span>
                Active Machines: <strong className="text-green-600">7</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-32 h-32 bg-[#3C2A21] rounded-full flex items-center justify-center relative">
            <Coffee className="h-16 w-16 text-[#E5E5CB]" />
            <div className="absolute top-0 right-0 w-10 h-10 bg-[#E5E5CB] rounded-full flex items-center justify-center">
              <Settings className="h-6 w-6 text-[#3C2A21]" />
            </div>
          </div>
          <Button
            asChild
            className="bg-[#3C2A21] hover:bg-[#1A120B] text-[#E5E5CB]"
          >
            <Link to="/coffee-machines">Manage Machines</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeMachineSection;
