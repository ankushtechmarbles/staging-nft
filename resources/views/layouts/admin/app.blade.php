<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <title>@yield('title') | {{ config('settings.site_name', 'Cela Technologies Inc.') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="CELA Inc. Light up your AR World">
    <meta name="author" content="Cela Technologies Inc.">
    <meta name="designer" content="Naren Thaker">

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
            google: {"families":["Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i","Roboto:300,400,500,600,700"]},
            active: function() {
                sessionStorage.fonts = true;
            }
          });
        </script>
    <!--end::Web font -->
    <!-- Custom styles for this template-->
    <link href="{{ asset('admin/assets/css/style.bundle.css') }}" rel="stylesheet">

</head>

<body class="bg-gradient-primary">

  @yield('content')

  <!-- Bootstrap core JavaScript-->
  <script src="{{ asset('admin/assets/vendor/jquery/jquery.min.js') }}"></script>
  <script src="{{ asset('admin/assets/vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
  <!-- Core plugin JavaScript-->
  <script src="{{ asset('admin/assets/vendor/jquery-easing/jquery.easing.min.js') }}"></script>
  <!-- Custom scripts for all pages-->
  <script src="{{ asset('admin/assets/js/login.js') }}"></script>
</body>

</html>
