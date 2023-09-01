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
                    <button class="nft-details-btn vote">
                        <x-svg.chevron-up-icon />
                        Vote
                    </button>
                </div>

                {{--     Ranking      --}}
                <div class="d-flex w-full justify-content-between border py-1 px-3" style="border-radius: 32px; box-shadow: 2px 2px 0 0 #000;">
                    <span>❤️🎖️🔥💰 5.9</span>
                    <span class="badge bg-primary px-3 py-2 uppercase" style="border-radius: 16px">Rank: 4382</span>
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
                </div>
            </section>
        </div>
    </main>

    <section class="container ">
        <livewire:similar-projects :project="$project"  />
    </section>
@endsection
@push('js-plugin')@endpush
@push('custom-scripts')@endpush
