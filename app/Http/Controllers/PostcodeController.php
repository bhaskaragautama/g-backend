<?php

namespace App\Http\Controllers;

use App\Models\Postcode;
use Illuminate\Http\Request;

class PostcodeController extends Controller
{
    public function getPostcodeDetail($postcode)
    {
        $postcode = Postcode::with('prefecture')->where('postcode', $postcode)->first();
        if (!$postcode) {
            return response()->json(['error' => 'Postcode not found'], 404);
        }

        return response()->json($postcode);
    }
}
