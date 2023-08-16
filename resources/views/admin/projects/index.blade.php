@extends('layouts.admin.master')
@section('title', 'Projects')
@push('css-plugins')
<style type="text/css">
	.pagination{float:right !important;}
	
	.highlight {
	    padding: 1rem;
	    margin: 0;
	    background-color: #f7f7f9;
	    -ms-overflow-style: -ms-autohiding-scrollbar;
	}

	.highlight pre {
	    padding: 0;
	    margin-top: 0;
	    margin-bottom: 0;
	    background-color: 
	    transparent;
	    border: 0;
	}
	pre {
	    display: block;
	    font-size: 87.5%;
	    color: #212529;
	}
	.cela .card-body{
	    border-top-left-radius: 0.35rem;
	    border-top-right-radius: 0.35rem;
	}
	.cela.card{
		background-color: #e3e3e3; 
		background-color: #fff;
		border: 0 solid #d9dee3;
		background-clip: padding-box;
		box-shadow: 0 2px 6px 0 rgba(67,89,113,.12);
	}
	.card-header-image {
	  background-color: #e3e3e3; 
	  height: 160px;
	  background-position: center; 
	  background-repeat: no-repeat; 
	  background-size: contain; 
	  border-bottom: 0;
	}
</style>
@endpush
@php
    $user_accesses = json_decode(Auth::user()->user_accesses,true);
@endphp
@section('content')
<div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-2 text-gray-800">{{ __('Projects') }}</h1>
        <form action="{!! url()->current() !!}" method="POST" role="search" class="form-inline ml-auto ml-md-3 my-2 my-md-0 mw-100 mr-1 mb-2">
        	{{ csrf_field() }}
            <div class="input-group">
              <input type="text" name="q" class="form-control bg-light small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" value="{{$q ?? null}}">
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit" title="Search"><i class="fas fa-search fa-sm"></i></button>
                <a class="btn btn-danger" href="{!! route('admin.courses') !!}" title="Reset"><i class="fas fa-times fa-sm"></i></a>
              </div>
            </div>
        </form>
        <div class="btn-groups">
        	<div class="dropdown">
			  	<a href="{{ route('admin.project.add') }}" class="btn btn-sm-block btn-primary mb-2 mr-2"><i class="fas fa-plus fa-sm"></i> Add New Project</a>		  
			</div>	        
        </div>
    </div>
    <!-- Content Row -->
    <div class="row">
        @forelse($result->chunk(3) as $chunk)
	        @foreach($chunk as $row)
	        <div class="col-sm-12 col-md-3 mb-4">
	            <div class="card shadow h-100 cela">
	            	<div class="card-header card-header-image" style='background-image: url("{{ $row->CoverImagePath() }}");'></div>
	                <div class="card-body p-2 bg-white rounded ">
	                    <h5 class="h5 mb-2 font-weight-bold text-gray-800">{{ $row->title }}</h5>
	                    <!-- <div class="row">
	                    	<div class="col-sm-12 col-md-12">
	                    		<h6 class="font-weight-normal text-gray-800"> <small>Chains: </small>{{ $row->supported_blockchains_id ?? '' }} </h6>
	                    	</div>
	                	</div> -->
	                    <div class="row">
	                    	<div class="col-sm-12 mb-2 btn-group-productmodels"> 

		                        <a class="btn btn-sm btn-warning" href="{!! route('admin.project.edit',['project' => $row->id]) !!}" title="Edit"><i class="fas fa-pencil-alt fa-sm"></i></a>

	                            <a class="btn btn-sm btn-danger " data-toggle="modal" href="#project_model_delete_{!! $row->id !!}" title="Delete"><i class="fas fa-trash fa-sm"></i></a>

							</div> 
	                	</div>
	            	</div>
	        	</div>
	        </div>
	        <!-- Start Model delete -->
	        <div class="modal fade" id="project_model_delete_{!! $row->id !!}" tabindex="-1" role="dialog" aria-hidden="true">
	            <div class="modal-dialog modal-md" role="document">
	                <div class="modal-content">
	                    <div class="modal-header">
	                        <h5 class="modal-title">Delete Project?</h5>
	                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                            <span aria-hidden="true">&times;</span>
	                        </button>
	                    </div>
	                    <div class="modal-body">
	                        <div class="row">
	                            <div class="col-md-12">
	                                <p class="font-weight-bold">{{ $row->title }}</p>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="modal-footer">
	                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
	                        <a href="{!! route('admin.project.delete',['project' => $row->id ]) !!}" class="btn btn-danger">Yes, Delete it</a>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <!-- Start  Model Delete -->       
	        @endforeach
        @empty
        <div class="col-sm-12 col-md-12 mb-5">
            <div class="card border-left-danger w-100 py-1">
                <div class="card-body">
                    <h4 class="card-title mb-0">No Project Found</h4>
                </div>
            </div>
        </div>
        @endforelse
        <div class="col-sm-12 col-md-12 mb-5 text-right">
        	{{ $result->links() }}
        </div>
    </div>
</div> 
@endsection
@push('scripts')
@endpush