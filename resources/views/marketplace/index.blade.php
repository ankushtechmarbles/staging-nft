@extends('layouts.app')
@section('title','Marketplace')
@section('body-class','marketplace')
@section('header-bg-class','bg-navbar')
@push('custom-css')
    <link rel="stylesheet" media="screen" href="{{asset('assets/css/dashboard-new.css')}}">
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
@endpush
@section('content')

    <div id="nfts-filters-wrapper">
       <livewire:filter-menu />
    </div>

@endsection
@push('js-plugin')@endpush
@push('custom-scripts')@endpush
