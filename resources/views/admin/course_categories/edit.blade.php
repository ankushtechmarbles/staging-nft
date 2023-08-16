@extends('layouts.admin.master')
@section('title', 'Edit Course Category')
@section('content')
<div class="container-fluid">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-lg-8 col-md-6 col-sm-6 mb-2">
                            <h5 class="m-0 font-weight-bold text-primary">{{ __('Edit Course Category') }}</h5>
                        </div>
                    </div>
                </div>
                <form action="{!! url()->current() !!}" method="POST" enctype="multipart/form-data" autocomplete="off">
                    @csrf
                    <!-- Body -->
                    <div class="card-body">
                        <div class="form-group row">
                            <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="name"><span class="text-danger">*</span>{{ __('Name') }}:</label>
                            <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <input type="text" class="form-control slug_from" name="course_category_name" id="name"  placeholder="{{ __('Enter name') }}" value="{{ old('course_category_name', $course_category->course_category_name) }}" required autofocus> 
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="slug"><span class="text-danger">*</span>{{ __('Slug') }}:</label>
                             <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <input type="text" class="form-control slug_to" name="course_category_slug" id="slug"  placeholder="{{ __('Enter slug') }}" value="{{ old('course_category_slug', $course_category->course_category_slug) }}" required> 
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="slug"><span class="text-danger">*</span>{{ __('Status') }}:</label>
                            <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
                                <select class="form-control m-input course_category_is_active custom-select select2" name="course_category_is_active" id="course_category_is_active" required>
                                    <option value="1" {{ old('course_category_is_active', $course_category->course_category_is_active)== '1' ? 'selected' : null }} selected>Show</option>
                                    <option value="0" {{ old('course_category_is_active', $course_category->course_category_is_active)== '0' ? 'selected' : null }}>Hide</option>
                                </select> 
                            </div>
                        </div>             
                    </div>
                    <!--End Body -->                    
                    <div class="card-footer">
                        <div class="form-group row">
                            <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label"></label>
                            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>
                                <a href="{!! route('admin.course-categories') !!}" class="btn btn-danger">{{ __('Cancel') }}</a>
                            </div>
                        </div>
                    </div>  
                </form>    
            </div>
        </div>
    </div>
</div>
@endsection