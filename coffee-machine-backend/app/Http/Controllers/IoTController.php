<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Machine;
use App\Models\CoffeeType;
use App\Models\Order;
use App\Events\OrderPlaced;
use Illuminate\Events\Dispatcher;

class IoTController extends Controller
{
     // Function to verify RFID tag
     public function verifyRFID(Request $request)
     {
         // Retrieve the RFID tag from the query parameter
         $rfidTag = $request->query('rfid_tag');
        
         // Find user by RFID tag
         $user = User::where('rfid_tag', $rfidTag)->first();
         
         if ($user) {
             return response()->json([
                 'success' => true,
                 'user_id' => $user->id,
                 'message' => 'RFID tag verified successfully',
             ]);
         } else {
             return response()->json([
                 'success' => false,
                 'message' => 'Unauthorized: RFID tag not found',
             ], 401);
         }
     }
 
     // Function to handle coffee selection
     public function selectCoffee(Request $request)
     {
        \Log::info('Coffee selection request received', ['rfid_tag' => $request->rfid_tag, 'coffee_type' => $request->coffee_type]);
        
         // Validate incoming request
         $validated = $request->validate([
            'rfid_tag' => 'required|string',
            'coffee_type' => 'required|string',
            'machine_location' => 'required|string',
        ]);

         // Find the coffee machine based on the location
        $machine = Machine::where('location', $validated['machine_location'])->first();

        if (!$machine) {
            return response()->json(['success' => false, 'message' => 'Coffee machine not found'], 404);
        }
        // Find user by RFID tag
        $user = User::where('rfid_tag', $request->rfid_tag)->first();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid RFID tag, user not found'
            ], 404);
        }

        // Find the coffee type
        $coffeeType = CoffeeType::where('name', $request->coffee_type)->first();

        if (!$coffeeType || $coffeeType->quantity <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid coffee type'
            ], 400);
        }
        
        // Create a new order
        $order = Order::create([
            'user_id' => $user->id,
            'coffee_type_id' => $coffeeType->id,
            'machine_id' => $machine->id,
        ]);
        //triger event broadcasting
        event(new OrderPlaced($order));
        
        
        
        // Update coffee stock (assuming machine coffee stock is tracked)
        if ($coffeeType->quantity > 0) {
            $coffeeType->quantity -= 1;
            $coffeeType->save();
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Out of stock for this coffee type'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'Coffee selection successful',
            'coffee_type' => $coffeeType->name,
        ]);
    }
}
