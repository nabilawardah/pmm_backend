@extends('layouts.admin-provider')

@section('title', 'Gallery Detail')

@section('content')

  @include('components.navbar-admin')

  @component('layouts.main-content')
    <h1 class="display2">Gallery Detail</h1>
  @endcomponent

  @include('components.footer')

@endsection
