@extends('layouts.admin.master')
@section('title', 'Dashboard')
@section('content')
@php
    $user_accesses = json_decode(Auth::user()->user_accesses,true);
@endphp
<!-- Begin Page Content -->
<div class="container-fluid">
  <!-- Page Heading -->
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    <div>
      <select class="form-control" name="q" id="reportOption">
        @foreach($days as $day => $value)
          <option value="{{$day}}" {{ $day==$q ? 'selected' : null }}>{{$value}}</option>
        @endforeach
      </select>
      <small>{{ $start_date->format('M d, Y') }} - {{ $end_date->format('M d, Y') }}</small>
    </div>
  </div>
  <!-- ./ Page Heading -->
</div>   
<!-- /.container-fluid -->
@endsection
@push('scripts')
@endpush