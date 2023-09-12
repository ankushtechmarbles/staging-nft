<div class="border" style="border-radius: 32px; box-shadow: 2px 2px 0 0 #000;">

    <div class="collapse investForm" id="collapseExample">
        <div class="px-4 py-5">
            <h1 style="font-family: Inter, 'serif'; font-size: 1.5em; text-align: center">Would you invest in this idea?</h1>
            <form class="d-grid gap-3" onsubmit="">
                <div class="row gap-3 justify-content-center">
                    <button id="yesBtn" type="button" class="d-flex justify-content-around align-items-center border-btn col-5" wire:model="investPositive" style="font-size: 1.25em">
                        <x-svg.checkmark-circle-icon />
                        Yes
                    </button>
                    <button id="noBtn" type="button" class="d-flex justify-content-around align-items-center border-btn col-5" wire:model="investPositive" style="font-size: 1.25em">
                        <x-svg.close-icon />
                        No
                    </button>
                </div>
                <div class="row gap-4 justify-content-center">
                    <p class="d-flex px-5 col-12" style="margin: 0; padding: 0;">Provide additional feedback</p>
                    <button type="button" class="d-flex justify-content-around align-items-center border-btn col-10" wire:model="wouldUse">
                        <x-svg.checkmark-icon />
                        I would use this
                    </button>
                    <button type="button" class="d-flex justify-content-around align-items-center border-btn col-10" wire:model="wouldPay">
                        <x-svg.money-circle />
                        I would pay to use this
                    </button>
                    <button type="button" class="d-flex justify-content-around align-items-center border-btn col-10" wire:model="wouldBuild">
                        <x-svg.wrench-icon />
                        I can help build this
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div class="d-flex w-full justify-content-between py-1 px-3" >
        <span>❤️🎖️🔥💰 {{$score}}</span>
        <span class="badge bg-primary px-3 py-2 uppercase" style="border-radius: 16px">Rank: {{$rank}}</span>
    </div>
    <div class="collapse" id="collapseExample">
        <div class="px-4 py-3">
            <hr />
            <div class="mb-3 mt-5">
                <label for="customRange1" id='feasibility' class="form-label">5 - Feasibility
                    ❤️</label>
                <input type="range" class="form-range" wire:model="feasibility" min="0" max="10"
                       value='5' step="1" id="customRange1">
            </div>
            <div class="mb-3">
                <label for="customRange2" id='architecture' class="form-label">5 - Architecture 🏅</label>
                <input type="range" class="form-range" wire:model="architecture" min="0" max="10"
                       value='5' step="1" id="customRange2">
            </div>
            <div class="mb-3">
                <label for="customRange3" id='innovative' class="form-label">5 - Innovative 🔥</label>
                <input type="range" class="form-range" wire:model="innovative" min="0" max="10"
                       value='5' step="1" id="customRange3">
            </div>
            <button type="button" wire:click="vote_community({{ $project->id }})" id='submit-btn'
                    class="btn btn-primary btn-vote" style="border-color: black; margin-right: 1rem">
                <span wire:loading>Casting Vote...</span>
                <span wire:loading.remove>Vote</span>
            </button>
            <button type="button" wire:click="vote({{ $project->id }})" id='submit-btn'
                    class="btn btn-primary btn-vote" style="background: #029E57; color: white; border-color: black;">
                <span wire:loading>Submitting...</span>
                <span wire:loading.remove>Submit</span>
            </button>
            <hr style="margin-top: 1rem; margin-bottom: 1rem"></hr>
            @guest
                <a class="dropdown-item" href="/auth/login">You must be logged in to vote? <span style="color: #2745E2">Login</span></a>
            @endguest
        </div>
    </div>
</div>
