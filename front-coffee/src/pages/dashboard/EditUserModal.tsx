import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { User } from "./types"

interface EditUserModalProps {
  user: User
  onClose: () => void
  onEdit: (updatedUser: User) => Promise<void>
}

export function EditUserModal({ user, onClose, onEdit }: EditUserModalProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [rfid_tag, setRfidTag] = useState(user.rfid_tag)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      await onEdit({ ...user, name, email, rfid_tag })
      onClose()
    } catch (error) {
      console.error("Failed to update user", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label>
            Name
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
            <label>
                RFID Tag
                <Input value={rfid_tag} onChange={(e) => setRfidTag(e.target.value)} />
            </label>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
