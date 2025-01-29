<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'coffee_type_id', 'machine_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function coffeeType() {
        return $this->belongsTo(CoffeeType::class);
    }

    public function machine() {
        return $this->belongsTo(Machine::class);
    }
}
