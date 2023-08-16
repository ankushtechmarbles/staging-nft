<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Return response with status 1
     * @param array $data
     * @return josn
     */
    public function jsonSuccess($data = null)
    {
        return response()->json(['data' => $data, 'status' => 1, 'message' => null]);
    }

    public function jsonError(string $errors = '', int $status = 2)
    {
        return response()->json(['message' => $errors, 'status' => $status, 'data' => null]);
    }

    public function jsonValidation($validator)
    {
        return response()->json(['message' => implode("\n", $validator->errors()->all()), 'status' => 2, 'data' => null]);
    } 
}
