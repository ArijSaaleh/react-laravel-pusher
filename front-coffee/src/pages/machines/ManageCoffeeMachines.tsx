import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/adminDashboard/DashboardLayout";
import { Button } from "../../components/ui/button";
import { Coffee, Plus, ArrowLeft } from "lucide-react";
import axios from "axios";
import "./CoffeeMachine.css"; // Include the CSS animations
import AddCoffeeMachineModal from "@/components/coffeMachine/AddCoffeeMachineModal";
import { format, parseISO } from "date-fns"; // Add parseISO to help convert ISO format to Date object

interface CoffeeMachine {
  id: number;
  name: string;
  location: string;
  slots: CoffeeSlot[]; // Slots for different coffee types
}

interface CoffeeSlot {
  coffeeType: string;
  quantity: number;
}

interface User {
  id: string;
  name: string;
}

interface Order {
  id: number;
  coffee_type: string;
  machine_name: string;
  user_id: string;
  created_at: string;
  userName?: string; // Optional field for fetched username
}

const CoffeeMachinePage: React.FC = () => {
  const [machines, setMachines] = useState<CoffeeMachine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<CoffeeMachine | null>(
    null
  );
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Coffee Machine modal
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null); // Declare loadingUserId here

  // Fetch coffee machines and recent orders when the component mounts
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/coffee-machines",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setMachines(response.data);
        setSelectedMachine(response.data[0]); // Select the first machine by default
      } catch (error) {
        console.error("Error fetching coffee machines:", error);
      }
    };

    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/recentorders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setRecentOrders(response.data);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    fetchMachines();
    fetchRecentOrders();
  }, []);

  // Fetch user names when recentOrders changes
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/coffee-machines",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setMachines(response.data);
        setSelectedMachine(response.data[0]); // Select the first machine by default
      } catch (error) {
        console.error("Error fetching coffee machines:", error);
      }
    };

    // Fetch user name for a specific order
    const fetchUserName = async (user_id: string) => {
      try {
        setLoadingUserId(user_id); // Set the current user_id being loaded
        const response = await axios.get(`/api/users/${user_id}`); // Request to fetch the user by ID

        // Assuming the response contains the user's name as a string
        const userData = response.data;
        if (userData) {
          console.log(response);
          setUserName(userData); // Set the fetched user name
        } else {
          setUserName("Unknown User"); // Fallback in case name is not found
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Unknown User"); // Fallback in case of error
      } finally {
        setLoadingUserId(null); // Clear the loading state
      }
    };
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/recentorders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        const orders = response.data;

        // Fetch usernames for each order and update the recentOrders state
        const ordersWithUsernames = await Promise.all(
          orders.map(async (order: Order) => {
            const userName = await fetchUserName(order.user_id);

            return { ...order, userName }; // Add the fetched username to the order
          })
        );

        setRecentOrders(ordersWithUsernames);
        console.log(recentOrders); // Update the state with orders and their usernames
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    fetchMachines();
    fetchRecentOrders();
  }, []);

  const handleMachineSelect = (machine: CoffeeMachine) => {
    setSelectedMachine(machine);
  };

  const handleAddCoffeeMachine = () => {
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  const refreshMachineList = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/coffee-machines",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      setMachines(response.data);
    } catch (error) {
      console.error("Error refreshing coffee machine list:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="coffee-machine-page">
        <div className="header flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Coffee Machine Management</h2>
          <Button asChild className="ml-4">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2" /> Back to Dashboard
            </Link>
          </Button>
        </div>
        <p className="mb-4">
          Here you can monitor and manage your coffee machines.
        </p>

        {/* Coffee Machine List and Add Button */}
        <div className="machines-list mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Available Coffee Machines</h3>
            <Button className="ml-4" onClick={handleAddCoffeeMachine}>
              <Plus className="mr-2" /> Add Coffee Machine
            </Button>
          </div>
          <div className="machine-selector flex space-x-4 overflow-auto">
            {machines.map((machine) => (
              <div
                key={machine.id}
                className={`machine-item p-4 border rounded-lg cursor-pointer ${
                  selectedMachine?.id === machine.id ? "selected-machine" : ""
                }`}
                onClick={() => handleMachineSelect(machine)}
              >
                <h4 className="font-bold">{machine.name}</h4>
                <p>{machine.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coffee Machine Visualization and Details */}
        <div className="coffee-machine-visualization flex flex-col lg:flex-row lg:space-x-4 mb-4">
          <div className="visualization-container flex-1 mb-4 lg:mb-0">
            <div className="machine-visual border p-6 rounded-lg flex flex-col items-center animate-pulse">
              <Coffee className="h-16 w-16 mb-4" />
              <p className="text-lg font-semibold">Brewing Coffee...</p>
              <div className="brew-progress-bar bg-gray-200 w-full h-4 rounded-lg mt-2 overflow-hidden">
                <div className="bg-green-500 h-full animate-brew"></div>
              </div>
            </div>
          </div>

          {/* Available Coffees */}
          <div className="available-coffees flex-1">
            <h4 className="text-xl font-semibold mb-2">Available Coffees</h4>
            {selectedMachine ? (
              <ul className="coffee-list space-y-2">
                {selectedMachine.slots.map((slot, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 border rounded-lg"
                  >
                    <span>{slot.coffeeType}</span>
                    <span className="text-sm text-gray-600">
                      Quantity: {slot.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No machine selected</p>
            )}
          </div>
        </div>

        {/* Recent Coffee Orders */}
        <div className="recent-orders mt-8">
          <h4 className="text-xl font-semibold mb-2">Recent Coffee Orders</h4>
          <ul className="order-list space-y-2">
            {recentOrders.map((order) => (
              <li key={order.id} className="p-2 border rounded-lg">
                <p className="font-medium">Coffee Type: {order.coffee_type}</p>
                <p className="font-medium">Machine: {order.machine_name}</p>
                <p className="text-sm text-gray-500">
                  Ordered by: Employee user
                </p>
                <p className="text-sm text-gray-500">
                  Time: {format(parseISO(order.created_at), "PPpp")}{" "}
                  {/* Correctly formatted date */}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AddCoffeeMachineModal
        isOpen={isAddModalOpen} // Modal visibility is controlled by this prop
        onClose={handleModalClose}
        onCoffeeMachineAdded={refreshMachineList} // Refresh the machine list when a new machine is added
      />
    </DashboardLayout>
  );
};

export default CoffeeMachinePage;
