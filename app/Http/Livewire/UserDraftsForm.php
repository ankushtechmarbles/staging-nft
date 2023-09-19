<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;
use Livewire\WithFileUploads;

class UserDraftsForm extends Component
{
    use WithFileUploads;

    public $project_id;
    public $project;
    public $project_name;
    public $project_description;
    public $project_image;
    public $project_problem;
    public $project_solution;
    public $project_utilities;
    public $project_members;
    public $project_track;
    public $project_chain;
    public $project_supply;
    public $chains;

    public $add_member;

    protected $listeners = ['submit' => 'submit', 'upload' => 'uploadAvatar'];

    public $photo;

    public function render()
    {
//        get project
        $project = Project::find($this->project_id)::with('blockchains')->first();

        if ($project) {
            $members = json_decode($project->members)->members;

            $members_array = [];
            foreach ($members as $member) {
                $members_array[] = $member;
            }

            $this->project = $project;
            $this->project_name = $project->title;
            $this->project_description = $project->description;
            $this->project_image = $project->image;
            $this->project_problem = $project->problem;
            $this->project_solution = $project->solution;
            $this->project_utilities = $project->utilities;
            $this->project_members = $members_array;
            $this->project_track = $project->project_track_id;
            $this->project_chain = $project->supported_blockchains_id;
            $this->project_supply = $project->supply;

            return view('livewire.user-drafts-form', [
                "project" => $project,
                "project_name" => $project->name,
                "project_description" => $project->description,
                "project_image" => $project->image,
                "project_problem" => $project->problem,
                "project_solution" => $project->solution,
                "project_utilities" => $project->utilities,
                "project_members" => $members_array,
                "project_track" => $project->track,
                "project_chain" => $project->chain,
                "project_supply" => $project->supply,
            ]);
        }


    }

    public function submit($membersJSON)
    {

//        update draft
        $project = Project::find($this->project_id);

        $project->title = $this->project_name;
        $project->description = $this->project_description;
//        $project->image = $this->project_image;
        $project->problem = $this->project_problem;
        $project->solution = $this->project_solution;
        $project->utilities = $this->project_utilities;
        $project->members = $membersJSON;
        $project->project_track_id = $this->project_track;
        $project->supported_blockchains_id = $this->project_chain;
        $project->supply = $this->project_supply;

        $project->save();

        $this->is_editting = false;

        $this->emit('projectUpdated');
    }

    public function cancel()
    {
        $this->is_editting = false;
    }

    public function addMember()
    {
        // push new member to project members
        $this->project_members[] = ['name'=> '','role'=> '', 'image_url' => '' ];

        // update project members
        $this->project->members = json_encode(['members' => $this->project_members]);
        $this->project->save();
    }

    public function removeMember($index)
    {
        // remove member from project members
        unset($this->project_members[$index]);

        // update project members
        $this->project->members = json_encode(['members' => $this->project_members]);
        $this->project->save();
    }

    public function uploadAvatar($index, $file)
    {
        $this->project_members[$index]['image_url'] = $file;

        // update project members
        $this->project->members = json_encode(['members' => $this->project_members]);
        $this->project->save();
    }
}
