@extends('layouts.admin.master')
@section('title'){{ __('Quiz for') }} {{ $course->course_title }}@endsection
@push('css-plugins')
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link href="{{ URL::asset('admin/assets/vendor/bootstrap4-toggle/css/bootstrap4-toggle.min.css') }}" rel="stylesheet">
@endpush
@section('content')
@php
    $user_accesses = json_decode(Auth::user()->user_accesses,true);
@endphp
<div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-2 text-gray-800">{{ __('Quiz for') }} {{ $course->course_title }}</h1>
        <div>
            <a data-toggle="modal" href="#model_add" class="btn btn-sm-block btn-primary mb-2"><i class="fas fa-plus fa-sm"></i> {{ __('Add New Quiz') }}</a>
            <a href="{{url('admin/courses')}}" class="btn btn-sm-block btn-danger mb-2"><i class="fas fa-arrow-left fa-sm"></i> {{ __('Back') }}</a>
        </div>
    </div>
    <!-- Content Row -->
    <!-- Content Row -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-lg-8 col-md-6 col-sm-6 mb-2">
                            <h5 class="m-0 font-weight-bold text-primary">{{ __('Quizzes') }}</h5>
                        </div>
                    </div>
                </div>
                <!-- Body -->
                <div class="card-body">
                    <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class=" text-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Question</th>
                                        <th width="100">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($result as $index => $row)
                                    <tr>
                                        <td>{!! $index + 1 !!}</td>
                                        <td>{{ $row->question }}</td>                                      
                                        <td width="100">
                                            <div class="btn-group" role="group">
                                                @if(Arr::has($user_accesses,'quiz.edit'))
                                                <a class="btn btn-warning rounded mr-2" data-toggle="modal" href="#model_edit_{!! $row->id !!}" title="Edit">
                                                        <i class="fas fa-pencil-alt fa-sm"></i></a>
                                                @endif
                                                @if(Arr::has($user_accesses,'quiz.delete'))
                                                    <a class="btn btn-danger rounded mr-2" data-toggle="modal" href="#quiz_delete_{!! $row->id !!}" title="Delete">
                                                        <i class="fas fa-trash fa-sm"></i></a>
                                                @endif
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Modal Delete -->
                                    <div class="modal fade" id="quiz_delete_{!! $row->id !!}" tabindex="-1" role="dialog"
                                         aria-labelledby="quiz_delete_{!! $row->id !!}" aria-hidden="true">
                                        <div class="modal-dialog modal-md" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="quiz_delete_{!! $row->id !!}">Delete Quiz?</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <h4><strong>{{ $row->question }}</strong></h4> 
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <a href="{!! route('admin.quiz.delete',['quiz' => $row->id]) !!}"
                                                       class="btn btn-danger">Yes, Delete it
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Edit Quiz -->
                                    @include('admin.quiz.edit', ['quiz' => $row]) 
                                    <!-- End Edit Quiz --> 
                                    @empty
                                    <tr><td colspan="5">No Quiz Found</td></tr>
                                    @endforelse
                                </tbody>
                            </table>
                            {{ $result->links() }}
                        </div>
                    </div>
                </div>
                </div>  
            </div>
        </div>
    </div>
    <!-- end Content Row -->
    <!-- Add Quiz-->
    @include('admin.quiz.add') 
    <!-- End Add Quiz --> 
</div> 
@endsection
@push('scripts') 
@endpush