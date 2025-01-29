<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Machine;

class MachineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Define an array of machine data with capsules
        $machines = [
            [
                'location' => 'Office A - Floor 1',
                'coffee_capsules' => json_encode([
                    ['coffee_type_id' => 1, 'quantity' => 10], // 10 capsules of coffee type 1
                    ['coffee_type_id' => 2, 'quantity' => 7],  // 7 capsules of coffee type 2
                    ['coffee_type_id' => 3, 'quantity' => 3],  // 3 capsules of coffee type 3
                ]),
            ],
            [
                'location' => 'Office B - Floor 2',
                'coffee_capsules' => json_encode([
                    ['coffee_type_id' => 2, 'quantity' => 10], // 10 capsules of coffee type 2
                    ['coffee_type_id' => 1, 'quantity' => 5],  // 5 capsules of coffee type 1
                    ['coffee_type_id' => 3, 'quantity' => 0],  // 0 capsules of coffee type 3
                ]),
            ],
            [
                'location' => 'Cafeteria - Ground Floor',
                'coffee_capsules' => json_encode([
                    ['coffee_type_id' => 1, 'quantity' => 10],
                    ['coffee_type_id' => 3, 'quantity' => 10],
                    ['coffee_type_id' => 2, 'quantity' => 8],
                ]),
            ],
        ];

        // Loop through the array and insert each machine record into the database
        foreach ($machines as $machine) {
            Machine::create($machine);
        }
    }
}
