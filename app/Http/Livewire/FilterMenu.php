<?php

namespace App\Http\Livewire;

use GuzzleHttp\Exception\RequestException;
use Livewire\Component;
use Psr\Http\Message\ResponseInterface;

class FilterMenu extends Component
{

    public $data;
    public $filter_types = [];
    public $filter_price = 'High-Low';

    public function mount() {

    }

    public function render()
    {
//        // loop through data array filtering out items that don't match the filter types
//        $filtered_data = [];
//        foreach ($this->data as $item) {
//            if(in_array($item->type, $this->filter_types)) {
//                array_push($filtered_data, $item);
//            }
//        }
//
//        // sort the filtered data by price
//        if($this->filter_price == 'High-Low') {
//            usort($filtered_data, function($a, $b) {
//                return $a->price < $b->price;
//            });
//        } else {
//            usort($filtered_data, function($a, $b) {
//                return $a->price > $b->price;
//            });
//        }

        if(!isset($this->data)) {
            // make request to web3 server on localhost to get all marketplace listings using guzzle
            $client = new \GuzzleHttp\Client();
            $promise = $client->getAsync('http://localhost:3000/web3/marketplace/listings');

            $promise->then(
                function(ResponseInterface $response) {
                    $this->data = json_decode($response->getBody()->getContents())->data;
                },
                function(RequestException $exception) {
                    print_r($exception->getMessage());
                }
            );
        }

        return view('livewire.filter-menu');
    }

    public function addOrRemoveFromFilterByType($type)
    {
        print_r($this->filter_types);

        if(!in_array($type, $this->filter_types)) {
            array_push($this->filter_types, $type);
        }
    }

    public function updatePricingFilter($price)
    {
        $this->filter_price = $price;
    }
}
