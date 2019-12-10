@extends('layouts.web-provider')

@section('title', 'Home')

@section('content')

  @component('components.navbar')
  @endcomponent

  <div class="container">
    <h1>Homepage</h1>
  </div>

  @component('components.footer')
  @endcomponent

@endsection
