<div>
    <h1 class="ps-lg-2 ps-xxl-0 mt-2 mt-lg-0 pt-4 pb-2 mb-3 mb-xl-4">{{ $lesson->lesson_title ?? '' }}
      <div class="frame-949 d-none">
          <div class="overlap-group">
            <img class="akar-iconssun" src="{{ asset('assets/img/icon/akar-icons-sun-1@2x.png')}}" alt="akar-icons:sun">
          </div>
          <img class="bxmoon" src="{{ asset('assets/img/icon/bx-moon-1@2x.png')}}" alt="bx:moon">
      </div>
    </h1>

    {!! $lesson->lesson_description ?? '' !!}

    @if(isset($next_lesson))
    <div class="lesson-up-next w-100">
      <p class="up-next mb-0">Up Next</p>
      <a href="#" class="btn btn-link text-dark ps-0" wire:click="singleLesson({{ $next_lesson->id ?? '' }})">{{ $next_lesson->lesson_title ?? '' }}&nbsp; <i class='bx bx-right-arrow-alt fs-4 lh-1 ms-1'></i>            
      </a>
    </div>
    @endif
</div>