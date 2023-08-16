<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport"
        content="height=device-height,width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,minimal-ui" />
    <meta name="description" content="Idea-dao NFT painting tool" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Security-Policy"
        content="default-src *  data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval' ;
        script-src * data: blob: 'unsafe-inline' 'unsafe-eval';
        connect-src * data: blob: 'unsafe-inline';
        img-src * data: blob: 'unsafe-inline';
        frame-src * data: blob: ;
        style-src * data: blob: 'unsafe-inline';
        font-src * data: blob: 'unsafe-inline';">

    <link rel="icon" type="image/svg+xml" href="/creator/svgs/logo.svg" />

    <title>Creator</title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;600;700&display=swap" rel="stylesheet">
    {{-- css --}}
    <link rel="stylesheet" href="{{ asset('/creator/index.css') }}">

    <script>
        window.global = window;
    </script>
    {{-- painter scripts --}}

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DXXWREWQ07"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-DXXWREWQ07');
    </script>

    <!-- Twitter conversion tracking base code -->
    <script>
        ! function(e, t, n, s, u, a) {
            e.twq || (s = e.twq = function() {
                    s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
                }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src =
                'https://static.ads-twitter.com/uwt.js',
                a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
        }(window, document, 'script');
        twq('config', 'odbfz');
    </script>
    <!-- End Twitter conversion tracking base code -->
    <script src="creator/PainterUtils/OES_texture_float_linear-polyfill.js"></script>
    <script src="creator/PainterUtils/wrappedgl.js"></script>
    <script src="creator/PainterUtils/utilities.js"></script>
    <script src="creator/PainterUtils/rectangle.js"></script>
    <script src="creator/PainterUtils/brush.js"></script>
    <script src="creator/PainterUtils/simulator.js"></script>
    <script src="creator/PainterUtils/paint.js"></script>
    <script>
        window.global = window;
    </script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DXXWREWQ07"></script>

    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-DXXWREWQ07');
    </script>
    <script>
        ! function(e, t, n, s, u, a) {
            e.twq || (s = e.twq = function() {
                    s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
                }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src =
                'https://static.ads-twitter.com/uwt.js',
                a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
        }(window, document, 'script');
        twq('config', 'odbfz');
    </script>
    <script src="creator/PainterUtils/OES_texture_float_linear-polyfill.js"></script>
    <script src="creator/PainterUtils/wrappedgl.js"></script>

    {{-- react scripts --}}
    <script type='module' crossorigin src="{{ asset('/creator/assets/index.9ff6f256.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('/creator/assets/index.51d6d9a6.css') }}">
</head>

<body>
    <div id="root"></div>

</body>

</html>
