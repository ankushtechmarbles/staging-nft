        @php $auth_user = Auth::user() @endphp
        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <!-- Sidebar Toggle (Topbar) -->
          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto"> 
            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ ucwords($auth_user->name) }}</span>
                @if(empty($auth_user->avatar))
                <svg aria-hidden="true" fill="currentColor" focusable="false" width="26" height="26" class="avatar-svg" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path fill="#dddfeb" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z"></path></svg>
                @else
                <img class="img-profile rounded-circle" src="{{ $auth_user->avatar }}" >                
                @endif
              </a>
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="{{ url('admin/profile') }}" accesskey="p">
                  <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  View <u>P</u>rofile
                </a>
                <a class="dropdown-item" href="{{ url('admin/change-password') }}" accesskey="c">
                  <i class="fas fa-key fa-sm fa-fw mr-2 text-gray-400"></i>
                  <u>C</u>hange Password
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="{{ route('logout') }}" data-toggle="modal" data-target="#logoutModal" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" accesskey="l">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  <u>L</u>ogout
                </a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
                </form>
              </div>
            </li>

          </ul>

        </nav>
        <!-- End of Topbar -->