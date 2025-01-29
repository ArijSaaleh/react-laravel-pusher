import type React from "react";
import { Coffee, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">Coffee Admin</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Button variant="ghost" asChild>
                    <a href="#orders" className="flex items-center">
                      <Coffee className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </a>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <a href="#machines" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Machines</span>
                    </a>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <a href="#users" className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Users</span>
                    </a>
                  </Button>
                </li>
              </ul>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <a href="#orders" className="flex items-center">
                    <Coffee className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#machines" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Machines</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#users" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Users</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
