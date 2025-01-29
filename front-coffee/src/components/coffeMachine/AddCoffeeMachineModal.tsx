import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import axios from "axios";

interface Coffee {
  id: number;
  name: string;
  quantity: number;
}

interface AddCoffeeMachineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCoffeeMachineAdded: () => void;
}

const AddCoffeeMachineModal: React.FC<AddCoffeeMachineModalProps> = ({
  isOpen,
  onClose,
  onCoffeeMachineAdded,
}) => {
  const [location, setLocation] = useState("");
  const [coffeeSlots, setCoffeeSlots] = useState([
    { coffeeType: "", quantity: 10 },
    { coffeeType: "", quantity: 10 },
    { coffeeType: "", quantity: 10 },
  ]); // Empty by default
  const [coffees, setCoffees] = useState<Coffee[]>([]); // Available coffees from the backend
  const [error, setError] = useState<string | null>(null);

  // Fetch the available coffees from the backend on mount
  useEffect(() => {
    const fetchCoffees = async () => {
      try {
         const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("No authorization token found.");
      return;
    }
        const response = await axios.get("http://127.0.0.1:8000/api/coffees",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCoffees(response.data);
      } catch (error) {
        console.error("Failed to fetch coffees:", error);
      }
    };

    if (isOpen) {
      fetchCoffees();
    }
  }, [isOpen]);

  // Handle coffee type selection
  const handleCoffeeTypeChange = (index: number, coffeeType: string) => {
    const updatedSlots = [...coffeeSlots];
    updatedSlots[index].coffeeType = coffeeType;
    setCoffeeSlots(updatedSlots);
  };

  // Handle coffee quantity changes (ensuring the max quantity is 10)
  const handleCoffeeQuantityChange = (index: number, quantity: number) => {
    const updatedSlots = [...coffeeSlots];
    updatedSlots[index].quantity = Math.min(10, quantity); // Ensure max of 10
    setCoffeeSlots(updatedSlots);
  };

  // Handle the submission of the new coffee machine
  const handleAddCoffeeMachine = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("No authorization token found.");
      return;
    }

    // Check if all slots have a selected coffee type
    for (let slot of coffeeSlots) {
      if (!slot.coffeeType) {
        setError("Please select a coffee for each slot.");
        return;
      }
    }

    const newMachine = {
      location,
      slots: coffeeSlots,
    };

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/coffee-machines",
        newMachine,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update coffee stock in the backend based on slot quantities
      for (let slot of coffeeSlots) {
        const coffee = coffees.find((c) => c.name === slot.coffeeType);
        if (coffee) {
          const updatedQuantity = coffee.quantity - slot.quantity;
          await axios.put(
            `http://127.0.0.1:8000/api/coffees/${coffee.id}`,
            { quantity: updatedQuantity },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }

      onCoffeeMachineAdded(); // Refresh the list of machines
      onClose(); // Close the modal
    } catch (err) {
      console.error("Failed to add coffee machine:", err);
      setError("Failed to add coffee machine.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Coffee Machine</DialogTitle>
        </DialogHeader>

        {error && <p className="text-red-600">{error}</p>}

        <div className="space-y-4">
          <div>
            <label htmlFor="location">Location</label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <label>Slots</label>
            {coffeeSlots.map((slot, index) => (
              <div key={index} className="mt-2">
                <label htmlFor={`coffee-type-${index}`}>Coffee Type</label>
                <select
                  id={`coffee-type-${index}`}
                  value={slot.coffeeType}
                  onChange={(e) => handleCoffeeTypeChange(index, e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Select Coffee</option>
                  {coffees.map((coffee) => (
                    <option key={coffee.id} value={coffee.name}>
                      {coffee.name} (Stock: {coffee.quantity})
                    </option>
                  ))}
                </select>

                <label htmlFor={`coffee-quantity-${index}`} className="mt-2">
                  Quantity
                </label>
                <Input
                  id={`coffee-quantity-${index}`}
                  type="number"
                  value={slot.quantity}
                  onChange={(e) =>
                    handleCoffeeQuantityChange(index, parseInt(e.target.value, 10))
                  }
                  className="mt-1 block w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddCoffeeMachine}>Add Coffee Machine</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoffeeMachineModal;
