<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;
    protected $fillable = ['location', 'coffee_capsules'];

    protected $casts = [
        'coffee_capsules' => 'array',
    ];

    public function orders() {
        return $this->hasMany(Order::class);
    }
}
