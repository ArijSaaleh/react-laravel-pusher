import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { EditUserModal } from "./EditUserModal"
import type { User } from "./types"

interface UsersSectionProps {
  users: User[]
  onDelete: (id: number) => Promise<void>
  onEdit: (updatedUser: User) => Promise<void>
}

 function UsersSection({ users, onDelete, onEdit }: UsersSectionProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
  }

  const handleModalClose = () => {
    setSelectedUser(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="secondary" onClick={() => handleEditClick(user)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => onDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {selectedUser && (
        <EditUserModal user={selectedUser} onClose={handleModalClose} onEdit={onEdit} />
      )}
    </Card>
  )
}
export default UsersSection;