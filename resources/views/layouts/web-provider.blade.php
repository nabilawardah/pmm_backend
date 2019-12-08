<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <link rel="shortcut icon" type="image/png" href="{{ asset('/images/h-italics--dark.png') }}"/>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

        <title>{{ config('app.name', 'Paragon Meaningful Movement') }}</title>
    </head>
    <body>
        <h1>Hello world!</h1>

        <p>This should be going somewhere!</p>

        <script src="{{ mix('js/manifest.js') }}"></script>
        <script src="{{ mix('js/vendor.js') }}"></script>
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
