<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="shortcut icon" type="image/png" href="{{ asset('/images/h-italics--dark.png') }}"/>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

        <title>@yield('title') - {{ config('app.name', 'Paragon Meaningful Movement') }}</title>
        <script defer src="{{ mix('js/prefetch.js') }}"></script>
    </head>
    <body class="website">
        @yield('content')
        <script src="{{ mix('js/manifest.js') }}"></script>
        <script src="{{ mix('js/vendor.js') }}"></script>
        <script src="{{ mix('js/app.js') }}"></script>
        @stack('scripts')
    </body>
</html>
