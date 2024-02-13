<?php

namespace App\Services;

use OpenAI;

class ChatgptService
{
    private $client;

    // create constructor
    public function __construct()
    {
        $yourApiKey = getenv('OPENAI_API_KEY');
        $this->client = OpenAI::client($yourApiKey);
    }

    public function createAndRunThread(string $message): OpenAI\Responses\Threads\Runs\ThreadRunResponse
    {
        return $this->client->threads()->createAndRun(
            [
                'assistant_id' => 'asst_33og0VGwlWkwoG6Z9v2mN6gb',
                'thread' => [
                    'messages' => [
                        [
                            'role' => 'user',
                            'content' => $message,
                        ],
                    ]
                ],
            ]
        );
    }

    public function addMessageToThread(string $threadId, string $message): OpenAI\Responses\Threads\Messages\ThreadMessageResponse
    {
        return $this->client->threads()->messages()->create($threadId, [
            'role' => 'user',
            'content' => $message,
        ]);
    }

    public function getLatestMessages(string $threadId): OpenAI\Responses\Threads\Messages\ThreadMessageListResponse
    {
        return $this->client->threads()->messages()->list($threadId, []);
    }

    public function retrieveRunStatus(string $threadId, string $runId): OpenAI\Responses\Threads\Runs\ThreadRunResponse
    {
        return $this->client->threads()->runs()->retrieve($threadId, $runId);
    }

    public function retrieveMessages(string $threadId, $messageId): OpenAI\Responses\Threads\Messages\ThreadMessageResponse
    {
        return $this->client->threads()->messages()->retrieve($threadId, $messageId->lastId);
    }

}
