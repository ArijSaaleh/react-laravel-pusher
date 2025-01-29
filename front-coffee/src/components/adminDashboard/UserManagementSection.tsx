import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, UserPlus } from "lucide-react";

const UserManagementSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#D5CEA3] rounded-lg shadow-lg p-6">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#3C2A21] rounded-full opacity-10"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-[#3C2A21] rounded-full opacity-10"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A120B] flex items-center">
            <Users className="h-8 w-8 mr-2" />
            User Management
          </h2>
          <p className="mt-2 text-[#3C2A21]">
            Manage user accounts and permissions.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#3C2A21]" />
              <span>
                Total Users: <strong>256</strong>
              </span>
            </div>
            <div className="flex items-center">
              <UserPlus className="h-5 w-5 mr-2 text-blue-600" />
              <span>
                New Users (This Month):{" "}
                <strong className="text-blue-600">24</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-32 h-32 bg-[#3C2A21] rounded-full flex items-center justify-center relative overflow-hidden">
            <Users className="h-16 w-16 text-[#E5E5CB]" />
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#E5E5CB] rounded-full flex items-center justify-center transform translate-x-1/4 translate-y-1/4">
              <UserPlus className="h-6 w-6 text-[#3C2A21]" />
            </div>
          </div>
          <Button
            asChild
            className="bg-[#3C2A21] hover:bg-[#1A120B] text-[#E5E5CB]"
          >
            <Link to="/user-management">Manage Users</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementSection;
