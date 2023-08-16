<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Course - Multichoice | {{ config('app.name') }}</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">

    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicon and Touch Icons
    <link rel="apple-touch-icon" sizes="180x180" href="{{asset('assets/favicon/apple-touch-icon.png')}}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{asset('assets/favicon/favicon-32x32.png')}}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{asset('assets/favicon/favicon-16x16.png')}}">
    <link rel="manifest" href="{{asset('assets/favicon/site.webmanifest')}}">
    <link rel="mask-icon" color="#6366f1" href="{{asset('assets/favicon/safari-pinned-tab.svg')}}">
    <meta name="msapplication-TileColor" content="#080032">
    <meta name="msapplication-config" content="{{asset('assets/favicon/browserconfig.xml')}}">
    <meta name="theme-color" content="white">-->
    <!-- Theme mode-->

    <!-- Vendor Styles -->
    <link rel="stylesheet" media="screen" href="{{asset('assets/vendor/boxicons/css/boxicons.min.css')}}"/>
    <link rel="stylesheet" media="screen" href="{{asset('assets/vendor/swiper/swiper-bundle.min.css')}}"/>
    <link rel="stylesheet" media="screen" href="{{asset('assets/vendor/lightgallery/css/lightgallery-bundle.min.css')}}"/>

    <!-- Main Theme Styles + Bootstrap -->
    <link rel="stylesheet" media="screen" href="{{asset('assets/css/theme.css')}}">     

    <!-- Theme mode -->
    <script>
      let mode = window.localStorage.getItem('mode'),
          root = document.getElementsByTagName('html')[0];
      if (mode !== null && mode === 'dark') {
        root.classList.add('dark-mode');
      } else {
        root.classList.remove('dark-mode');
      }
    </script>
    <style type="text/css">
      :root{
        --white: rgba(255, 255, 255, 0.722);
        --white2: rgba(255, 255, 255, 1);
         --eastern-blue : rgba(44, 153, 176, 1);
      }
      .header-site {
        padding: 30px 0 20px;
        border-bottom: 1px solid #000000;
      }
      .course-page-multichoice { 
        background-color: #fff7e3
      }
      .question{
        color: var(--black);
        font-family: var(--font-family-raleway);
        font-size: var(--font-size-32);
        font-weight: 600;
        font-style: normal;
      }
      .option{
        letter-spacing: 0;
        text-align: center;
        white-space: nowrap;
        width: 206px;
        border: 1px solid;
        border-color: var(--black);
        border-radius: 41px;
        height: 75px;
        min-width: 318px;
        padding: 15px 56px; 
      }
      .option.btn{ 
        font-family: var(--font-family-raleway);
        font-size: var(--font-size-24);
        font-weight: 600;
        font-style: normal;
      }
      .option.btn-danger,
      .option.btn-danger:active,
      .option.btn-danger:hover
      {
        background-color: #f83c1e;
        color: var(--white);
      }
      .option.btn-success,
      .option.btn-success:active,
      .option.btn-success:hover
      {
        background-color: #029e57;
        color: var(--white);
      }
      .option.btn-outline-secondary,
      .option.btn-outline-secondary:active,
      .option.btn-outline-secondary:hover{
        color: var(--eastern-blue);
        background-color: unset;
        border-color: var(--black);
      }
      .btn-option.btn-icon{
        color: var(--onyx);
        font-family: var(--font-family-raleway);
        font-size: var(--font-size-16);
        font-weight: 400;
        font-style: normal;
      }
 
    </style>
  </head>
  <!-- Body -->
  <body class="course-page-multichoice"> 

    <!-- Page wrapper for sticky footer -->
    <!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
    <main class="page-wrapper">
      <!-- Navbar -->
      <!-- Remove "navbar-sticky" class to make navigation bar scrollable with the page -->
      <header class="header navbar navbar-expand-lg navbar-sticky position-absolute header-site">
        <div class="container px-3">
          <a href="{{url('/')}}" class="navbar-brand pt-3 pe-3">
            <img src="{{asset('assets/img/logo/logo.svg')}}"  alt="{{config('app.name')}}"> 
          </a> 
          <div class="d-none d-lg-flex order-lg-3">
            <a href="{{url('course-study')}}" class="d-flex align-items-center text-decoration-none ms-4">
              <div class="fs-sm text-nowrap ps-2">
                <span class="text-nav">Understanding Tokenmics</span>
              </div>
            </a>
          </div>
          <button type="button" class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </header> 
      <!-- Hero -->
      <section class="position-relative py-5">

        <!-- Background -->
        <div class="position-absolute top-0 start-0 w-100 bg-position-top-center bg-size-cover bg-repeat-0" style="background-image: url(assets/img/multichoice-bg.png);">
          <div class="d-lg-none" style="height: 960px;"></div>
          <div class="d-none d-lg-block" style="height: 900px;"></div>
        </div>

        <!-- Content -->
        <div class="container position-relative zindex-5 py-5 mb-5">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-10 text-center py-5 mb-5">
              <!-- Text -->
              <h1 class="pt-4 pt-md-5 pb-2 pb-md-3 question">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum? </h1>
              <div class="row row-cols-2 pt-4 pt-md-5">
                <div class="col">
                  <button class="btn btn-danger option">Option 1</button>
                </div>
                <div class="col">
                  <button class="btn btn-outline-secondary option">Option 2</button>
                </div> 
              </div>
              <div class="row row-cols-2 pt-4 pt-md-5">
                <div class="col">
                  <button class="btn btn-outline-secondary option">Option 3</button>
                </div>
                <div class="col">
                  <button class="btn btn-success option">Option 4</button>
                </div> 
              </div>
            </div>

            <div class="col-lg-11 d-flex justify-content-between">
              <button class="btn btn-outline-dark btn-icon rounded-circle btn-option" type="button">Next</button> 
              <button class="btn btn-outline-dark btn-icon rounded-circle btn-option" type="button">Prev</button>
            </div>

          </div>

          </div>

        </div>
      </section>

    </main>

    <!-- Back to top button -->
    <a href="#top" class="btn-scroll-top" data-scroll>
      <span class="btn-scroll-top-tooltip text-muted fs-sm me-2">Top</span>
      <i class="btn-scroll-top-icon bx bx-chevron-up"></i>
    </a>


    <!-- Vendor Scripts -->
    <script src="{{asset('assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js')}}"></script>
    <script src="{{asset('assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js')}}"></script>
    <script src="{{asset('assets/vendor/swiper/swiper-bundle.min.js')}}"></script>
    <script src="{{asset('assets/vendor/lightgallery/lightgallery.min.js')}}"></script>
    <script src="{{asset('assets/vendor/lightgallery/plugins/video/lg-video.min.js')}}"></script>

    <!-- Main Theme Script -->
    <script src="{{asset('assets/js/theme.min.js')}}"></script>
  </body>
</html>