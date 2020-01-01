@extends('layouts.web-provider')

@section('title', 'Articles')

@section('content')

@component('components.navbar')
@endcomponent

@component('layouts.main-content')
  <h1 class="display2">Articles</h1>
@endcomponent

@component('components.footer')
@endcomponent

@endsection