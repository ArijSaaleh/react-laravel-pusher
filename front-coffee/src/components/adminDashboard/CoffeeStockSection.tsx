import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Package, Coffee } from "lucide-react";

const CoffeeStockSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#D5CEA3] rounded-lg shadow-lg p-6">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#3C2A21] rounded-full opacity-10"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-[#3C2A21] rounded-full opacity-10"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A120B] flex items-center">
            <Package className="h-8 w-8 mr-2" />
            Coffee Stock
          </h2>
          <p className="mt-2 text-[#3C2A21]">
            Manage your coffee inventory and track stock levels.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <Coffee className="h-5 w-5 mr-2 text-[#3C2A21]" />
              <span>
                Total Coffee Types: <strong>12</strong>
              </span>
            </div>
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-red-600" />
              <span>
                Low Stock Items: <strong className="text-red-600">3</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-32 h-32 bg-[#3C2A21] rounded-full flex items-center justify-center">
            <Coffee className="h-16 w-16 text-[#E5E5CB]" />
          </div>
          <Button
            asChild
            className="bg-[#3C2A21] hover:bg-[#1A120B] text-[#E5E5CB]"
          >
            <Link to="/coffee-stock">Manage Stock</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStockSection;
