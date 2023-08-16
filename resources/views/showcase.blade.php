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
    <x-layout :title="'showcase'">

        <div class="banner_section">
            <div class="container">
                <div class="banner_about">
                    <div class="left_containt">
                        <img src="image/banner_img01.png">
                    </div>
                    <div class="middle_containt">
                        <div class="page_title">
                            <h2>Awesome <span>Projects</span></h2>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc <br> vulputate libero et velit
                            interdum, ac aliquet odio mattis.</p>
                        <a href="#" class="btn button-darkblue">Explore Projects</a>
                    </div>
                    <div class="right_containt">
                        <img src="image/banner_img02.png">
                    </div>
                </div>
            </div>
        </div>

        <div class="catagery_section">
            <div class="container">

                <div class="filter_Sec">
                    <div class="filter_text">
                        <a href="#">Year</a>
                        <a href="#">Category</a>
                    </div>
                    <div class="right_icon">
                        <a href="#"><img src="image/view_list.png"></a>
                        <a href="#"><img src="image/view_stacked.png"></a>
                    </div>
                </div>

                <livewire:show-projects />
            </div>
        </div>
    </x-layout>

@endsection
@push('js-plugin')
@endpush
@push('custom-scripts')
    <script>
        function vote() {
            console.log('here')
        }
    </script>
@endpush
