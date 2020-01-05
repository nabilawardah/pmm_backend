@extends('layouts.admin-provider')

@section('title', 'Event Detail')

@section('content')

  @include('components.navbar-admin')

  @component('layouts.main-content')
    <h1 class="display2">Event Detail</h1>
  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
