<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Validator;
use App\Models\ProjectScore;
use App\Models\User;

class ProjectScoreController extends Controller
{

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
                $projectScore = ProjectScore::where('id', $project->id)->first();

                $projectScore->medal = $request->medal;
                $projectScore->heart = $request->heart;
                $projectScore->fire = $request->fire;
                $projectScore->money_bag = $request->money_bag;
                $projectScore->total_score = ProjectScore::findScore();
                $projectScore->save();

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
