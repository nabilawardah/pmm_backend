@extends('layouts.web-provider')

@section('title', 'Home')

@section('content')

  @component('components.navbar')
  @endcomponent

  <div class="container-narrow">
    <h1 class="display2">Homepage</h1>
  </div>

  @component('components.footer')
  @endcomponent

@endsection
