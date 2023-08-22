<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Process\Process;

class UnityController extends Controller
{
    /**
     * Display a listing of the resource.
//     */
    public function index()
    {
        return response([
            'message' => 'Hello from Unity'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $rules = [
        ]);

        if($validator->fails()) {
            return $this->jsonValidation($validator);
        }

        Log::info($request->all());

        // make http post request with guzzle
        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', 'http://localhost:3000/web3', [
            'form_params' => [
                "data" => $request->all(),
                "hello" => "hello"
            ]
        ]);

        $response = json_decode($response->getBody(), true);

        return response(
            $response["data"],
            200
        );
    }

    /**
     * Display the specified resource.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), $rules = [
        ]);

        if($validator->fails()) {
            return $this->jsonValidation($validator);
        }

        // make http post request with guzzle
        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', 'http://localhost:3000/auth/login', [
            'form_params' => [
                "payload" => [
                    "payload" => $request->payload,
                    "signature" => $request->signature
                ]
            ]
        ]);

        $response = json_decode($response->getBody(), true);

        return response(
            ["token" => $response["token"]],
            200
        );    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
