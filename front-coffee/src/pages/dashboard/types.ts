export interface Order {
    id: number
    user_id: number
    coffee_type_id: number
    machine_id: number
    newOrder?: boolean; 
    created_at: string;

  }
  
  export interface Machine {
    id: number
    location: string
    coffee_capsules?: { coffee_type_id: number; quantity: number }[]
  }
  
  export interface User {
    id: number
    name: string
    email: string
    rfid_tag: string
  }
  export interface coffee_type {
    id: number
    name: string
    quantity: number
  }
  