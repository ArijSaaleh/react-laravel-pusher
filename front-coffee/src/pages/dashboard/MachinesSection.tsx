import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createMachine } from "../api"; // assuming you have this function to create a machine
import { getCoffeeTypes, updateMachine, deleteMachineById } from "../api";
import type { Machine, coffee_type } from "./types";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";

interface MachinesSectionProps {
  machines: Machine[];
  coffeeTypes: coffee_type[]; // Add coffeeTypes prop
  refetchMachines: () => void; // Function to refetch machines
}

export function MachinesSection({
  machines,
  refetchMachines,
}: MachinesSectionProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editMachineId, setEditMachineId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [coffeeCapsules, setCoffeeCapsules] = useState<
    { coffee_type_id: number; quantity: number }[]
  >([
    { coffee_type_id: 0, quantity: 0 },
    { coffee_type_id: 0, quantity: 0 },
    { coffee_type_id: 0, quantity: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [coffeeTypes, setCoffeeTypes] = useState<coffee_type[]>([]);
  const [loadingCoffeeTypes, setLoadingCoffeeTypes] = useState(true);
  const [errorCoffeeTypes, setErrorCoffeeTypes] = useState<string | null>(null);
   // Pre-fill the form with the selected machine's data when editing
   const handleEditClick = (machine: Machine) => {
    setEditMachineId(machine.id);
    setLocation(machine.location);
    setCoffeeCapsules(machine.coffee_capsules || [
      { coffee_type_id: 0, quantity: 0 },
    ]); // Pre-fill coffee capsules
    setIsEditOpen(true);
  };
   // Handle form submission to edit the machine
   const handleEditSubmit = async () => {
    if (editMachineId !== null) {
      try {
        await updateMachine(editMachineId, location, coffeeCapsules); // Call the API to update the machine
        setIsEditOpen(false); // Close the modal
        refetchMachines(); // Refetch the machine data after edit
      } catch (error) {
        console.error("Error updating machine", error);
      }
    }
  };
  // Handle delete machine action
  const handleDeleteClick = async (machineId: number) => {
    if (confirm("Are you sure you want to delete this machine?")) {
      try {
        await deleteMachineById(machineId); // Call the API to delete the machine
        refetchMachines(); // Refetch the machine data after delete
      } catch (error) {
        console.error("Error deleting machine", error);
      }
    }
  };
  // Fetch coffee types when the component mounts
  useEffect(() => {
    const fetchCoffeeTypes = async () => {
      try {
        const fetchedCoffeeTypes = await getCoffeeTypes();
        setCoffeeTypes(fetchedCoffeeTypes);
      } catch (error) {
        setErrorCoffeeTypes("Failed to load coffee types");
      } finally {
        setLoadingCoffeeTypes(false);
      }
    };

    fetchCoffeeTypes();
  }, []);

  // Handle form submission to create a machine
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createMachine(location, coffeeCapsules); // Pass both location and coffeeCapsules
      setIsOpen(false); // Close the modal after successful creation
      refetchMachines(); // Refetch the machines after creation
    } catch (error) {
      console.error("Error creating machine", error);
    } finally {
      setLoading(false);
    }
  };
  // Helper function to get the coffee type name by its ID
  const getCoffeeTypeName = (id: number) => {
    const coffeeType = coffeeTypes.find((type) => type.id === id);
    return coffeeType ? coffeeType.name : "Unknown";
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Machines</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={() => setIsOpen(true)} className="mb-4">
          <CirclePlus><span>Add Machine</span></CirclePlus> 
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Coffee Capsules</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {machines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell>{machine.id}</TableCell>
                <TableCell>{machine.location}</TableCell>
                <TableCell>
                  {/* Render the coffee capsules details */}
                  {machine.coffee_capsules &&
                  machine.coffee_capsules.length > 0 ? (
                    machine.coffee_capsules.map((capsule, index) => (
                      <div key={index} className="mb-2">
                        <span>
                          {getCoffeeTypeName(capsule.coffee_type_id)} -{" "}
                          {capsule.quantity} left
                        </span>
                      </div>
                    ))
                  ) : (
                    <span>No coffee capsules available</span> // Fallback if coffee_capsules is missing
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={()=>handleDeleteClick(machine.id)}><Trash2> Delete</Trash2></Button> 
                  <Button variant="secondary" onClick={()=> handleEditClick(machine)} className="mr-2"><Pencil>Edit</Pencil></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {/* Edit Machine Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Machine</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Location input */}
            <div>
              <label className="block">Location</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter machine location"
              />
            </div>

            {/* Coffee Capsules Select */}
            <div>
              <label className="block">Coffee Capsules</label>
              {coffeeCapsules.map((capsule, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Select
                    value={capsule.coffee_type_id.toString()}
                    onValueChange={(value) => {
                      const updatedCapsules = [...coffeeCapsules];
                      updatedCapsules[index].coffee_type_id = parseInt(value);
                      setCoffeeCapsules(updatedCapsules);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Coffee Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {coffeeTypes.map((coffee) => (
                        <SelectItem
                          key={coffee.id}
                          value={coffee.id.toString()}
                        >
                          {coffee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    value={capsule.quantity}
                    onChange={(e) => {
                      const updatedCapsules = [...coffeeCapsules];
                      updatedCapsules[index].quantity = Math.min(
                        parseInt(e.target.value),
                        10
                      );
                      setCoffeeCapsules(updatedCapsules);
                    }}
                    placeholder="Quantity (max 10)"
                    max={10}
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Update Machine</Button>
          </div>
        </DialogContent>
      </Dialog>
    
      {/* Modal for adding a new machine */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Machine</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Location input */}
            <div>
              <label className="block">Location</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter machine location"
              />
            </div>

            {/* Coffee Capsules Select */}
            <div>
              <label className="block">Coffee Capsules</label>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  {/* Select Coffee Type */}
                  <Select
                    value={coffeeCapsules[index].coffee_type_id.toString()}
                    onValueChange={(value) => {
                      const updatedCapsules = [...coffeeCapsules];
                      updatedCapsules[index].coffee_type_id = parseInt(value);
                      setCoffeeCapsules(updatedCapsules);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Coffee Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {coffeeTypes.map((coffee) => (
                        <SelectItem
                          key={coffee.id}
                          value={coffee.id.toString()}
                        >
                          {coffee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Quantity input */}
                  <Input
                    type="number"
                    value={coffeeCapsules[index].quantity}
                    onChange={(e) => {
                      const updatedCapsules = [...coffeeCapsules];
                      updatedCapsules[index].quantity = Math.min(
                        parseInt(e.target.value),
                        10
                      ); // Ensure max quantity is 10
                      setCoffeeCapsules(updatedCapsules);
                    }}
                    placeholder="Quantity (max 10)"
                    max={10}
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create Machine"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}