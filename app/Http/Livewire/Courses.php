<?php

namespace App\Http\Livewire;

use Illuminate\Support\Collection;
use Livewire\Component;

use App\Models\CourseCategory;
use App\Models\CourseLevel;
use Livewire\WithPagination;

class Courses extends Component
{
    use WithPagination;
    public int $amount = 1;

    public int $offset = 0;

    public Collection $courses;

    public bool $showLoadMoreButton;

    public bool $isSerach = false;

    public $search_by = [
        'course_title' => '',
        'course_level_id' => 0,
        'course_category_id' => 0,
    ];

    public $course_categories;
    public $course_levels;

    public function mount()
    {
        $this->course_categories = CourseCategory::orderBy('course_category_name')->where('course_category_is_active', 1)->pluck('course_category_name', 'id')->prepend('All Categories', '0');

        $this->course_levels = CourseLevel::orderBy('course_level_name', 'asc')->where('course_level_is_active', 1)->pluck('course_level_name', 'id')->prepend('All Level', '0');

        $this->loadCourses();
    }

    public function updating($value, $name)
    { 
		$this->isSerach = false;
		$this->offset = 0;
		$this->amount = 1;
		$this->resetPage();
		unset($this->courses);
		$this->loadCourses();
    }

    public function render()
    {
    	return view('livewire.courses');
    }

    public function loadCourses()
    {
        $courses = \App\Models\Course::query();

       	foreach ($this->search_by as $filter_by => $value) {
       		if (!empty($value)) {  
       			$this->isSerach = true;
       			if ($filter_by == 'course_title') {
                    $courses = $courses->where($filter_by, 'LIKE', '%' . $value . '%');
                } else if ($filter_by == 'course_level_id') {
                    $courses = $courses->where('course_level_id', $value);
                } else if ($filter_by == 'course_category_id') {
                    $courses = $courses->where('course_category_id', $value);
                }
            }
        }

        $total_course = $courses->count();

        $courses = $courses->offset($this->offset)->limit($this->amount)->get();

        $this->courses = isset($this->courses) ? $this->courses->merge($courses) : $courses;

        $this->offset += $this->amount;

        $this->showLoadMoreButton = $total_course > $this->offset;
       // $this->showLoadMoreButton = \App\Models\Course::count() > $this->offset;
    }
}
