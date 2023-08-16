<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ $course->course_title ?? ''  }} | {{ config('app.name') }}</title>

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
    <!-- Main Theme Styles + Bootstrap -->
    <link rel="stylesheet" media="screen" href="{{asset('assets/css/theme.css')}}">    

    @livewireStyles

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
  </head>
  <!-- Body -->
  <body>
    <style type="text/css">
      .idea-brand{
        padding: 44px 24px;
        gap: 8px; 
        width: 100%;
        height: 200px;
        background: #081322;
      }
      .list-group-item-action{
        text-decoration: none;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        text-transform: capitalize;
        background: #0C192C;
        color: rgba(255, 255, 255, 0.72);
        box-shadow:unset;
      }
      .list-group-item-action.active,
      .list-group-item-action:hover,
      .list-group-item-action:focus {        
        color: #FFFFFF;
        background: rgba(255, 255, 255, 0.03);
        box-shadow:unset;
      }
      .up-next{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        font-variant: small-caps;
        /* black/dark */
        color: #000000;
      }
      .course-page-study .frame-949 {
  align-items: center;
  align-self: center;
  background-color: var(--white-2);
  border: 1px solid;
  border-color: var(--black-pearl);
  border-radius: 45px;
  display: flex;
  gap: 5px;
  height: 25px;
  margin-top: 1.0px;
  overflow: hidden;
  padding: 0 1px;
  width: 52px;
}

.course-page-study .overlap-group {
  align-items: flex-end;
  background-color: var(--black-pearl);
  border-radius: 45px 0px 0px 45px;
  display: flex;
  height: 23px;
  justify-content: flex-end;
  min-width: 26px;
  padding: 5px 6.0px;
}

.course-page-study .akar-iconssun {
  height: 12px;
  width: 12px;
}

.course-page-study .bxmoon {
  height: 12px;
  margin-top: 1.0px;
  width: 12px;
}
    </style>
    <!-- Main sidebar navigation -->
    <aside class="dark-mode">
      <div id="docsNav" class="offcanvas-lg offcanvas-start d-flex flex-column position-fixed top-0 start-0 vh-100 bg-dark border-end-lg" style="width: 300px; z-index: 1045; overflow: scroll;">
        <div class="offcanvas-header d-none d-md-block idea-brand">
          <a href="#" class="navbar-brand text-dark d-none d-lg-flex py-0">
             {{ $course->course_title ?? ''  }}
          </a>
          <!-- Warning progress bar -->
          @livewire('lesson-progress')
        </div>
        <div class="offcanvas-body py-0 p-4">
          <div class="swiper-wrapper">
            <div class="swiper-slide h-auto">
              <div class="list-group list-group-flush mx-n4 pb-0">
                @livewire('course-study-sidebar', ['lessons' => $course->lessons ?? [] ])
                <a href="{{url('course-multichoice')}}" class="list-group-item list-group-item-action border-0 py-2 px-4 mb-3">Multichoice</a>
              </div>
            </div>
          </div>
          <div class="swiper-scrollbar end-0"></div>  
        </div>
        <div class="offcanvas-body border-top">
          <a href="{{ route('course.index')}}" class="btn btn-link w-100 text-light">
            <i class='bx bx-chevron-left fs-4 lh-1 me-1'></i> 
            &nbsp;Back to courses
          </a>
        </div>
      </div>
    </aside>

    <!-- Page container -->
    <main class="docs-container pt-5 pb-3 pb-lg-4">
      <div class="container-fluid px-xxl-8 px-lg-4 pt-4 pt-lg-5 pb-4">
        @livewire('course-study', ['lesson' => $course->lessons->first() ?? [], 'next_lesson' => $course->lessons->first()->nextLesson() ?? [] ])
      </div>
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
    @livewireScripts
    <!-- Main Theme Script -->
    <script src="{{asset('assets/js/theme.min.js')}}"></script>
  </body>
</html>