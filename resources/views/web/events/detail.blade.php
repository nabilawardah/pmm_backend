@extends('layouts.web-provider')

@section('title', 'Website Announcement')

@section('content')

@include('components.navbar')

@component('layouts.main-content')
  <h1 class="display2">Event Detail</h1>
@endcomponent

@include('components.footer')

@endsection