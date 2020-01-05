@extends('layouts.admin-provider')

@section('title', 'Gallery Edit')

@section('content')

  @include('components.navbar-admin')

  @component('layouts.main-content')
    <h1 class="display2">Gallery Edit</h1>
  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
