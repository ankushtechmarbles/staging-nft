<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatgptAssistantRequest;
use App\Services\ChatgptService;

class ChatgptAssistant extends Controller
{
    public function askQuestion(ChatgptService $chatgptService, ChatgptAssistantRequest $request): \Illuminate\Http\JsonResponse
    {
        try {
            if($request->thread_id){
                // create message
                $message = $chatgptService->addMessageToThread($request->thread_id, $request->message);

                // retrieve run status
                $runStatus = $chatgptService->retrieveRunStatus($request->thread_id, $message->id);

                // check if status is completed if not run again in a loop until it is
                while($runStatus->status != 'completed') {
                    // if status is expired, failed or cancelled end loop
                    if($runStatus->status == 'expired' || $runStatus->status == 'failed' || $runStatus->status == 'cancelled') {
                        // return error
                        return response()->json([
                            'message' => 'Something went wrong',
                            'error' => $runStatus->status
                        ], 500);
                    }

                    // wait 1 second before running again
                    sleep(0.5);
                    $runStatus = $chatgptService->retrieveRunStatus($request->thread_id, $runStatus->id);
                }

                // get messages
                $messages = $chatgptService->getLatestMessages($runStatus->threadId);

                return response()->json([
                    'message' => 'success',
                    'data' => $messages->toArray()
                ], 200);
            } else {
                // use chatgptservice to create thread
                // create and run thread
                $threadResponse = $chatgptService->createAndRunThread($request->message);

                // retrieve run status
                $runStatus = $chatgptService->retrieveRunStatus($threadResponse->threadId, $threadResponse->id);

                // check if status is completed if not run again in a loop until it is
                while($runStatus->status != 'completed') {
                    // if status is expired, failed or cancelled end loop
                    if($runStatus->status == 'expired' || $runStatus->status == 'failed' || $runStatus->status == 'cancelled') {
                        // return error
                        return response()->json([
                            'message' => 'Something went wrong',
                            'error' => $runStatus->status
                        ], 500);
                    }

                    // wait 1 second before running again
                    sleep(0.35);
                    $runStatus = $chatgptService->retrieveRunStatus($runStatus->threadId, $runStatus->id);
                }

                // get messages
                $messages = $chatgptService->getLatestMessages($runStatus->threadId);

                return response()->json([
                    'message' => 'success',
                    'data' => $messages->toArray()
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
