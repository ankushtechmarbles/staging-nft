<?php

namespace App\Traits;

use App\Models\Competition;

trait LeaderboardTrait {

    public function getActiveLeaderboard() {
        // get currently active compeition and its entries
        $activeCompetition = Competition::where('is_active', true)->first();

        if(!$activeCompetition) {
            return "There is no active competition";
        }

        // get all entries for active competition
        $entries = $activeCompetition->entries()->get();

        return [$entries, $activeCompetition];
    }

    public function getLeaderboardById($id)
    {
        // get competition by id
        $competition = Competition::find($id);

        if(!$competition) {
            return "Competition not found";
        }

        // get all entries for competition
        $entries = $competition->entries()->get();

        return [$entries, $competition];
    }

}
