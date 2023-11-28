<?php

namespace App\Http\Livewire;

use Livewire\Component;

class LeanCanvas extends Component
{

    public $problem = "Getting quality feedback on my music Artist: I can not sustain a lifestyle
off of streaming payouts. There needs to be a system that provides real monetary value around the engagement of my music Artist: the life of a promoted album on streaming is between 1 day to 1 week. I am not visible with the volume of music being released on streaming. Quality is not a factor vs the volume and saturation of music and placement on DSPs Platform/Fan: Saturation is a huge problem for Discovering new music that matches by taste level Platform/Fan: there is no way to engage or have communication with the Artist. I am not rewarded for being a fan. Merch and passive listening are the only ways to support the artist";
    public $alternatives = "Even";
    public $solution = "   Gamified music discovery infused with AI
            Hub platform that provides true
            Choose Your Adventure options for
            Music Fans with in-game currency;
            gaming, music, tickets, content";
    public $metrics = "% of people who purchase coins to
                engage in gamified ecosystem";
    public $proposition = "Step inside the world of your
                favorite artist to help them survive
                the game, discover and create new
                music";
    public $concept = "Smart Soundcloud meets RPG";
    public $advantage = "Social equity of artist, Thurz with
                relationships with Snoop & Dr.
                Dre, Coachella and more
                Partnership with IDEA and Helix;
                high level storyline to tie different
                worlds together as a gaming Hub";
    public $channels = "IRL Events Youtube DSPs Social Media";
    public $customerSegments = "Music Fans Gamers Concert Goers Fashion Forward Consumers";
    public $costStructure = "Web3 Enthusiasts Super Fans GTA Fans Fortnite Fans";
    public $revenueStreams = "Coin / In-game Currency; comparable to V-Bux and Robux Brand Partnerships: Adidas, Nike, Genesis. Event Ticket Sales";



    public function render()
    {
        return view('livewire.lean-canvas');
    }
}
