<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <title>@yield('title') | {{ config('settings.site_name', config('app.name')) }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="developer" content="@narenthaker">

    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="pragma" content="no-cache" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}">

    <!--begin::Web font -->
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script>
      WebFont.load({
            google: {"families":["Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i","Roboto:300,400,500,600,700","Public+Sans:300,400,500,600,700"]},
            active: function() {
                sessionStorage.fonts = true;
            }
          });
        </script>
    <!--end::Web font -->

    <script>
    var BASE_URL = "{{ url('/') }}";
    </script>
    <!--end::Fonts -->
    <!-- BEGIN GLOBAL MANDATORY STYLES -->    
    <link href="{{ asset('admin/assets/css/style.bundle.css') }}" rel="stylesheet">
    <link href="{{ asset('admin/assets/css/vendors.bundle.css') }}" rel="stylesheet">
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    @stack('css-plugins')
    <!-- END PAGE LEVEL PLUGINS -->
    @livewireStyles
</head>

<body id="page-top" class="sidebar-toggled">
  <!-- Page Wrapper -->
  <div id="wrapper">
    @include('layouts.admin.partials.sidebar')
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        @include('layouts.admin.partials.nav')

        @yield('content')

      </div>
      <!-- End of Main Content -->

      @include('layouts.admin.partials.footer')

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>
  <!-- Bootstrap core JavaScript-->
  <script src="{!! URL::asset('admin/assets/js/vendors.bundle.js') !!}"></script>
  <script type="text/javascript">
    $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
  </script>
  <!-- Custom scripts for all pages-->  
  @include('layouts.admin.partials.notification')
  @livewireScripts
  @stack('scripts')
</body>
</html>
