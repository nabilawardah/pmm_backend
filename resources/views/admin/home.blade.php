@extends('layouts.web-provider')

@section('title', 'Admin')

@section('content')

  @component('components.navbar')
  @endcomponent

  <div class="container-narrow">
    <h1 class="display2">Admin</h1>
  </div>

  @component('components.footer')
  @endcomponent

@endsection
