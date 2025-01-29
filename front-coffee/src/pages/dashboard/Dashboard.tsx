"use client"

import React, { useState, useEffect } from "react"
import Pusher from "pusher-js"
import { DashboardLayout } from "./DashboardLayout"
import { OrdersSection } from "./OrdersSection"
import { MachinesSection } from "./MachinesSection"
import { UsersSection } from "./UsersSection"
import { getOrders, getMachines, getUsers, updateUserById, deleteUserById, getCoffeeTypes } from "../api"
import type { Order, Machine, User, coffee_type } from "./types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [machines, setMachines] = useState<Machine[]>([]);
  const [coffeeTypes, setCoffeeTypes] = useState<coffee_type[]>([]); // State to hold coffee types

  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  const fetchData = async () => {
    try {
      const [fetchedOrders, fetchedMachines, fetchedUsers, fetchedCoffeeTypes] = await Promise.all([
        getOrders(),
        getMachines(),
        getUsers(),
        getCoffeeTypes(), // Fetch coffee types

      ])
      setOrders(fetchedOrders)
      setMachines(fetchedMachines)
      setUsers(fetchedUsers)
      setCoffeeTypes(fetchedCoffeeTypes); // Set coffee types data
    } catch (err: any) {
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher("d1dd9164abb1f65833c3", {
      cluster: "eu",
      forceTLS: true,
    });

    // Subscribe to the orders channel
    const channel = pusher.subscribe("orders");
    console.log(channel);
    // Listen for OrderPlaced event
    channel.bind("order.placed", (data: { order: Order }) => {
      console.log("New order placed:", data.order); // Debugging line
      // When a new order is placed, mark it as new with a "newOrder" flag
      const newOrder = { ...data.order, newOrder: true }
      // When an order is placed, update the orders state
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
       // Set a timeout to reset the "newOrder" flag after 5 seconds
       setTimeout(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === newOrder.id ? { ...order, newOrder: false } : order
          )
        )
      }, 5000) // Change color back to normal after 5 seconds
    });

    // Cleanup: Unbind and unsubscribe when component unmounts
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </DashboardLayout>
    )
  }
  const handleEditUser = async (updatedUser: User) => {
    try {
      const updatedData = await updateUserById( updatedUser.id, updatedUser ) // Call the API to update the user
      // Update the state with the new data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedData.id ? updatedData : user
        )
      )
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }
  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUserById(id) // Call the API to delete the user
      // Update the state by filtering out the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }
 
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6">
        <OrdersSection orders={orders} 
          users={users} 
          coffeeTypes={coffeeTypes} 
          machines={machines} />
        <MachinesSection machines={machines} coffeeTypes={coffeeTypes} refetchMachines ={()=> fetchData()}/>
        <UsersSection users={users} onEdit={handleEditUser} onDelete={handleDeleteUser}/>
      </div>
    </DashboardLayout>
  )
}

