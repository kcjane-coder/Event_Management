<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venue;

class VenueController extends Controller
{
    public function store(Request $request)
    {
        // Validate all fields including combo boxes
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'contact' => 'required|string|max:50',
            'description' => 'required|string',
            'event_type' => 'required|string|in:Wedding,Birthday,Corporate,Concert',
            'food_type' => 'required|string|in:Veg,Non-Veg,Buffet,Snacks Only',
            'equipment_type' => 'required|string|in:Sound System,Lighting,Stage Setup,Chairs & Tables',
        ]);

        // Create the venue
        $venue = Venue::create([
            'organizer_id' => auth()->id(),
            'name' => $validated['name'],
            'place' => $validated['place'],
            'contact' => $validated['contact'],
            'description' => $validated['description'],
            'event_type' => $validated['event_type'],
            'food_type' => $validated['food_type'],
            'equipment_type' => $validated['equipment_type'],
        ]);

        return response()->json([
            'message' => 'Venue added successfully!',
            'venue' => $venue
        ], 201);
    }


 // ✅ Add this method to fetch all venues
    public function index()
    {
        $venues = Venue::all(); // or filter by organizer if needed
        return response()->json($venues);
    }


public function destroy($id)
{
    $venue = Venue::find($id);

    if (!$venue) {
        return response()->json(['message' => 'Venue not found'], 404);
    }

    $venue->delete();

    return response()->json(['message' => 'Venue deleted successfully']);
}

public function show($id)
{
    $venue = Venue::find($id);

    if (!$venue) {
        return response()->json(['message' => 'Venue not found'], 404);
    }

    return response()->json($venue);
}


}