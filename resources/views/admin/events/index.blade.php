@extends('layouts.admin-provider')

@section('title', 'Events')

@section('content')

  @include('components.navbar-admin')

  @component('layouts.main-content')
    <h1 class="display2">Events</h1>
  @endcomponent

  @include('components.footer')

@endsection
