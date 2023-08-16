@isset($quiz)
<!-- Modal Edit #{!! $quiz->id !!}-->
<div class="modal fade edit" id="model_edit_{!! $quiz->id !!}" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl my-0" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('Update Quiz') }}</h5>
                <a href="{!! url()->current() !!}" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </a>
            </div>
            @livewire('quizzes',['course' => $course, 'quiz' => $quiz])
        </div>
    </div>
</div>
<!-- End Modal Edit #{!! $quiz->id !!}-->
@endisset