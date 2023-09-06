@extends('layouts.app')
@section('title','Marketplace')
@section('body-class','nft-details')
@section('header-bg-class','bg-navbar')
@push('custom-css')
@endpush
@section('content')
    <main class="container py-5">
        <div class="row gap-5">
            <section class="col-5 mb-5 d-flex flex-column gap-3">
                    <x-cards.nft-card
                      :title="$project->title"
                      :description="$project->description"
                      :owners="$project->owners"
                      :eth="'1.4'"
                      :id="$project->id"
                      :img="'image/pro_'"
                      :slug="$project->slug"
                    />
                {{--    Button Container      --}}
                <div class="d-flex justify-content-between gap-3">
                    <button class="nft-details-btn gold">Buy now</button>
                    <button type="button" class="nft-details-btn vote" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <x-svg.chevron-up-icon />
                        Vote
                    </button>
                </div>

                {{--     Ranking      --}}
                <div class="border" style="border-radius: 32px; box-shadow: 2px 2px 0 0 #000;">
                    <div class="collapse investForm" id="collapseExample">
                        <div class="px-4 py-5">
                            <h1 style="font-family: Inter, 'serif'; font-size: 1.5em; text-align: center">Would you invest in this idea?</h1>
                            <form class="d-grid gap-3" onsubmit="">
                                <div class="row gap-3 justify-content-center">
                                    <button type="button" class="d-flex justify-content-around align-items-center border-btn col-5" style="font-size: 1.25em">
                                        <x-svg.checkmark-circle-icon />
                                        Yes
                                    </button>
                                    <button type="button" class="d-flex justify-content-around align-items-center border-btn col-5" style="font-size: 1.25em">
                                        <x-svg.close-icon />
                                        No
                                    </button>
                                </div>
                                <div class="row gap-4 justify-content-center">
                                    <p class="d-flex px-5 col-12" style="margin: 0; padding: 0;">Provide additional feedback</p>
                                    <button type="button" class="d-flex justify-content-around align-items-center border-btn col-10">
                                        <x-svg.checkmark-icon />
                                        I would use this
                                    </button>
                                    <button type="button" class="d-flex justify-content-around align-items-center border-btn col-10">
                                        <x-svg.money-circle />
                                        I would pay to use this
                                    </button>
                                    <button type="button" class="d-flex justify-content-around align-items-center border-btn col-10">
                                        <x-svg.wrench-icon />
                                        I can help build this
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="d-flex w-full justify-content-between py-1 px-3" >
                        <span>❤️🎖️🔥💰 5.9</span>
                        <span class="badge bg-primary px-3 py-2 uppercase" style="border-radius: 16px">Rank: 4382</span>
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
                            <button type="button" wire:click="vote({{ $project->id }})" id='submit-btn'
                                    class="btn btn-primary btn-vote" style="border-color: black; margin-right: 1rem">Vote</button>
                            <button type="button" wire:click="vote({{ $project->id }})" id='submit-btn'
                                    class="btn btn-primary btn-vote" style="background: #029E57; color: white; border-color: black;">Submit</button>
                            <hr style="margin-top: 1rem; margin-bottom: 1rem"></hr>
                            @guest
                                <a class="dropdown-item" href="/auth/login">You must be logged in to vote? <span style="color: #2745E2">Login</span></a>
                            @endguest

                        </div>
                    </div>
                </div>
            </section>
            {{--    Project Details    --}}
            <section class="col-6 nft-info-section">
                <x-marketplace.userHeader
                    :username="$owner->name"
                    :supply="$project->supply"
                    :supply="$project->supply"
                    :blockchains="$blockchains"
                    :title="$project->title"
                    :type="$project_type"
                />

                <div class="mt-3 mb-5">
                    <p>{{$project->description}}</p>
                </div>

                <div class="mt-3 mb-5">
                    <h1 style="font-family: inter; font-weight: 500">Problems</h1>
                    <p>{{$project->problem}}</p>
                </div>

                <div class="mt-3 mb-5">
                    <h1 style="font-family: inter; font-weight: 500">Solutions</h1>
                    <p>{{$project->solution}}</p>
                </div>

                <div class="mt-3 mb-5">
                    <h1 style="font-family: inter; font-weight: 500">Utility</h1>
                    <p>{{$project->utilities}}</p>
                </div>

                <x-marketplace.iconCardGroup :data="$project_votes" />

                <div style="margin-top: 5rem" class="mb-5">
                    <h1 style="font-family: inter; font-weight: 500">Members</h1>
                    <x-cards.member-card :members="$members" />
                </div>
            </section>
        </div>
    </main>

    <section class="container ">
        <livewire:similar-projects :project="$project"  />
    </section>
@endsection
@push('js-plugin')@endpush
@push('custom-scripts')
    <script>
        function updateNumber(e) {
            const value = e.target.value;
            const prev = e.target.previousElementSibling;
            const prevText = prev.textContent;

            if (value === 10) {
                prev.textContent = `${value} - ${prevText.substring(5)}`
            } else {
                prev.textContent = `${value} - ${prevText.substring(4)}`
            }
        }

        document.getElementById('customRange1').addEventListener('input', updateNumber)
        document.getElementById('customRange2').addEventListener('input', updateNumber)
        document.getElementById('customRange3').addEventListener('input', updateNumber)

        let trigger = document.getElementById('dropdownMenuButton1')
        document.getElementById('submit-btn').addEventListener("click", () => {
            bootstrap.Dropdown.getOrCreateInstance(trigger).toggle()
        });

        document.querySelector('.vote').addEventListener('click', function(e) {
            document.querySelector('#chevronUp').classList.toggle('rotate');
        });

        // Vote button listeners
        document.querySelectorAll('.border-btn').forEach((ele) => {
            ele.addEventListener('click', (e) => {

                // check for button type
                if(e.target.classList.contains('border-btn')) {
                    if(e.target.classList.contains('active')) {
                        e.target.classList.remove('active')
                        e.target.style.background = 'white';
                        e.target.style.color = 'black';
                        return;
                    } else {
                        e.target.classList.add('active')
                        e.target.style.background = '#029E57';
                        e.target.style.color = 'white';
                    }
                }
            });
        })
    </script>
@endpush
