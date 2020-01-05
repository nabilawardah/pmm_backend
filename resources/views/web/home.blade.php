@extends('layouts.web-provider')

@section('title', 'Home')

@section('content')

  @include('components.navbar')

  @component('layouts.main-content')
    <h1 class="display2">Homepage</h1>
  @endcomponent

  @include('components.footer')

@endsection
