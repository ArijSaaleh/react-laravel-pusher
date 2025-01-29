<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CoffeeType;

class CoffeeTypeController extends Controller
{
    public function index() {
        return CoffeeType::all();
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required',
            'quantity' => 'required|integer',
        ]);

        return CoffeeType::create($validated);
    }

    public function show($id) {
        return CoffeeType::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $coffeeType = CoffeeType::findOrFail($id);
        $coffeeType->update($request->all());
        return $coffeeType;
    }

    public function destroy($id) {
        return CoffeeType::destroy($id);
    }
}
