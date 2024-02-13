<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MintProjectRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name"  => "required|string",
            "address" => "required|string",
            "image_url" => "required|string",
            "animation_url" => "required|string",
        ];
    }
}
