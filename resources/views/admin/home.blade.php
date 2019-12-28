@extends('layouts.web-provider')

@section('title', 'Admin')

@section('content')

  @component('components.navbar-admin')
  @endcomponent

  @component('layouts.main-content')
    <h1 class="display2">Admin</h1>
  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
