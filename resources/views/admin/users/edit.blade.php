@extends('layouts.admin-provider')

@section('title', 'User Edit')

@section('content')

  @include('components.navbar-admin')

  @component('layouts.main-content')
    <h1 class="display3">User Edit</h1>
  @endcomponent

  @include('components.footer')

@endsection
