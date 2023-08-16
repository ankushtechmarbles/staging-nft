<div class="modal fade add" id="model_add" tabindex="-1" role="dialog" aria-labelledby="model_add" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl my-0" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-weight-bold text-primary" id="model_add_title">{{ __('Add New Lesson') }}</h5>
                <a href="{!! url()->current() !!}" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </a>
            </div>
            <form action="{!! route('admin.lesson.add',['course' => $course]) !!}" method="POST" enctype="multipart/form-data" novalidate>
                @csrf
                <input type="hidden" name="lesson_position" value="1">
                <div class="modal-body">
                	<div class="row">
                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Lesson Title') }}:</label>
                            <input type="text" class="form-control slug_from" name="lesson_title" id="lesson_title"  placeholder="{{ __('Enter Lesson Title') }}" value="{{ old('lesson_title') }}" required autofocus> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label><span class="text-danger">*</span>{{ __('Lesson Slug') }}:</label>
                            <input type="text" class="form-control slug_to" name="lesson_slug" id="lesson_slug"  placeholder="{{ __('Enter Lesson Slug') }}" value="{{ old('lesson_slug') }}" required> 
                        </div>

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="lesson_cover_image"><span class="text-danger"></span>{{ __('Lesson Cover Image') }}:</label>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="lesson_cover_image" name="lesson_cover_image" accept="image/*" >
                                <label class="custom-file-label" for="lesson_cover_image">{{ __('Choose Lesson Cover Image') }}</label>
                            </div>
                            <small id="poster_help" class="form-text text-muted">{{ __('Select .jpg,.jpeg,.png file formats') }}</small>
                        </div> 

                    	<div class="form-group col-lg-12 col-md-12 col-sm-12">
                            <label for="lesson_description"><span class="text-danger">*</span>{{ __('Lesson Description') }}:</label>
                            <textarea class="form-control lesson_description" name="lesson_description" id="lesson_description" required>{!! old('lesson_description') !!}</textarea> 
                        </div>                       

                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="lesson_visibility"><span class="text-danger"></span>{{ __('Visibility') }}:</label>
                            <select class="form-control m-input lesson_visibility custom-select select2" name="lesson_visibility" id="lesson_visibility" >
                                <option value="Public" {{ old('lesson_visibility') == 'Public' ? 'selected' : null }} selected>Public - Visible to everyone</option>
                                <option value="Private" {{ old('lesson_visibility') == 'Private' ? 'selected' : null }}>Private - Only visible to admin</option>
                            </select>
                        </div>
                        
                        <div class="form-group col-lg-4 col-md-4 col-sm-12">
                            <label for="published_at" >Published at:</label><br/>
                            <input type="text" class="form-control datetimepicker published_at" name="published_at" placeholder="{{ __('Enter Published Date') }}" maxlength="100" value="{{ old( 'published_at', date('d/m/Y H:i:s') ) }}" >
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