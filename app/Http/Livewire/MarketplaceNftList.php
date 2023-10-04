<?php

namespace App\Http\Livewire;

use Livewire\Component;

class MarketplaceNftList extends Component
{

    public $marketplace_items;

    public function render()
    {
        if(!isset($this->marketplace_items)) {
            // make request to web3 server on localhost to get all marketplace listings using guzzle
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', 'http://localhost:3000/web3/marketplace/listings');
            $this->marketplace_items = json_decode($response->getBody()->getContents())->data;
        }

        return view('livewire.marketplace-nft-list', [
            'marketplace_items' => $this->marketplace_items
        ]);
    }

    public function mount()
    {

    }
}
