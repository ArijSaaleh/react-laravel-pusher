import { useEffect, useState } from "react";
import DashboardLayout from "../../components/adminDashboard/DashboardLayout";

import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const ManageCoffees = () => {
  const [coffees, setCoffees] = useState<any[]>([]);
  const [newCoffee, setNewCoffee] = useState({ name: "", quantity: 0 });
  const [selectedCoffee, setSelectedCoffee] = useState<any | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchCoffees = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/coffees", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    setCoffees(response.data);
  };

  const handleCreateCoffee = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/coffees", newCoffee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      fetchCoffees(); // Refresh list after adding
      setIsCreateModalOpen(false); // Close modal
      setNewCoffee({ name: "", quantity: 0 }); // Clear form
    } catch (error) {
      console.error("Error creating coffee:", error);
    }
  };

  const handleEditCoffee = async () => {
    if (selectedCoffee) {
      try {
        await axios.put(
          `http://127.0.0.1:8000/api/coffees/${selectedCoffee.id}`,
          selectedCoffee,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        fetchCoffees(); // Refresh list after updating
        setIsEditModalOpen(false); // Close modal
        setSelectedCoffee(null); // Clear selected coffee
      } catch (error) {
        console.error("Error editing coffee:", error);
      }
    }
  };

  const handleDeleteCoffee = async (coffeeId: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/coffees/${coffeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      fetchCoffees(); // Refresh list after deleting
    } catch (error) {
      console.error("Error deleting coffee:", error);
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Manage Coffee stock </h2>
      <p>Here you can manage coffee inventory.</p>

      <Button onClick={() => setIsCreateModalOpen(true)} className="mb-4">
        Add Coffee
      </Button>

      {/* Coffee List */}
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th></th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coffees.map((coffee: any) => (
            <tr key={coffee.id}>
              <td>{coffee.id}</td>
              <td>{coffee.name}</td>
              <td>{coffee.quantity}</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>
                <Button
                  onClick={() => {
                    setSelectedCoffee(coffee);
                    setIsEditModalOpen(true);
                  }}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteCoffee(coffee.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button asChild className="mt-4">
        <Link to="/dashboard">Back to Dashboard</Link>
      </Button>
      {/* Create Coffee Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Coffee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={newCoffee.name}
                onChange={(e) =>
                  setNewCoffee({ ...newCoffee, name: e.target.value })
                }
                placeholder="Enter coffee name"
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={newCoffee.quantity}
                onChange={(e) =>
                  setNewCoffee({ ...newCoffee, quantity: +e.target.value })
                }
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCoffee}>Add Coffee</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Coffee Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Coffee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={selectedCoffee?.name || ""}
                onChange={(e) =>
                  setSelectedCoffee({
                    ...selectedCoffee!,
                    name: e.target.value,
                  })
                }
                placeholder="Enter coffee name"
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={selectedCoffee?.quantity || ""}
                onChange={(e) =>
                  setSelectedCoffee({
                    ...selectedCoffee!,
                    quantity: +e.target.value,
                  })
                }
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button onClick={handleEditCoffee}>Update Coffee</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ManageCoffees;
