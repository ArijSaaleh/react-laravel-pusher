import React from "react";
import DashboardLayout from "./DashboardLayout";
import CoffeeStockSection from "./CoffeeStockSection";
import CoffeeMachineSection from "./CoffeeMachineSection";
import UserManagementSection from "./UserManagementSection";

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-8">
        <CoffeeStockSection />
        <CoffeeMachineSection />
        <UserManagementSection />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
