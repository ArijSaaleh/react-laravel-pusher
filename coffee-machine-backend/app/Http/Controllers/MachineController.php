<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Machine;

class MachineController extends Controller
{
    public function index() {
        return Machine::all();
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'location' => 'required',
            'coffee_capsules' => 'required|array|min:1|max:3',
            'coffee_capsules.*.coffee_type_id' => 'exists:coffee_types,id',
            'coffee_capsules.*.quantity' => 'required|integer|min:0|max:10',
        ]);

        return Machine::create([
            'location' => $validated['location'],
            'coffee_capsules' => $validated['coffee_capsules'],
        ]);
    }

    public function show($id) {
        return Machine::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $machine = Machine::findOrFail($id);
        $validated = $request->validate([
            'coffee_capsules' => 'required|array|min:1|max:3',
            'coffee_capsules.*.coffee_type_id' => 'exists:coffee_types,id',
            'coffee_capsules.*.quantity' => 'required|integer|min:0|max:10',
        ]);

        $machine->update([
            'coffee_capsules' => $validated['coffee_capsules'],
        ]);

        return $machine;
    }

    public function destroy($id) {
        return Machine::destroy($id);
    }
}
