<div class="modal fade add" id="model_add" tabindex="-1" role="dialog" aria-labelledby="model_add" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl my-0" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-weight-bold text-primary" id="model_add_title">{{ __('Add New Quiz') }}</h5>
                <a href="{!! url()->current() !!}" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </a>
            </div>
            @livewire('quizzes',['course' => $course])
        </div>
    </div>
</div>