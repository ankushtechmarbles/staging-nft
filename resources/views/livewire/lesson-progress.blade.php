<div>	
  <div class="progress my-3" style="height: 4px;">
    <div class="progress-bar bg-warning" role="progressbar" style="width: {{session()->get('lesson_progress')}}%" aria-valuenow="{{session()->get('lesson_progress')}}" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <div class="fs-sm mb-2">{{session()->get('lesson_progress')}}% Complete</div>
</div>