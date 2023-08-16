<div>
  <div class="d-lg-flex align-items-center justify-content-between py-4 mt-lg-2">
    <div class="d-md-flex mb-3">              
      <div class="position-relative me-md-4 mb-2 mb-md-0" style="min-width: 300px;">
        <input type="text" class="form-control pe-5" placeholder="Search courses" wire:model="search_by.course_title">
        <i class="bx bx-search text-nav fs-lg position-absolute top-50 end-0 translate-middle-y me-3"></i>
      </div>
      <select class="form-select me-md-4 mb-2 mb-md-0 select2" style="min-width: 240px;" wire:model="search_by.course_level_id">
          @foreach($course_levels as $key => $value)
            <option value="{{$key}}" {{ old('course_level_id') == $key ? 'selected' : null }} >{{ $value }}</option>
          @endforeach
      </select>

      <select class="form-select me-md-4 mb-2 mb-md-0 select2" style="min-width: 240px;" wire:model="search_by.course_category_id">
          @foreach($course_categories as $key => $value)
          <option value="{{$key}}" {{ old('course_category_id') == $key ? 'selected' : null }} >{{$value}}</option>
          @endforeach
      </select> 
    </div>
  </div>
  @if ($courses->count() > 0)
     <!-- Courses grid -->
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gx-3 gx-md-4 mt-n2 mt-sm-0">
      @foreach($courses as $course)
      <!-- Item -->
      <div class="col pb-1 pb-lg-3 mb-4">
        <article class="card h-100 border-2 shadow">
          <div class="position-relative">
            <a href="{{ route('course.show',['course' => $course->course_slug ]) }}" class="d-block position-absolute w-100 h-100 top-0 start-0"></a>
            <img src="{{ $course->CoverImagePath() }}" class="card-img-top" alt="...">
          </div>
          <div class="card-body pb-3">
            <h3 class="h5 mb-2 d-lg-flex align-items-center justify-content-between">
              <a href="{{ route('course.show',['course' => $course->course_slug ]) }}">{{ $course->course_title ?? ''  }}</a>
              <a href="{{ route('course.show',['course' => $course->course_slug ]) }}" class="btn btn-info rounded-pill btn-sm">{{ $course->courseLevels->course_level_name ?? '' }}</a>
            </h3>
            <p class="fs-sm mb-2">1.6 Hours</p> 
          </div>
        </article>
      </div>
      @endforeach
    </div>
    @if ($showLoadMoreButton)
    <div class="row">
      <div class="col-12 mt-4 pt-lg-4 pt-3 text-center">
        <button wire:click="loadCourses" type="button" class="btn btn-light-2 rounded-pill">load more</button>
      </div>
    </div>
    @endif
  @endif
</div>