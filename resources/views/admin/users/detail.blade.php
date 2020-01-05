@extends('layouts.admin-provider')

@section('title', 'User Detail')

@section('content')

  @include('components.navbar-admin')

  @component('layouts.main-content')
    <h1 class="display3">User Detail</h1>
  @endcomponent

  @include('components.footer')

@endsection
