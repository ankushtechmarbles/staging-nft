<div class="header-site header_site">
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <a class="navbar-brand" href="{{ url('/') }}"><img src="/image/logo.png"></a>
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('about') }}">About</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                        aria-expanded="false">Courses</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="{{ url('leaderboard') }}">Leaderboard</a></li>
                        <li><a class="dropdown-item" href="{{ url('showcase') }}">Showcase</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Apply</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                        aria-expanded="false">Leaderboard</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="{{ url('leaderboard') }}">Leaderboard</a></li>
                        <li><a class="dropdown-item" href="{{ url('showcase') }}">Showcase</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://idea.thecela.com/creator/" target="_blank">Create</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('contact') }}">Contact</a>
                </li>
            </ul>
            <div class="social_login">
                <ul class="navbar-nav ml-auto">
                    <li><a href="#"><img src="/image/Vector.png"></a></li>
                    <li><a href="#"><img src="/image/acc.png"></a></li>
                    <a class="btn">Connect Wallet</a>
                </ul>
            </div>
        </div>
    </nav>
</div>
