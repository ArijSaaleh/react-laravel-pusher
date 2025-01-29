import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog"; // Shadcn UI components
import { Input } from "../../components/ui/input"; // Input field from Shadcn UI
import { Button } from "../../components/ui/button"; // Button from Shadcn UI
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  rfid_tag: string;
}
interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit: User | null; // User that is being edited
  onUserUpdated: () => void; // Callback to refresh users list after update
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  userToEdit,
  onUserUpdated,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [rfidTag, setRfidTag] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Set initial values if editing an existing user
  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setRole(userToEdit.role);
      setRfidTag(userToEdit.rfid_tag);
    }
  }, [userToEdit]);

  // Function to handle the user update
  const handleUpdateUser = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("No authorization token found.");
      return;
    }

    try {
      const updatedUser = { name, email, role, rfid_tag: rfidTag };
      await axios.put(
        `http://127.0.0.1:8000/api/users/${userToEdit?.id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUserUpdated(); // Refresh the user list after update
      onClose(); // Close the modal
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        {error && <p className="text-red-600">{error}</p>}
        <div className="space-y-4">
          <div>
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="rfid_tag">RFID Tag</label>
            <Input
              id="rfid_tag"
              value={rfidTag}
              onChange={(e) => setRfidTag(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateUser}>Update User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
