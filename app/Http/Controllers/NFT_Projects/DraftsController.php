<?php

namespace App\Http\Controllers;

use App\Models\Drafts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DraftsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), $rules = [
            'id' => 'integer|required'
        ]);

        if($validator->fails()) {
            return $this->jsonValidation($validator);
        }

        // find a single resource by id
        if($request->id) {
            $draft = Drafts::find($request->id)->with("claimAgreements")->with("mintedNfts");

            if(!$draft) {
                return response([
                    'message' => 'Draft not found'
                ], 404);
            }

            if(!$draft->is_public && $draft->user_id != $request->user()->id) {
                return response([
                    'message' => 'Unauthorized'
                ], 401);
            }

            return response($draft, 200);
        }

        // find all resources
        $drafts = Drafts::all();

        if($drafts->isEmpty()) {
            return response([
                'message' => 'Drafts not found'
            ], 404);
        }

        return response($drafts, 200);
    }

    /**
     * Display all public drafts.
     */
    public function getPublicDrafts(Request $request)
    {
        // get all public drafts
        $drafts = Drafts::where('public', true)->get();

        if($drafts->isEmpty()) {
            return response([
                'message' => 'Drafts not found'
            ], 404);
        }

        return response($drafts, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $rules = [
            'name' => 'required|string',
            'description' => 'required|string',
            'problem' => 'required|string',
            'solution' => 'required|string',
            'utilities' => 'required|string',
            'members' => 'required|string',
            'animation_url' => 'required|string',
            'image_url' => 'required|string',
            'blockchain' => 'required|string',
            'is_minted' => 'required|boolean',
            'is_public' => 'required|boolean',
            'user_id' => 'required|integer',
        ]);

        if($validator->fails()) {
            return $this->jsonValidation($validator);
        }


        // finish the function to create a draft in the database
        $draft = Drafts::create([
            'name' => $validator['name'],
            'description' => $validator['description'],
            'problem' => $validator['problem'],
            'solution' => $validator['solution'],
            'utilities' => $validator['utilities'],
            'members' => $validator['members'],
            'animation_url' => $validator['animation_url'],
            'image_url' => $validator['image_url'],
            'blockchain' => $validator['blockchain'],
            'is_minted' => $validator['is_minted'],
            'is_public' => $validator['is_public'],
            'user_id' => $validator['user_id'],
        ]);

        return response($draft, 201);
    }

    /**
     * Display the specified users resources.
     */
    public function show()
    {
        if(!auth()->user()) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        // find and return JSON of the logged in users drafts from the database
        $drafts = Drafts::where('user_id', auth()->user()->id)->get();

        if($drafts->isEmpty()) {
            return response([
                'message' => 'Drafts not found'
            ], 404);
        }

        return response($drafts, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // finish the function to find and update a draft in the database

        $validator = Validator::make($request->all(), $rules = [
            'id' => 'required|string',
            'name' => 'required|string',
            'description' => 'required|string',
            'problem' => 'required|string',
            'solution' => 'required|string',
            'utilities' => 'required|string',
            'members' => 'required|string',
            'animation_url' => 'required|string',
            'image_url' => 'required|string',
            'blockchain' => 'required|string',
            'is_minted' => 'boolean',
            'is_public' => 'boolean',
            'user_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->jsonValidation($validator);
        }

        // find drafts by id
        $drafts = Drafts::find($validator['id']);

        if(!$drafts) {
            return response([
                'message' => 'Draft not found'
            ], 404);
        }

        // update the draft
        $drafts->update([
            'name' => $validator['name'],
            'description' => $validator['description'],
            'problem' => $validator['problem'],
            'solution' => $validator['solution'],
            'utilities' => $validator['utilities'],
            'members' => $validator['members'],
            'animation_url' => $validator['animation_url'],
            'image_url' => $validator['image_url'],
            'blockchain' => $validator['blockchain'],
            'is_minted' => $validator['is_minted'],
            'is_public' => $validator['is_public'],
            'user_id' => $validator['user_id'],
        ]);

        return response($drafts, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // finish the function to find and delete a draft in the database

        $validator = Validator::make($request->all(), $rules = [
            'id' => 'required|string',
            'user_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->jsonValidation($validator);
        }

        if($validator['user_id'] != auth()->user()->id) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        // find drafts by id
        $drafts = Drafts::find($validator['id']);

        if(!$drafts) {
            return response([
                'message' => 'Draft not found'
            ], 404);
        }

        // delete the draft
        $drafts->delete();

        return response([
            'message' => 'Draft deleted'
        ], 200);
    }
}
