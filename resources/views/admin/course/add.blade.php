@extends('layouts.admin.master')
@section('title', 'Add New Course')
@push('css-plugins')
    <link href="{{ URL::asset('admin/assets/vendor/bootstrap4-toggle/css/bootstrap4-toggle.min.css') }}" rel="stylesheet">
@endpush
@section('content')
<style type="text/css">
    .progress{ height: 25px; }
</style>
<div class="container-fluid">
    <!-- Page Heading -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-lg-8 col-md-6 col-sm-6 mb-2">
                            <h5 class="m-0 font-weight-bold text-primary">{{ __('Add New Course') }}</h5>
                        </div>
                    </div>
                </div>
                <form action="{!! url()->current() !!}" method="POST" enctype="multipart/form-data" autocomplete="off" class="frm_add">
                @csrf
                <!-- Body -->
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Course Title') }}:</label>
                            <input type="text" class="form-control slug_from" name="course_title" id="course_title"  placeholder="{{ __('Enter Course Title') }}" value="{{ old('course_title') }}" required autofocus> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Course Slug') }}:</label>
                            <input type="text" class="form-control slug_to" name="course_slug" id="course_slug"  placeholder="{{ __('Enter Course Slug') }}" value="{{ old('course_slug') }}" required> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="course_cover_image"><span class="text-danger"></span>{{ __('Course Cover Image') }}:</label>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="course_cover_image" name="course_cover_image" accept="image/*" >
                                <label class="custom-file-label" for="course_cover_image">{{ __('Choose Course Cover Image') }}</label>
                            </div>
                            <small id="poster_help" class="form-text text-muted">{{ __('Select .jpg,.jpeg,.png file formats') }}</small>
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="course_category_id"><span class="text-danger">*</span>{{ __('Course Category') }}:</label>
                            <select id="course_category_id" name="course_category_id" class="form-control m-input course_category_id custom-select select2" required>
                                @foreach($course_categories as $key => $value)
                                <option value="{{$key}}" {{ old('course_category_id') == $key ? 'selected' : null }} >{{$value}}</option>
                                @endforeach
                            </select>
                        </div> 

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Level') }}:</label> 
                            <select id="course_level_id" name="course_level_id" class="form-control m-input course_level_id custom-select select2" required>
                                 @foreach($course_levels as $key => $value)
                                  <option value="{{$key}}" {{ old('course_level_id') == $key ? 'selected' : null }} >{{ $value }}</option>
                                @endforeach
                            </select>
                        </div>  

                    </div>
                     <div class="row">
                        <div class="form-group col-lg-12 col-md-12 col-sm-12">
                            <div class="progress mb-1">
                                <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%; color:#000;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                            </div>
                        </div>
                    </div> 
                </div>
                <!--End Body -->                    
                <div class="card-footer">
                    <div class="form-group row">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <button type="submit" class="btn btn-primary btn-submit">{{ __('Save') }}</button>
                            <a href="{!! route('admin.courses') !!}" class="btn btn-danger">{{ __('Cancel') }}</a>
                        </div>
                    </div>
                </div>  
              </form>    
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('/admin/assets/vendor/jquery.form.js') }}"></script>
<script type="text/javascript">  
$(document).ready(function(){
    $('form').ajaxForm({

        uploadProgress:function(event, position, total, percentComplete)
        {
            $('.frm_add').find('.btn-submit').attr('disabled', true);
            $('.frm_add').find('.progress-bar').text(percentComplete + '%');
            $('.frm_add').find('.progress-bar').css('width', percentComplete + '%');
        },
        success:function(data)
        {
            if(data.status == 2)
            {
                $('.frm_add').find('.btn-submit').attr('disabled', false);
                $('.frm_add').find('.progress-bar').text('0%');
                $('.frm_add').find('.progress-bar').css('width', '0%');
                toastr.error(data.message);
            }
            if(data.status == 1)
            {
                $('.frm_add').find('.btn-submit').attr('disabled', false);
                $('.frm_add').find('.progress-bar').text('100%');
                $('.frm_add').find('.progress-bar').css('width', '100%');
                toastr.success(data.data.success);
                window.location.href = '{!! route('admin.courses') !!}';
            }
        }
    });
});
</script> 
@endpush

