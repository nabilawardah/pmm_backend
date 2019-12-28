@extends('layouts.admin-provider')

@section('title', 'User Detail')

@section('content')

  @component('components.navbar-admin')
  @endcomponent

  @component('layouts.main-content')
    <h1 class="display3">User Detail</h1>
  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
