@extends('layouts.admin-provider')

@section('title', 'Articles')

@section('content')

  @component('components.navbar-admin')
  @endcomponent

  <div class="container-narrow">
    <h1 class="display2">Articles</h1>
  </div>

  @component('components.footer')
  @endcomponent

@endsection
