import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/adminDashboard/DashboardLayout";
import { Button } from "../../components/ui/button";
import axios from "axios";
import EditUserModal from "../../components/usermanagement/EditUserModal"; // Import EditUserModal component

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  rfid_tag: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null); // Store user to be edited

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("No authorization token found.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
        setError(null);
      } catch (err) {
        setError("Failed to load users: Unauthorized");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openEditUserModal = (user: User) => {
    setUserToEdit(user);
    setIsEditUserModalOpen(true);
  };

  const closeEditUserModal = () => {
    setUserToEdit(null);
    setIsEditUserModalOpen(false);
  };

  const refreshUserList = () => {
    // Re-fetch users after adding or updating a user
    const fetchUsers = async () => {
      setLoading(true);
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("No authorization token found.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
        setError(null);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <p>Here you can manage user accounts and permissions.</p>

      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>RFID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.rfid_tag}</td>
              <td>
                <Button onClick={() => openEditUserModal(user)}>Edit</Button>
                <Button className="ml-2" onClick={() => handleDelete(user.id)}>
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

      {/* EditUserModal */}
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={closeEditUserModal}
        userToEdit={userToEdit}
        onUserUpdated={refreshUserList}
      />
    </DashboardLayout>
  );

  // Function to handle user deletion
  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          setError("No authorization token found.");
          return;
        }
        await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        setError("Failed to delete user.");
      }
    }
  };
};

export default UserManagementPage;
