import axios from "axios";

// Define the types for response data
interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
}

interface Order {
  id: number;
  user_id: number;
  coffee_type_id: number;
  machine_id: number;
}
interface CoffeeType {
  id: number;
  name: string;
  quantity: number;
}
interface Machine {
  id: number;
  location: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  rfid_tag: string;
}

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication - Login
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Register new user
export const register = async (
  name: string,
  email: string,
  password: string,
  rfidTag: string
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>("/register", {
      name,
      email,
      password,
      rfid_tag: rfidTag,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Get all orders
export const getOrders = async (): Promise<Order[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get<Order[]>("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to fetch orders");
  }
};

// Get coffee machines
export const getMachines = async (): Promise<Machine[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get<Machine[]>("/machines", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to fetch machines");
  }
};
// Get coffee machine by ID
export const getMachineById = async (id: number): Promise<Machine> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get<Machine>(`/machines/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data); // Log the machine data
    return response.data; // Return the machine object
  } catch (error: any) {
    throw new Error(`Failed to fetch machine with ID ${id}`);
  }
};
// Delete a machine by ID
export const deleteMachineById = async (id: number): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    await api.delete(`/machines/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    throw new Error(`Failed to delete machine with ID ${id}`);
  }
};
// Create a new machine
export const createMachine = async (
  location: string,
  coffeeCapsules: { coffee_type_id: number; quantity: number }[]
): Promise<Machine> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post<Machine>(
      "/machines",
      {
        location,
        coffee_capsules: coffeeCapsules, // Send coffee_capsules as an array of objects
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to create machine");
  }
};
// Update a machine by ID
export const updateMachine = async (
  id: number,
  location: string,
  coffeeCapsules: { coffee_type_id: number; quantity: number }[]
): Promise<Machine> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put<Machine>(
      `/machines/${id}`,
      { location, coffee_capsules: coffeeCapsules },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to update machine with ID ${id}`);
  }
};
// delete a coffee type by ID
export const deleteCoffeeTypeById = async (id: number): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    await api.delete(`/coffee-types/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    throw new Error(`Failed to delete coffee type with ID ${id}`);
  }
};
// Get all users (admin only)
export const getUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get<User[]>("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to fetch users");
  }
};

// Get user by ID
export const getUserById = async (id: number): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get<User>(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data); // Log the user data
    return response.data; // Return the user object
  } catch (error: any) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }
};
//get all coffee types
export const getCoffeeTypes = async (): Promise<CoffeeType[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get<CoffeeType[]>("/coffee-types", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to fetch coffee types");
  }
};
// Get coffee type by ID
export const getCoffeeTypeById = async (id: number): Promise<CoffeeType> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get<CoffeeType>(`/coffee-types/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data); // Log the coffee type data
    return response.data; // Return the coffee type object
  } catch (error: any) {
    throw new Error(`Failed to fetch coffee type with ID ${id}`);
  }
};

// Update a user by ID
export const updateUserById = async (
  id: number,
  updatedUser: Partial<User>
): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put<User>(`/users/${id}`, updatedUser, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to update user with ID ${id}`);
  }
};

// Delete a user by ID
export const deleteUserById = async (id: number): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    await api.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    throw new Error(`Failed to delete user with ID ${id}`);
  }
};
