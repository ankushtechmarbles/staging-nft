<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use function PHPUnit\Framework\throwException;

class AiGenerationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function generateTshirtTexture(Request $request): JsonResponse
    {
        try {

            $fields = $request->validate([
                'text' => 'string|required',
            ]);

            $engineId = 'stable-diffusion-512-v2-0';
            $apiHost = env('API_HOST') ?? 'https://api.stability.ai';

            $url = "$apiHost/v1alpha/generation/$engineId/text-to-image";

            $apiKey = env('STABILITY_API_KEY');
            if (!$apiKey) {
                throwException("Missing Stability API key.");
            }

            $client = new \GuzzleHttp\Client();

            $body = [
                "cfg_scale" => 7,
                "clip_guidance_prest" =>
                    'FAST_BLUE',
                "height" => 512,
                "width" => 512,
                "samples" => 1,
                "steps" => 50,
                "text_prompts" => [["text" => $fields['text'], "weight" => 1]]
            ];

            $response = $client->request('POST', $url, [
                'body' => json_encode($body),
                'headers' => [
                    'Authorization' => $apiKey,
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                ],
            ]);

            $responseBody = json_decode($response->getBody()->getContents(), true);

            return response()->json([
                "message" => "Success",
                "photo" => $responseBody,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
