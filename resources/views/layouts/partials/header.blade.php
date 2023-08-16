<header class="header navbar navbar-expand-lg @yield('header-bg-class', 'bg-light')  border-bottom ">
    <div class="container py-3">
        <a href="{{ url('/') }}" class="navbar-brand p-0">
            <img src="{{ asset('assets/img/logo/logo.svg') }}" alt="{{ config('app.name') }}" width="130">
        </a>
        <style type="text/css">

        </style>
        <div class="d-flex align-items-center order-lg-2 ms-auto">
            <a target="_blank" href="https://twitter.com/IDEA_NFTs" rel="nofollow" title="Twitter" class="nav-link px-2">
                <svg class="icon-width">
                    <use xlink:href="{{ asset('assets/img/idea-icon.svg#twitter') }}"></use>
                </svg>
            </a>
            <a target="_blank" href="https://discord.gg/nWpATbdZ" rel="nofollow" title="Discord" class="nav-link px-2">
                <svg class="icon-width">
                    <use xlink:href="{{ asset('assets/img/idea-icon.svg#discord') }}"></use>
                </svg>
            </a>
            @if (auth()->user())
                <a href="/user" class="nav-link px-2 pe-3">
                    <svg class="icon-width">
                        <use xlink:href="{{ asset('assets/img/idea-icon.svg#user') }}"></use>
                    </svg>
                </a>
            @endif
            <!-- <a href="#" class="btn btn-warning rounded-pill d-none d-lg-inline-flex ">
          Connect Wallet
        </a> -->
        </div>
        <div id="navbarNav" class="offcanvas offcanvas-start">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title">Menu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/') }}">Play</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('about') }}">About</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Leaderboard</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="{{ route('leaderboard') }}">Leaderboard</a></li>
                            <li><a class="dropdown-item" href="{{ route('leaderboard') }}">Winners</a></li>
                            <li><a class="dropdown-item" href="{{ route('showcase') }}">Showcase</a></li>
                        </ul>
                    </li>
                    @guest
                        <li class="nav-item" id="guest">
                            <a class="nav-link" href="/auth/login">Login/Register</a>
                        </li>
                        <script type="text/javascript">
                            if (localStorage.getItem('user')) {
                                document.getElementById('guest').style.display = "none";
                            }
                        </script>
                    @endguest
                    <!-- <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Courses</a>
            <ul class="dropdown-menu">
              <li><a href="{{ route('course.index') }}" class="dropdown-item">Course List</a></li>
              <li><a href="{{ route('course.index') }}" class="dropdown-item">Quiz</a></li>
            </ul>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Apply</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="{{ url('/') }}/creator/" target="_blank">Create</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{{ route('contact') }}">Contact</a>
            </li> -->
                </ul>
            </div>
            <!-- <div class="offcanvas-header border-top">
        <a href="#" class="btn btn-warning rounded-pill w-100" target="_blank" rel="noopener">  Connect Wallet </a>
    </div>   -->
        </div>
        <div class="form-check form-switch mode-switch pe-lg-1 ms-2 me-3" data-bs-toggle="mode">
            <input type="checkbox" class="form-check-input" id="theme-mode">
            <!-- <label class="form-check-label d-none d-sm-block" for="theme-mode">Light</label>
      <label class="form-check-label d-none d-sm-block" for="theme-mode">Dark</label> -->
        </div>

        <button type="button" class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</header>
