@extends('layouts.app')
@section('title', 'Leaderboard')
@section('body-class', '')
@section('header-bg-class', 'bg-navbar')
@push('custom-css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" media="screen" href="{{ asset('assets/css/leaderboard.css') }}">
    <link rel="stylesheet" media="screen" href="{{ asset('css/style.css') }}">
@endpush
@section('content')
    <x-layout :title="'project'">
        <x-project.hero :project="$project" :projectScore="$projectScore" />
        <x-project.about :project="$project" />

        {{-- <nav class="nav-bar p-2 d-flex justify-content-center align-items-center" id="myTab" role="tablist">
            <button class="active project-tab-btn" id="nfts-tab" data-bs-toggle="tab" data-bs-target="#nfts-tab-pane"
                type="button" role="tab" aria-controls="nfts-tab-pane" aria-selected="true">NFTs</button>
            <button class="project-tab-btn" id="profile-tab" data-bs-toggle="tab" data-bs-target="#about-tab-pane"
                type="button" role="tab" aria-controls="about-tab-pane" aria-selected="false">About</button>
            <button class="project-tab-btn" id="contact-tab" data-bs-toggle="tab" data-bs-target="#tokenomics-tab-pane"
                type="button" role="tab" aria-controls="tokenomics-tab-pane" aria-selected="false">Tokenomics</button>
            <button class="project-tab-btn" id="contact-tab" data-bs-toggle="tab" data-bs-target="#utility-tab-pane"
                type="button" role="tab" aria-controls="utility-tab-pane" aria-selected="false">Utility</button>
            <button class="project-tab-btn" id="contact-tab" data-bs-toggle="tab" data-bs-target="#rarity-tab-pane"
                type="button" role="tab" aria-controls="rarity-tab-pane" aria-selected="false">Rarity</button>
        </nav>
        <div class="tab-content h-100" id="myTabContent"> --}}
        {{-- <div class="tab-pane fade show active" id="nfts-tab-pane" role="tabpanel" aria-labelledby="nfts-tab"
                tabindex="0">
                <x-project.nfts :project="$project" />
            </div> --}}
        {{-- <div class="tab-pane fade" id="about-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            </div> --}}
        {{-- <div class="tab-pane fade" id="tokenomics-tab-pane" role="tabpanel" aria-labelledby="contact-tab"
                tabindex="0">
                <x-project.tokenomics />
            </div>
            <div class="tab-pane fade" id="utility-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                <x-project.utility />
            </div>
            <div class="tab-pane fade" id="rarity-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                <x-project.rarity />
            </div> --}}
        {{-- </div> --}}
    </x-layout>
@endsection
@push('js-plugin')
@endpush
@push('custom-scripts')
    {{-- <script>
        function vote() {
            console.log('here')
        }
    </script> --}}
    {{-- Bootsrap scripts --}}
    {{-- <script src="/js/bootstrap.min.js"></script> --}}
    {{-- <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script> --}}
@endpush
