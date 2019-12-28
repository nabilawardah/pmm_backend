@extends('layouts.admin-provider')

@section('title', 'Gallery')

@section('content')

  @component('components.navbar-admin')
  @endcomponent

  @component('layouts.main-content')
    <h1 class="display2">Gallery</h1>
  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
