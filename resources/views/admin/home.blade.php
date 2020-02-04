@extends('layouts.web-provider')

@section('title', 'Admin')

@section('content')

  @include('components.navbar-admin')

  @component('layouts.main-content')
    <h1 class="display2">Admin</h1>
  @endcomponent

  @include('components.footer')

@endsection
