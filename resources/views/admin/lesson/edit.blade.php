@isset($lesson)
<!-- Modal Edit #{!! $lesson->id !!}-->
<div class="modal fade edit" id="model_edit_{!! $lesson->id !!}" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl my-0" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('Update Lesson') }}</h5>
                <a href="{!! url()->current() !!}" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </a>
            </div>
            <form action="{!! route('admin.lesson.edit',['lesson' => $lesson->id]) !!}" method="POST" enctype="multipart/form-data" novalidate>                
                @csrf
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Lesson Title') }}:</label>
                            <input type="text" class="form-control slug_from" name="lesson_title" id="lesson_title"  placeholder="{{ __('Enter Lesson Title') }}" value="{{ old('lesson_title',$lesson->lesson_title) }}" required autofocus> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Lesson Slug') }}:</label>
                            <input type="text" class="form-control slug_to" name="lesson_slug" id="lesson_slug"  placeholder="{{ __('Enter Lesson Slug') }}" value="{{ old('lesson_slug',$lesson->lesson_slug) }}" required> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="lesson_cover_image_{{$lesson->id}}"><span class="text-danger"></span>{{ __('Lesson Cover Image') }}:</label>
                            <div class="input-group">
                                @empty($lesson->lesson_cover_image)
                                <div class="input-group-prepend rounded-top">
                                    <div class="input-group-text addon border rounded-left text-danger"><i class="fas fa-times"></i></div>
                                </div>
                                @else
                                <div class="input-group-prepend rounded-top" title="{{ App\Helper::getFileNameOnly($lesson->lesson_cover_image) }}">
                                    <div class="input-group-text addon border rounded-left text-success"><i class="fas fa-check"></i></div>
                                </div>
                                @endempty
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="lesson_cover_image_{{$lesson->id}}" name="lesson_cover_image" accept="image/*" tabindex="4">
                                    <label class="custom-file-label" for="lesson_cover_image_{{$lesson->id}}">{{ __('Choose Lesson Cover Image') }}</label>
                                </div>
                                @isset($lesson->lesson_cover_image)
                                <div class="input-group-append rounded-top rounded-bottom bg-dark">
                                    <span class="input-group addon border rounded-right bg-light">
                                        <a href="{!! route('admin.lesson.remove-file',['lesson' => $lesson->id, 'filename' => 'lesson_cover_image' ]) !!}" type="button" class="btn btn-default fas fa-trash" title="Remove"></a>
                                    </span>
                                </div>
                                @endisset
                            </div>
                            <small id="model_src_help" class="form-text text-muted">{{ __('Select .jpg,.jpeg,.png file formats') }}</small>
                        </div> 

                        <div class="form-group col-lg-12 col-md-12 col-sm-12">
                            <label for="lesson_description"><span class="text-danger">*</span>{{ __('Lesson Description') }}:</label>
                            <textarea class="form-control lesson_description" name="lesson_description" id="lesson_description" required>{!! old('lesson_description',$lesson->lesson_description) !!}</textarea> 
                        </div>                       

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="lesson_visibility"><span class="text-danger"></span>{{ __('Visibility') }}:</label>
                            <select class="form-control m-input lesson_visibility custom-select select2" name="lesson_visibility" id="lesson_visibility" >
                                <option value="Public" {{ old('lesson_visibility',$lesson->lesson_visibility) == 'Public' ? 'selected' : null }} selected>Public - Visible to everyone</option>
                                <option value="Private" {{ old('lesson_visibility',$lesson->lesson_visibility) == 'Private' ? 'selected' : null }}>Private - Only visible to admin</option>
                            </select>
                        </div>
                        
                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="published_at" >Published at:</label><br/>
                            <input type="text" class="form-control datetimepicker published_at" name="published_at" placeholder="{{ __('Enter Published Date') }}" maxlength="100" value="{{ old('published_at',$lesson->published_at->format('d/m/Y H:i:s') ) }}">
                        </div> 
                    </div>

                    <div class="row">
                        <div class="form-group col-lg-12 col-md-12 col-sm-12">
                            <div class="progress mb-1">
                                <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%;  color:#000;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary btn-submit">{{ __('Save') }}</button>
                    <a href="{!! url()->current() !!}" class="btn btn-danger">{{ __('Cancel') }}</a>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- End Modal Edit #{!! $lesson->id !!}-->
@endisset