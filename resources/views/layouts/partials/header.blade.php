<header class="header navbar navbar-expand-lg">
    <div class="d-flex w-100 justify-content-around container py-3">

        <a href="{{ url('/') }}" class="navbar-brand p-0">
            <img src="{{ asset('assets/img/logo/logo.svg') }}" alt="{{ config('app.name') }}" width="198">
        </a>


        <div id="navbarNav" class="offcanvas offcanvas-start">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title">Menu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link" style="font-weight: 500" href="{{ route('about') }}">About</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" style="font-weight: 500" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Create</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="{{ route('leaderboard') }}">Placeholder</a></li>
                            <li><a class="dropdown-item" href="{{ route('leaderboard') }}">Placeholder</a></li>
                            <li><a class="dropdown-item" href="{{ route('showcase') }}">Placeholder</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" style="font-weight: 500" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Marketplace</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/marketplace/1">Marketplace Listing</a></li>
                            <li><a class="dropdown-item" href="{{ url('marketplace') }}">Market</a></li>
                            <li><a class="dropdown-item" href="{{ route('leaderboard') }}">Winners</a></li>
                            <li><a class="dropdown-item" href="{{ route('showcase') }}">Showcase</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="font-weight: 500" href="{{route('leaderboard')}}">Leaderboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="font-weight: 500" href="{{ url('/play') }}">Games</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="d-flex align-items-center order-lg-2 ms-auto">
            @if (auth()->user())
                <a href="/user" class="nav-link px-2 pe-3">
                    <svg class="icon-width">
                        <use xlink:href="{{ asset('assets/img/idea-icon.svg#user') }}"></use>
                    </svg>
                </a>
            @endif
            @guest
                <a href="{{route('dashboard')}}" class="btn btn-warning rounded-pill d-none d-lg-inline-flex ">Connect Wallet</a>
            @endguest
        </div>

        {{--   Mobile    --}}
        <button type="button" class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</header>

