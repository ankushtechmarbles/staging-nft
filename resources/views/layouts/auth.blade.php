<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>@yield('title','') | {{ config('app.name') }}</title>

    <!-- SEO Meta Tags Start -->
    <meta name="title" content="@yield('title','') | {{ config('app.name') }}" />
    <meta name="description" content="@yield('meta_description', '')" />
    <meta name="keywords" content="@yield('meta_keywords', '')" />
    <meta name="author" content="@yield('author', config('app.name') )" />
    <!-- SEO Meta Tags End -->

    <!-- start fb and twitter og -->
    <meta property="og:url"                 content="{{ url()->current() }}" />
    <meta property="og:type"                content="@yield('og_type','website')" />
    <meta property="og:locale"              content="en_US" />
    <meta property="og:title"               content="@yield('title','') | {{ config('app.name') }}" />
    <meta property="og:description"         content="@yield('meta_description', '' )" />
    <meta property="og:image"               content="@yield('og_image', '')" />
    <meta property="og:site_name"           content="{{ config('app.name') }}" />
    <!-- end fb and twitter og tag -->

    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- canonical -->
    <link rel="canonical" href="{{ url()->current() }}" />

    <!-- Favicon and Touch Icons
    <link rel="apple-touch-icon" sizes="180x180" href="{{asset('assets/favicon/apple-touch-icon.png')}}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{asset('assets/favicon/favicon-32x32.png')}}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{asset('assets/favicon/favicon-16x16.png')}}">
    <link rel="manifest" href="{{asset('assets/favicon/site.webmanifest')}}">
    <link rel="mask-icon" color="#6366f1" href="{{asset('assets/favicon/safari-pinned-tab.svg')}}">
    <meta name="msapplication-TileColor" content="#080032">
    <meta name="msapplication-config" content="{{asset('assets/favicon/browserconfig.xml')}}">
    <meta name="theme-color" content="white">-->

    @livewireStyles

    <!-- Vendor Styles -->
    <link rel="stylesheet" media="screen" href="{{asset('assets/vendor/boxicons/css/boxicons.min.css')}}"/>
    <link rel="stylesheet" media="screen" href="{{asset('assets/vendor/swiper/swiper-bundle.min.css')}}"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" media="screen" href="{{ asset('assets/css/leaderboard.css') }}">
    <link rel="stylesheet" media="screen" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" media="screen" href="{{ asset('css/app.css') }}">
    @stack('vendor-css')

    <!-- Main Theme Styles + Bootstrap -->
    <link rel="stylesheet" media="screen" href="{{asset('assets/css/theme.css')}}">
    @stack('custom-css')

    <!-- Theme mode -->
    <script>
        let mode = window.localStorage.getItem('mode'),
            root = document.getElementsByTagName('html')[0];
        window.process = { browser: true, env: { ENVIRONMENT: 'BROWSER' } };
        if (mode !== null && mode === 'dark') {
            root.classList.add('dark-mode');
        } else {
            root.classList.remove('dark-mode');
        }
    </script>
</head>
<!-- Body -->
<body class="@yield('body-class','')" id="app">

<main class="page-wrapper">
    <header class="auth-header">
        <div class="col-12 justify-content-center align-items-center">
            <div class="header-logo">
                <a href="{{ url('/') }}">
                    <x-svg.logo-icon />
                </a>
            </div>
        </div>
    </header>

    @yield('content')

</main>


{{-- toast messages --}}
<div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">IDEA-NFT</strong>
            <small>Just now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body" id="toast-message">
            Hello, world! This is a toast message.
        </div>
    </div>
</div>

@livewireScripts
<!-- Vendor Scripts -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="{{asset('assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js')}}"></script>
<script src="{{asset('assets/vendor/swiper/swiper-bundle.min.js')}}"></script>
@stack('js-plugin')
<!-- Main Theme Script -->
<script src="{{asset('assets/js/theme.min.js')}}"></script>
<script src="{{ mix('js/app.js') }}"></script>
@stack('custom-scripts')
@yield('javascript')
</body>
</html>
