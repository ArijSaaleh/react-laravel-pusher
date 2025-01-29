<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Machine;
use App\Models\CoffeeType;
use App\Models\User;

class OrderController extends Controller
{
    public function index() {
        return Order::with(['user', 'coffeeType', 'machine'])->get();
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'coffee_type_id' => 'required|exists:coffee_types,id',
            'machine_id' => 'required|exists:machines,id',
        ]);

        $machine = Machine::find($validated['machine_id']);
        $coffeeType = CoffeeType::find($validated['coffee_type_id']);
         // Get a copy of the machine's coffee capsules array
         $coffeeCapsules = $machine->coffee_capsules;

         // Initialize a flag to check if the coffee type is found in the machine
         $coffeeTypeFound = false;
        // Check if the machine has enough coffee capsules for the selected type
        foreach ($coffeeCapsules as &$capsule) {
            if ($capsule['coffee_type_id'] == $coffeeType->id) {
                $coffeeTypeFound = true;
                //check if there are enough capsules left
                if ($capsule['quantity'] <= 0) {
                    return response()->json(['error' => 'No capsules left for this coffee type'], 400);
                }
                // Decrease the capsule count in the machine
                $capsule['quantity']--;
                 // Update the machine's coffee capsules array after modification
                $machine->update(['coffee_capsules' => $coffeeCapsules]);
                break; // Since we've found the coffee type, exit the loop
            }
        }

         // If the coffee type was not found, return an error
        if (!$coffeeTypeFound) {
            return response()->json(['error' => 'Coffee type not found in the machine'], 400);
        }

        // Update the machine's coffee capsules array
        $machine->update(['coffee_capsules' => $coffeeCapsules]);

        // Decrease the global quantity of the coffee type
        $coffeeType->decrement('quantity');

        // Create the order
        $order = Order::create($validated);

        return response()->json($order, 201);
    }
    public function show($id) {
        return Order::with(['user', 'coffeeType', 'machine'])->find($id);
    }
}
