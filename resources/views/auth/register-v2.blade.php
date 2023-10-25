@extends('layouts.auth')
@section('title','Register')
@section('body-class','auth-page')
@section('header-bg-class','bg-navbar')
@push('custom-css')
    <link rel="stylesheet" media="screen" href="{{asset('assets/css/about.css')}}">
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
@endpush

@section('content')


    <div class="auth-container">
        <livewire:register-form></livewire:register-form>
    </div>

<!-- Explore end -->
<!-- bootstrap 5.3 -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<!-- masonary grid cdn -->
<script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script>
@endsection
@push('js-plugin')@endpush
@push('custom-scripts')

@endpush
