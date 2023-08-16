@extends('layouts.app')
@section('title','Leaderboard')
@section('body-class','')
@section('header-bg-class','bg-navbar')
@push('custom-css') 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" media="screen" href="{{asset('assets/css/leaderboard.css')}}">
@endpush
@section('content') 
<div class="page-title text-center">
    <div class="container">
        <h2>Leaderboard</h2>
        <p><strong>Create an IDEA,</strong> list it with us, grow your community and win. <strong>Current winning IDEAs</strong></p>
    </div>
</div>
<div class="information_table">
    <div class="container">
        @livewire('leader-board')
    </div>
</div>
@endsection
@push('js-plugin')@endpush
@push('custom-scripts')@endpush