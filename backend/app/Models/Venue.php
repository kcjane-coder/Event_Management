<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'name',
        'place',
        'contact',
        'description',
        'event_type',
        'food_type',
        'equipment_type',
         'organizer_id',
    ];
}
