@extends('layouts.admin.master')
@section('title'){{ __('Course Levels') }}@endsection
@section('content')
@php
    $user_accesses = json_decode(Auth::user()->user_accesses,true);
@endphp
<div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-2 text-gray-800">{{ __('Course Levels') }}</h1>
        <form action="{!! url()->current() !!}" method="POST" role="search" class="form-inline ml-auto ml-md-3 my-2 my-md-0 mw-100 mr-1 mb-2">
            {{ csrf_field() }}
            <div class="input-group">
              <input type="text" name="q" class="form-control bg-light small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" value="{{$query}}">
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit" title="Search"><i class="fas fa-search fa-sm"></i></button>
                <a class="btn btn-danger" href="{!! route('admin.course-levels') !!}" title="Reset"><i class="fas fa-times fa-sm"></i></a>
              </div>
            </div>
        </form>        
            @if(Arr::has($user_accesses,'course_level.add'))
                <a href="{{ route('admin.course-level.add') }}" class="btn btn-sm-block btn-primary mb-2"><i class="fas fa-plus fa-sm"></i> Add Course Level</a>
            @endif
    </div>

    <!-- Content Row -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-lg-8 col-md-6 col-sm-6 mb-2">
                            <h5 class="m-0 font-weight-bold text-primary">{{ __('Course Levels') }}</h5>
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
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th width="100">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($result as $index => $row)
                                    <tr>
                                        <td>{!! $index + 1 !!}</td>
                                        <td>{{ $row->course_level_name }}</td>
                                        <td>{{ $row->course_level_is_active ? 'Show' : 'Hide'  }}</td>
                                      
                                        <td width="100">
                                            <div class="btn-group" role="group">
                                                @if(Arr::has($user_accesses,'course_level.edit')) 
                                                <a class="btn btn-warning rounded mr-2" href="{!! route('admin.course-level.edit',['course_level' => $row->id]) !!}" title="Edit">
                                                    <i class="fas fa-pencil-alt fa-sm"></i></a>
                                                @endif
                                                @if(Arr::has($user_accesses,'course_level.delete'))
                                                    <a class="btn btn-danger rounded mr-2" data-toggle="modal" href="#course_delete_{!! $row->id !!}" title="Delete">
                                                        <i class="fas fa-trash fa-sm"></i></a>
                                                @endif
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- Modal Delete -->
                                    <div class="modal fade" id="course_delete_{!! $row->id !!}" tabindex="-1" role="dialog"
                                         aria-labelledby="course_delete_{!! $row->id !!}" aria-hidden="true">
                                        <div class="modal-dialog modal-md" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="course_delete_{!! $row->id !!}">Delete Course Level?</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <h4><strong>{{ $row->course_level_name }}</strong></h4> 
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <a href="{!! route('admin.course-level.delete',['course_level' => $row->id]) !!}"
                                                       class="btn btn-danger">Yes, Delete it
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    @empty
                                    <tr><td colspan="5">No Course Level Found</td></tr>
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
</div>
@endsection