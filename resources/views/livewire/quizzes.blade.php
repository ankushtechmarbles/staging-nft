<div>
    @if (session()->has('message'))
        <div class="alert alert-success">
          {{ session('message') }}
        </div>
    @endif
    <form >
        @csrf
        <div class="modal-body">
            <div class="row">
                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                    <label><span class="text-danger">*</span>{{ __('Question') }}:</label>
                    <textarea class="form-control" name="question" id="question"  placeholder="{{ __('Enter Question') }}" required autofocus wire:model="question"></textarea>
                    @error('question') <div class="text-danger">{{ $message }}</div>@enderror
                </div>  
            </div>
           
            <div class="add-input">
                <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <div class="form-group">
                            <label><span class="text-danger">*</span>{{ __('Answer') }}:</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                      <input type="checkbox" name="answer[0][is_correct]" value="1" wire:model="answer.0.is_correct">
                                    </div>
                                </div>
                                <input type="text" class="form-control" name="answer[0][option_text]" wire:model="answer.0.option_text">
                                <div class="input-group-append">
                                    <button class="btn btn-dark" wire:click.prevent="add({{$i}})">Add</button>
                                </div>
                            </div>
                            @error('answer') <div class="text-danger">{{ $message }}</div>@enderror
                            @error('answer.0.is_correct') <div class="text-danger">{{ $message }}</div>@enderror
                            @error('answer.0.option_text') <div class="text-danger">{{ $message }}</div>@enderror
                        </div>
                    </div> 
                </div>
            </div>
            @foreach($inputs as $key => $value)
            <div class="add-input">
                <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                      <input type="checkbox" name="answer[$key][is_correct]" value="1" wire:model="answer.{{ $value }}.is_correct">
                                    </div>
                                </div>
                                <input type="text" class="form-control" name="answer[$key][option_text]" wire:model="answer.{{ $value }}.option_text">
                                <div class="input-group-append">
                                    <button class="btn btn-dark" wire:click.prevent="remove({{$key}})">Remove</button>
                                </div>
                            </div>
                            @error('answer') <div class="text-danger">{{ $message }}</div>@enderror                   
                            @error('answer.{{ $value }}.is_correct') <div class="text-danger">{{ $message }}</div>@enderror
                            @error('answer.{{ $value }}.option_text') <div class="text-danger">{{ $message }}</div>@enderror
                        </div>
                    </div> 
                </div>
            </div>
            @endforeach
        </div>
        <div class="modal-footer">
            <button type="button" wire:click.prevent="store()" class="btn btn-success">{{ __('Save') }}</button> 
            <a href="{!! route('admin.quizzes',['course' => $course]) !!}" class="btn btn-danger">{{ __('Cancel') }}</a>
        </div>
    </form>
</div>