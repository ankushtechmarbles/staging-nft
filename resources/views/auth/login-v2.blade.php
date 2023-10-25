@extends('layouts.auth')
@section('title','Login')
@section('body-class','auth-page')
@section('header-bg-class','bg-navbar')
@push('custom-css')
    <link rel="stylesheet" media="screen" href="{{asset('assets/css/about.css')}}">
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
@endpush

@section('content')


    <div class="auth-container">
        <form>
            <h1>Log in to Idea Labs</h1>
            <h6>Connect with Social or Web3</h6>

            <div class="auth-btn-group">
                <div class="form-group">
                    <button href="{{ url('/login/google') }}" class="auth-btn btn-google"><x-svg.twitter-icon /> <span>Twitter</span></button>
                </div>

                <div class="form-group">
                    <button onclick="myFunc()" type="button" class="auth-btn btn-google"><x-svg.google-icon /> <span>Google</span></button>
                </div>

                <div class="form-group">
                    <button href="{{ url('/login/google') }}" class="auth-btn btn-google"><x-svg.metamask-icon /> <span>Metamask</span></button>
                </div>

                <div class="form-group">
                    <button href="{{ url('/login/google') }}" class="auth-btn btn-google"><x-svg.email-icon /> <span>Email</span></button>
                </div>
            </div>

            <button class="btn-more">More Options <x-svg.chevron-down-icon /> </button>
        </form>
    </div>

<!-- Explore end -->
<!-- bootstrap 5.3 -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<!-- masonary grid cdn -->
<script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script>



@endsection
@push('js-plugin')@endpush
@push('custom-scripts')
    <script>
        function myFunc(e) {
            window.location = 'http://localhost:8000/login/google';
        }
    </script>
@endpush
