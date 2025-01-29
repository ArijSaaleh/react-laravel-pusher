import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Order, User, coffee_type, Machine } from "./types"

interface OrdersSectionProps {
  orders: Order[]
  users: User[]
  coffeeTypes: coffee_type[]
  machines: Machine[]
}

export function OrdersSection({ orders, users, coffeeTypes, machines }: OrdersSectionProps) {

  // Function to get the user name by user_id
  const getUserName = (userId: number) => {
    const user = users.find((user) => user.id === userId)
    return user ? `${user.name} ` : 'Unknown'
  }

  // Function to get the coffee type name by coffee_type_id
  const getCoffeeTypeName = (coffeeTypeId: number) => {
    const coffeeType = coffeeTypes.find((coffee) => coffee.id === coffeeTypeId)
    return coffeeType ? coffeeType.name : 'Unknown'
  }

  // Function to get the machine location by machine_id
  const getMachineLocation = (machineId: number) => {
    const machine = machines.find((machine) => machine.id === machineId)
    return machine ? machine.location : 'Unknown'
  }
    // Function to format the created_at date
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleString() // Returns a readable format like: "1/28/2025, 5:30:00 PM"
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Coffee Type</TableHead>
              <TableHead>Machine Location</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className={`order-item ${order.newOrder ? "bg-green-200" : "bg-white"}`}>
                <TableCell>{getUserName(order.user_id)}</TableCell>
                <TableCell>{getCoffeeTypeName(order.coffee_type_id)}</TableCell>
                <TableCell>{getMachineLocation(order.machine_id)}</TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
