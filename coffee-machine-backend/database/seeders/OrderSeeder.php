<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;
use App\Models\CoffeeType;
use App\Models\Machine;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Get some users, coffee types, and machines
        $user1 = User::where('email', 'john.doe@example.com')->first();
        $user2 = User::where('email', 'john.doe@example.com')->first();

        $intenso = CoffeeType::where('name', 'Intenso')->first();
        $espresso = CoffeeType::where('name', 'Espresso')->first();

        $machine1 = Machine::where('location', 'Office A - Floor 1')->first();
        $machine2 = Machine::where('location', 'Cafeteria - Ground Floor')->first();

        // Create orders
        Order::create([
            'user_id' => $user1->id,
            'coffee_type_id' => $intenso->id,
            'machine_id' => $machine1->id,
            'created_at' => now(),
        ]);

        Order::create([
            'user_id' => $user2->id,
            'coffee_type_id' => $espresso->id,
            'machine_id' => $machine2->id,
            'created_at' => now(),
        ]);
    }
}
