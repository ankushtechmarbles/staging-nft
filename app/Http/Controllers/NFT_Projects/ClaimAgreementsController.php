<?php

namespace App\Http\Controllers;

use App\Models\ClaimAgreements;
use App\Models\Project;
use Illuminate\Http\Request;

class ClaimAgreementsController extends Controller
{
    /**
     * Claim a created Draft.
     */
    public function store(Request $request)
    {
        // check if user is authenticated
        if(!$request->user()) {
            return response([
                'message' => 'User not authenticated'
            ], 401);
        }

        $fields = $request->validate([
            'draft_id' => 'string|required',
            'user_id' => 'string|required'
        ]);

        // find a Draft in the database by id
        $draft = Project::find($fields['draft_id']);

        // check if draft is claimed already
        if($draft->claim_agreement_id != null) {
            return response([
                'message' => 'Draft already claimed'
            ], 400);
        }

        // claim draft by creating a new ClaimAgreement
        $claimAgreement = ClaimAgreements::create([
            'draft_id' => $draft->id,
            'owner_id' => $draft->user_id,
            'claimer_id' => $fields['user_id'],
        ]);

        // re-assign draft to claimer and update claim agreement with claimAgreement id
        $draft->user_id = $fields['user_id'];
        $draft->claim_agreement_id = $claimAgreement->id;
        $draft->save();

        // return new claim agreement & draft
        return response([
            'message' => 'Draft claimed successfully',
            'claimAgreement' => $claimAgreement,
            'draft' => $draft
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(ClaimAgreements $claimAgreements)
    {
        // get all of the logged in users agreements
        $claimAgreements = ClaimAgreements::where('claimer_id', auth()->user()->id)->get();

        if($claimAgreements->isEmpty()) {
            return response([
                'message' => 'Claim agreements not found'
            ], 404);
        }

        return response($claimAgreements, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // check if user is authenticated and is the claimer or owner of the agreement
        if(!$request->user() || ($request->user()->id != $request->claimer_id && $request->user()->id != $request->owner_id)) {
            return response([
                'message' => 'User not authenticated'
            ], 401);
        }

        // find claim by id
        $claimAgreement = ClaimAgreements::find($request->id);

        // delete a claim agreement
        $claimAgreement->delete();

        // return success message
        return response([
            'message' => 'Claim agreement deleted successfully'
        ], 200);
    }
}
