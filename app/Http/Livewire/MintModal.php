<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;

class MintModal extends Component
{
    public $projectId;
    public $userWalletAddress;

    public function render()
    {
        return view('livewire.mint-modal');
    }

    public function mint()
    {
        $project = Project::where('id', $this->projectId)->first();

        $supply = $project->supply;

        // make post request to localhost:3000 with guzzle
        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', 'http://localhost:3000/web3/mint/idea', [
            'form_params' => [
                'name' => $project->title,
                'description' => $project->description,
                'image' => $project->image_url,
                'animation_url' => $project->animation_url ? $project->animation_url : null,
                'attributes' => [
                    'problem' => $project->problem,
                    'solution' => $project->solution,
                    'utilites' => $project->utilities,
                ]
            ]
        ]);

        $response = json_decode($response->getBody()->getContents());

        $id = $response->id;

        // update project nft id
        $project->nft_id = $id;
        $project->is_minted = true;
        $project->save();

        if ($response) {
            $this->emit('minted', $response, $supply,);
        } else {
            $this->emit('mint_failed');
        }
    }
}
