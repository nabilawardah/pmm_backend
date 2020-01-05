@extends('layouts.web-provider')

@section('title', 'Gallery')

@section('content')

@include('components.navbar')

@component('layouts.main-content')
  <h1 class="display2">Gallery</h1>
@endcomponent

@include('components.footer')

@endsection