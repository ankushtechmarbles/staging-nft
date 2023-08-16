<div>
@if (isset($lessons) && $lessons->count() > 0)
    <div class="mb-3">
    @foreach ($lessons as $lesson)
        <button class="list-group-item list-group-item-action border-0 py-3 px-4" wire:click="showLesson({{ $lesson->id }})">{{$lesson->lesson_title}}</button>
    @endforeach
    </div>
@endif
</div>
