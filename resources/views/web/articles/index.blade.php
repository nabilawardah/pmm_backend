@extends('layouts.web-provider')

@section('title', 'Articles')

@section('content')

@include('components.navbar')

@component('layouts.main-content')
  <h1 class="display2">Articles</h1>
@endcomponent

@include('components.footer')

@endsection