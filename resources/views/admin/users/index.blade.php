@extends('layouts.admin-provider')

@section('title', 'Users')

@section('content')

  @component('components.navbar')
  @endcomponent

  <div class="container-narrow">
    <h1 class="display2">Users</h1>
  </div>

  @component('components.footer')
  @endcomponent

@endsection
