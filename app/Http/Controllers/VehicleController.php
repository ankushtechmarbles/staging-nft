<?php

namespace App\Http\Controllers;

use App\Models\Spaceship;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Vehicle::get();
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response("Unable to find Vehicle", 404);
        }

        return response($vehicle, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function showHumanityRocks($id)
    {

        // get first spaceship with id 1
        $humanityRocksVehicle = Spaceship::find($id);

        if (!$humanityRocksVehicle) {
            return response("Unable to find spaceship", 404);
        }

        return response(json_encode($humanityRocksVehicle), 200);
    }


    public function store(Request $request)
    {

        $vehicle = Vehicle::where('id', 1)->first();

        // if 1 doesnt exist make it
        if (!$vehicle) {
            $vehicle = Vehicle::create([
                "title" => $request->title,
                "wheelLight" => $request->wheelLight,
                "rimType" => $request->rimType,
                "wheelSize" => $request->wheelSize,
                "attributes" => $request->attributesJSON
            ]);

            return response($vehicle, 201);
        }

        $vehicle_data = [
            "title" => $request->title,
            "wheelLight" => $request->wheelLight,
            "rimType" => $request->rimType,
            "wheelSize" => $request->wheelSize,
            "attributes" => $request->attributesJSON,
            "weapons" => json_encode([
                [
                    "type" => "roof",
                    "name" => "weapon2"
                ]
            ])
        ];

        // update vehicle
        $vehicle->update($vehicle_data);

        return response($vehicle, 201);
    }

    public function storeHumanityRocks(Request $request)
    {

        $vehicle = Spaceship::where('id', 1)->first();

        // if 1 doesnt exist make it
        if (!$vehicle) {
            $vehicle = Spaceship::create([
                "spaceship" => $request->spaceship,
                "character" => $request->character,
                "flame" => $request->flame,
            ]);

            return response($vehicle, 201);
        }

        $vehicle_data = [
            "spaceship" => $request->spaceship,
            "character" => $request->character,
            "flame" => $request->flame,
        ];

        // update vehicle
        $vehicle->update($vehicle_data);

        return response($vehicle, 201);
    }

    public function configurator($id)
    {
        $vehicle = Vehicle::find(1);

        return response(json_encode($vehicle), 200);
    }
}
