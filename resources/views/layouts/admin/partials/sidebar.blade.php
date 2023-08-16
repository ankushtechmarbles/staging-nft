    <ul class="navbar-nav bg-white sidebar sidebar-light accordion toggled shadow" id="accordionSidebar">
      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href='{{URL::to("admin/dashboard")}}' title="{{ config('global.site_name', 'MYND') }}"> 
        <div class="sidebar-brand-icon"> 
        @if( !empty( config('global.logo') ) )
          <img src="{{ URL::to('admin/assets/img/logo') }}/{{ config('global.logo', 'logo.svg') }}" width="100">
        @else
          <img src="{{ URL::to('admin/assets/img/logo/logo.svg') }}" width="100">
        @endif          
        </div>
        <div class="sidebar-brand-text mx-3">{{ config('global.site_name', 'IDEADAO') }}</div>
      </a>
      <hr class="sidebar-divider my-0">

      @if(Auth::user()->role == 'admin' || Auth::user()->role == 'staff' )
      @php
          $user_accesses = json_decode(Auth::user()->user_accesses,true);
      @endphp
      <!-- Nav Item - Dashboard -->
      <li class="nav-item {{ Request::is('admin/dashboard') ? 'active' : '' }}">
        <a class="nav-link" href="{{ url('admin/dashboard') }}" accesskey="D">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span><u>D</u>ashboard</span></a>
      </li>
      <hr class="sidebar-divider">  
      @if(Arr::has($user_accesses,'courses.view') || Arr::has($user_accesses,'course_category.view') || Arr::has($user_accesses,'course_level.view') )
        <li class="nav-item {{ ( Request::is('admin/courses') || Request::is('admin/course/*') || Request::is('admin/coursecategories')  || Request::is('admin/course-category/*') ) ? 'active' : '' }}">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#courses" aria-expanded="true" aria-controls="courses">
            <i class="fas fa-fw fa-folder"></i>
            <span>Courses</span>
          </a>
          <div id="courses" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              @if(Arr::has($user_accesses,'courses.view'))
              <a class="collapse-item" href="{{ url('admin/courses') }}">Courses</a>
              @endif
              @if(Arr::has($user_accesses,'course_category.view'))
              <a class="collapse-item" href="{{ url('admin/course-categories') }}">Course Categories</a>
              @endif
              @if(Arr::has($user_accesses,'course_level.view'))
              <a class="collapse-item" href="{{ url('admin/course-levels') }}">Course Levels</a>
              @endif
            </div>
          </div>
        </li>
        <hr class="sidebar-divider">
        @endif
      @if(Arr::has($user_accesses,'project.view')) 
      <li class="nav-item {{ Request::is('admin/projects') || Request::is('admin/project/*') ? 'active' : '' }}">
        <a class="nav-link" href="{{ url('admin/projects') }}" accesskey="P">
          <i class="fas fa-fw fa-users"></i>
          <span><u>P</u>rojects</span>
        </a>
      </li>
      <hr class="sidebar-divider">
      @endif
      @if(Arr::has($user_accesses,'user.view')) 
      <li class="nav-item {{ Request::is('admin/users') || Request::is('admin/user/*') ? 'active' : '' }}">
        <a class="nav-link" href="{{ url('admin/users') }}" accesskey="U">
          <i class="fas fa-fw fa-users"></i>
          <span><u>U</u>sers</span>
        </a>
      </li>
      <hr class="sidebar-divider">
      @endif
      @if(Arr::has($user_accesses,'settings.view'))
      <li class="nav-item {{ Request::is('admin/settings') ? 'active' : '' }}">
        <a class="nav-link" href="{{ url('admin/settings') }}" accesskey="N">
          <i class="fas fa-fw fa-cogs"></i>
          <span>Setti<u>n</u>gs</span>
        </a>
      </li>      
      <hr class="sidebar-divider">
      @endif
      <!-- Divider -->
      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline mt-3">
        <button class="rounded-circle border-0 bg-warning text-white" id="sidebarToggle"></button>
      </div>
      @endif
    </ul>