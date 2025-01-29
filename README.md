# Coffee Machine Management Dashboard

A web-based application to manage coffee machines, users, and orders, featuring real-time updates using Laravel broadcasting and Pusher. This project involves a backend built with Laravel and a frontend using React, Vite, ShadCN/UI, and TailwindCSS.

## Features

- Manage Coffee Machines:
  - Add, edit, and delete machines.
  - Track available coffee types and capsules quantity per machine.
  
- Manage Orders:
  - View a list of all coffee orders.
  - Orders are updated in real-time using Laravel Broadcasting and Pusher.
  - Newly placed orders are highlighted temporarily.

- User Management:
  - Create, edit, and delete users.
  
- RFID-based Authentication:
  - Employees can order coffee using their RFID tag.

## Tech Stack

### Backend:
- **Laravel**: A PHP framework used to build APIs for coffee machines, users, and orders management.
- **Laravel Broadcasting**: To enable real-time notifications when new orders are placed.
- **Pusher**: To handle WebSocket communications and real-time event broadcasting.
  
### Frontend:
- **React**: Used to build the user interface.
- **Vite**: The build tool for fast and efficient development.
- **ShadCN/UI**: For reusable UI components.
- **TailwindCSS**: A utility-first CSS framework for styling.

## Getting Started

### Prerequisites

- PHP 8.x
- Composer
- Node.js (v14+)
- NPM or Yarn
- MySQL or any database supported by Laravel

### Backend Setup (Laravel)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/coffee-machine-backend.git
   cd coffee-machine-backend
   ```
2. Install PHP dependencies:

    ```bash

        composer install
    ```
3. Configure the .env file:

    Set up your database credentials.
    Add your Pusher credentials (if using Pusher for real-time updates).
    Example:

    ```env

        PUSHER_APP_ID=your_pusher_app_id
        PUSHER_APP_KEY=your_pusher_app_key
        PUSHER_APP_SECRET=your_pusher_app_secret
        PUSHER_APP_CLUSTER=eu
    ```
4. Generate the application key:

    ```bash
        php artisan key:generate
    ```
5. Run the migrations:

    ```bash
        php artisan migrate
    ```
6. Seed the database (optional):

    ```bash
        php artisan db:seed
    ```
7. Start the Laravel development server:

    ```bash
        php artisan serve

## Frontend Setup (React)

1. Navigate to the frontend directory:

    ```bash
    cd ../front-coffee
    ```

2. Install the Node.js dependencies:

    ```bash
    npm install
    ```

3. Configure the `.env` file for API URL and Pusher:

    ```env
    VITE_API_URL=http://localhost:8000/api
    VITE_PUSHER_APP_KEY=your_pusher_app_key
    VITE_PUSHER_CLUSTER=eu
    ```

4. Start the Vite development server:

    ```bash
    npm run dev
    ```

## Usage

Once both the backend and frontend servers are running:

- Open the frontend application in your browser at `http://localhost:3000`.
- Log in as an admin to manage machines, orders, and users.
- Users can order coffee using their RFID tag.

## Real-time Updates

This project uses **Laravel Broadcasting** with **Pusher** to deliver real-time updates. When an order is placed, it will automatically appear in the orders section of the dashboard.

### How It Works:
- The backend triggers an `OrderPlaced` event when a new order is created.
- This event is broadcast to the frontend via **Pusher**.
- The React dashboard listens for this event and updates the list of orders, highlighting the new order.

### License
This project is open source.

### Contact
If you have any questions or suggestions, feel free to reach out.