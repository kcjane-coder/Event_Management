<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venue;

class VenueController extends Controller
{
    public function store(Request $request)
    {
        // Validate data
        $request->validate([
            'name' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'description' => 'required|string',
        ]);

        // Insert into database
        $venue = Venue::create([
            'organizer_id' => $request->user_id, 
            'name' => $request->name,
            'place' => $request->place,
            'contact' => $request->contact,
            'description' => $request->description,
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

}