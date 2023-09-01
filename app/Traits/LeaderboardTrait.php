<?php

namespace App\Traits;

use App\Models\Competition;
use App\Models\Project;
use App\Models\ProjectTrack;
use App\Models\ProjectType;

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

    public function getTopTen() {
        return Project::with('projectTypes')->with('projectTracks')->orderBy('total_score', 'desc')->limit(10)->get();
    }

    public function getTopTenByTrack($track) {
        $projects = Project::select([
            'projects.id',
            'cover_image',
            'title',
            'owners',
            'items',
            'project_track_name',
            'project_type_name',
            'discord',
            'twitter',
            'slug',
            'supported_blockchains.ethereum',
            'supported_blockchains.polygon',
            'supported_blockchains.avalanche',
            'supported_blockchains.fantom',
            'supported_blockchains.arbitrum',
            'supported_blockchains.optimism',
        ])->Join('supported_blockchains','supported_blockchains.id', '=', 'projects.supported_blockchains_id')
            ->leftJoin('project_tracks','project_tracks.id', '=', 'projects.track')
            ->leftJoin('project_types','project_types.id', '=', 'projects.types')
            ->where('project_tracks.id', $track);

        return  $projects;
    }

}
