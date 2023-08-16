@extends('layouts.admin.master')
@section('title', 'Edit Project')
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
                            <h5 class="m-0 font-weight-bold text-primary">{{ __('Edit Project') }}</h5>
                        </div>
                    </div>
                </div>                        
                <form action="{!! url()->current() !!}" method="POST" enctype="multipart/form-data" autocomplete="off" class="frm_edit">
                @csrf
                <!-- Body -->
                <div class="card-body"><div class="row">
                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Title') }}:</label>
                            <input type="text" class="form-control slug_from" name="title" id="title"  placeholder="{{ __('Enter Title') }}" value="{{ old('title',$project->title) }}" required autofocus> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Slug') }}:</label>
                            <input type="text" class="form-control slug_to" name="slug" id="slug"  placeholder="{{ __('Enter Slug') }}" value="{{ old('slug',$project->slug) }}" required> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="poster"><span class="text-danger"></span>{{ __('Cover Image') }}:</label>
                            <div class="input-group">
                                @empty($project->cover_image)
                                <div class="input-group-prepend rounded-top">
                                    <div class="input-group-text addon border rounded-left text-danger"><i class="fas fa-times"></i></div>
                                </div>
                                @else
                                <div class="input-group-prepend rounded-top" title="{{ App\Helper::getFileNameOnly($project->cover_image) }}">
                                    <div class="input-group-text addon border rounded-left text-success"><i class="fas fa-check"></i></div>
                                </div>
                                @endempty
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="cover_image" name="cover_image" accept="image/*" tabindex="3">
                                    <label class="custom-file-label" for="cover_image">{{ __('Choose Cover Image') }}</label>
                                </div>
                                @isset($project->cover_image)
                                <div class="input-group-append rounded-top rounded-bottom bg-dark">
                                    <span class="input-group addon border rounded-right bg-light">
                                        <a href="{!! route('admin.project.remove-file',['project' => $project->id, 'filename' => 'cover_image' ]) !!}" type="button" class="btn btn-default fas fa-trash" title="Remove"></a>
                                    </span>
                                </div>
                                @endisset
                            </div>
                            <small id="model_src_help" class="form-text text-muted">{{ __('Select .jpg,.jpeg,.png file formats') }}</small>
                        </div>               

                        <div class="form-group col-lg-12 col-md-12 col-sm-12">
                            <label for="description"><span class="text-danger"></span>{{ __('Description') }}:</label>
                            <textarea class="form-control description" name="description" id="description">{!! old('description', $project->description) !!}</textarea> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Problem') }}:</label>
                            <input type="text" class="form-control" name="problem" id="problem"  placeholder="{{ __('Enter Problem') }}" value="{{ old('problem',$project->problem) }}" required> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Solution') }}:</label>
                            <input type="text" class="form-control" name="solution" id="solution"  placeholder="{{ __('Enter Solution') }}" value="{{ old('solution',$project->solution) }}" required> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger"></span>{{ __('Utility') }}:</label>
                            <input type="text" class="form-control" name="utility" id="utility"  placeholder="{{ __('Enter Utility') }}" value="{{ old('utility',$project->utility) }}"> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Supply') }}:</label>
                            <input type="number" class="form-control" name="supply" id="supply"  placeholder="{{ __('Enter Supply e.g. 500') }}" value="{{ old('supply',$project->supply) }}" min="0" required> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Owners') }}:</label>
                            <input type="number" class="form-control" name="owners" id="owners"  placeholder="{{ __('Enter Owners e.g. 2187') }}" value="{{ old('owners',$project->owners) }}" min="0" required> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="unlockable_content" tabindex="8">Unlockable Content:</label><br/>
                            <input name="unlockable_content" id="unlockable_content" type="checkbox" data-toggle="toggle" data-on="YES" data-off="NO" data-onstyle="success" data-offstyle="danger" data-width="100" tabindex="8" value="true" class="btn-toggle">
                        </div>
                        
                        <div class="form-group col-lg-3 col-md-3 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Items') }}:</label>
                            <input type="number" class="form-control" name="items" id="items"  placeholder="{{ __('Enter Items e.g. 287') }}" value="{{ old('items',$project->items) }}" min="0" required> 
                        </div>

                        <div class="form-group col-lg-3 col-md-3 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Collections') }}:</label>
                            <input type="number" class="form-control" name="collections" id="collections"  placeholder="{{ __('Enter Collections e.g. 1576') }}" value="{{ old('collections',$project->collections) }}" min="0" required> 
                        </div>  

                        <div class="form-group col-lg-3 col-md-3 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Track') }}:</label> 
                            <select class="form-control" name="track" required>
                                @foreach($project_tracks as $project_track)
                                  <option value="{{$project_track->id}}" @if( old('track', $project->track) == $project_track->id) selected @endif>{{$project_track->project_track_name}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group col-lg-3 col-md-3 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Type') }}:</label> 
                            <select class="form-control" name="types" required>
                                @foreach($project_types as $project_type)
                                  <option value="{{$project_type->id}}" @if( old('types', $project->types) == $project_type->id) selected @endif>{{$project_type->project_type_name}}</option>
                                @endforeach
                            </select>
                        </div>

                        @foreach($chains_list as $key => $value)
                        <div class="form-group col-lg-2 col-md-2 col-sm-6 col-6">
                            <label for="{{$key}}" tabindex="8">{{ $value }}:</label><br/>
                            <input name="supported_blockchains[{{$key}}]" id="{{$key}}" type="checkbox" data-toggle="toggle" data-on="YES" data-off="NO" data-onstyle="success" data-offstyle="danger" data-width="100" class="btn-toggle" value="1">
                        </div>
                        @endforeach 

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger"></span>{{ __('Discord') }}:</label>
                            <input type="text" class="form-control" name="discord" id="discord"  placeholder="{{ __('Enter Discord') }}" value="{{ old('discord',$project->discord) }}"> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger"></span>{{ __('Twitter') }}:</label>
                            <input type="text" class="form-control" name="twitter" id="twitter"  placeholder="{{ __('Enter Twitter') }}" value="{{ old('twitter',$project->twitter) }}"> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger"></span>{{ __('Website') }}:</label>
                            <input type="text" class="form-control" name="website" id="website"  placeholder="{{ __('Enter Website') }}" value="{{ old('website',$project->website) }}"> 
                        </div>

                        <div class="form-group col-lg-2 col-md-2 col-sm-6 col-6">
                            <label><span class="text-danger"></span>{{ __('Medal') }}:</label>
                            <input type="number" class="form-control" name="medal" id="medal"  placeholder="{{ __('Enter score') }}" value="{{ old('medal',$ProjectScore->medal??0) }}" min="1" max="10" step="0.5" required> 
                        </div>

                        <div class="form-group col-lg-2 col-md-2 col-sm-6 col-6">
                            <label><span class="text-danger"></span>{{ __('Heart') }}:</label>
                            <input type="number" class="form-control" name="heart" id="heart"  placeholder="{{ __('Enter score') }}" value="{{ old('heart',$ProjectScore->heart??0) }}" min="1" max="10" step="0.5" required> 
                        </div>

                        <div class="form-group col-lg-2 col-md-2 col-sm-6 col-6">
                            <label><span class="text-danger"></span>{{ __('Fire') }}:</label>
                            <input type="number" class="form-control" name="fire" id="fire"  placeholder="{{ __('Enter score') }}" value="{{ old('fire',$ProjectScore->fire??0) }}" min="1" max="10" step="0.5" required> 
                        </div>

                        <div class="form-group col-lg-2 col-md-2 col-sm-6 col-6">
                            <label><span class="text-danger"></span>{{ __('Money Bag') }}:</label>
                            <input type="number" class="form-control" name="money_bag" id="money_bag"  placeholder="{{ __('Enter score') }}" value="{{ old('money_bag',$ProjectScore->money_bag??0) }}" min="1" max="100" step="1" required> 
                        </div>

                        <div class="form-group col-lg-2 col-md-2 col-sm-6 col-6">
                            <label><span class="text-danger"></span>{{ __('Total') }}:</label>
                            <input type="number" class="form-control" value="{{ old('money_bag',$ProjectScore->total_score??0) }}" disabled> 
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
                        <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                            <button type="submit" class="btn btn-primary btn-submit">{{ __('Update') }}</button>
                            <a href="{!! route('admin.projects') !!}" class="btn btn-danger">{{ __('Cancel') }}</a>
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
<script type="text/javascript">
    $('.btn-toggle').bootstrapToggle();
    $('.btn-toggle').bootstrapToggle('off');
    @if($project->unlockable_content == true)
        $('#unlockable_content').bootstrapToggle('on');       
    @endif
    @foreach($chains_list as $key => $value)
        @if($SupportedBlockchains->$key == 1)
            $('#{{$key}}').bootstrapToggle('on');       
        @endif
    @endforeach
</script>
<script src="{{ asset('/admin/assets/vendor/jquery.form.js') }}"></script>
<script type="text/javascript">  
$(document).ready(function(){
    $('form').ajaxForm({

        uploadProgress:function(event, position, total, percentComplete)
        {
            $('.frm_edit').find('.btn-submit').attr('disabled', true);
            $('.frm_edit').find('.progress-bar').text(percentComplete + '%');
            $('.frm_edit').find('.progress-bar').css('width', percentComplete + '%');
        },
        success:function(data)
        {
            if(data.status == 2)
            {
                $('.frm_edit').find('.btn-submit').attr('disabled', false);
                $('.frm_edit').find('.progress-bar').text('0%');
                $('.frm_edit').find('.progress-bar').css('width', '0%');
                toastr.error(data.message);
            }
            if(data.status == 1)
            {
                $('.frm_edit').find('.btn-submit').attr('disabled', false);
                $('.frm_edit').find('.progress-bar').text('100%');
                $('.frm_edit').find('.progress-bar').css('width', '100%');
                toastr.success(data.data.success);
                window.location.href = '{!! route('admin.projects') !!}';
            }
        }
    });
});
</script>
<script src="{{url('')}}/admin/assets/vendor/tinymce/tinymce.min.js" type="text/javascript"></script>
<script type="text/javascript">
$(function() {
    tinymce.init({
        min_height: 400,
        selector: 'textarea.description',
        setup: function (editor) {
            editor.on('change', function () {
                tinymce.triggerSave();
            });
        },
        menubar: false,
        plugins: ["table","code"],
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | table | code'
    });
}); 
</script> 
@endpush