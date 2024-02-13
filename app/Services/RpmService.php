<?php

namespace App\Services;

class RpmService
{
    private $client;
    private $urlV2 = "https://api.readyplayer.me/v2";

    // create constructor
    public function __construct()
    {
        // create guzzle client
        $this->client = new \GuzzleHttp\Client();
    }

    private function getAvatarTemplates(string $token)
    {
        try {
            $response = $this->client->get($this->urlV2 . "/avatars/templates", [
                "headers" => [
                    "Authorization" => "Bearer " . $token,
                ]
            ]);

            $data = json_decode($response->getBody()->getContents());

            $templateData = $data->data;

            // get total templates (array length)
            $totalTemplates = count($templateData);

            // return random avatar template
            return $templateData[rand(0, $totalTemplates - 1)];
        } catch (\Throwable $th) {
            // write to laravel log file
            \Log::error($th->getMessage());
            return $th->getMessage();
        }
    }

    private function createAvatarDraft(string $templateId, string $token)
    {
        try {
            $response = $this->client->post($this->urlV2 . "/avatars/templates/" . $templateId, [
                "headers" => [
                    "Authorization" => "Bearer " . $token,
                ],
                "form_params" => [
                    "data" => [
                        "partner" => "idea-test",
                        "bodyType" => "fullbody"
                    ]
                ]
            ]);

            $data = json_decode($response->getBody()->getContents());

            $avatarData = $data->data;

            return [
                "assets" => $avatarData->assets,
                "bodyType" => $avatarData->bodyType,
                "gender" => $avatarData->gender,
                "id" => $avatarData->id,
                "partner" => $avatarData->partner,
            ];
        } catch (\Throwable $th) {
            // write to laravel log file
            \Log::error($th->getMessage());
            return $th->getMessage();
        }
    }

    private function saveAvatarDraft(string $avatarId, string $token)
    {
        try {
            $response = $this->client->put($this->urlV2 . "/avatars/" . $avatarId, [
                "headers" => [
                    "Authorization" => "Bearer " . $token,
                ]
            ]);

            $data = json_decode($response->getBody()->getContents());

            $avatarData = $data->data;

            return [
                "id" => $avatarData->id,
                "partner" => $avatarData->partner,
                "bodyType" => $avatarData->bodyType,
                "assets" => $avatarData->assets,
                "favorite" => $avatarData->favorite
            ];
        } catch (\Throwable $th) {
            // write to laravel log file
            \Log::error($th->getMessage());
            return $th->getMessage();
        }
    }

    public function createAnonUser()
    {
        try {
            // create user
            $response = $this->client->post("https://IDEA-Test.readyplayer.me/api/users");

            $data = json_decode($response->getBody()->getContents());

            $userData = $data->data;

            // get random template
            $template = $this->getAvatarTemplates($userData->token);

            // create avatar draft
            $avatarDraft = $this->createAvatarDraft($template->id, $userData->token);

            // save avatar draft and return
           $avatarData = $this->saveAvatarDraft($avatarDraft['id'], $userData->token);


            return [
                "id" => $userData->id,
                "token" => $userData->token,
                "avatarId" => $avatarData['id'],
                "imageUrl" => $template->imageUrl,
                "assets" => $avatarData["assets"],
                "bodyType" => $avatarData["bodyType"],
                "glbFile" => "https://api.readyplayer.me/v2/avatars/" . $avatarData['id'] . ".glb?morphTargets=mouthSmile",
            ];
        } catch (\Throwable $th) {
            // write to laravel log file
            \Log::error($th->getMessage());
            return $th->getMessage();
        }
    }
}
