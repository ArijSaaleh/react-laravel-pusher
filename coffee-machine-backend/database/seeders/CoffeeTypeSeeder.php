<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CoffeeType;

class CoffeeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        CoffeeType::create(['name' => 'Intenso', 'quantity' => 50]);
        CoffeeType::create(['name' => 'Espresso', 'quantity' => 50]);
        CoffeeType::create(['name' => 'Lungo', 'quantity' => 50]);
        CoffeeType::create(['name' => 'Decaf', 'quantity' => 50]);
    }
}
