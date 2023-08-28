<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommunityScoreRequest;
use App\Http\Requests\UpdateCommunityScoreRequest;
use App\Models\CommunityScore;
use App\Models\Project;
use App\Models\ProjectScore;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommunityScoreController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function vote(Request $request)
    {
        if ($request->getMethod() === 'POST') {
            try {

                $validator = Validator::make($request->all(), $rules = [
                    'id'        =>  'required',
                    'medal'     =>  'requierd|integer',
                    'heart'     =>  'required|integer',
                    'money_bag' =>  'required|integer',
                    'fire'      =>  'required|integer'
                ]);

                if ($validator->fails()) {
                    return $this->jsonValidation($validator);
                }

                $user = User::where('id', auth()->user()->id)->first();

                if ($user->credits <= 0) {
                    return response([
                        'error' => "I'm sorry we couldn't cast your vote at this time. You need more credits",
                    ], 500);
                }

                $project = Project::where('id', $request->id);
                $communityScore = CommunityScore::where('id', $project->id)->first();

                $communityScore->medal = $request->medal;
                $communityScore->heart = $request->heart;
                $communityScore->fire = $request->fire;
                $communityScore->money_bag = $request->money_bag;
                $communityScore->total_score = CommunityScore::findScore();
                $communityScore->save();

                if ($user->credits) {
                    $user->credits = $user->credits - 1;
                } else {
                    $user->credits = 9;
                }

                $user->save();

                return response([
                    'message' => 'Vote submitted!',
                ], 200);
            } catch (\Throwable $th) {
                return response([
                    'error' => "I'm sorry we couldn't cast your vote at this time",
                ], 500);
            }
        }
    }
}
