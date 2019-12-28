@extends('layouts.admin-provider')

@section('title', 'Event Detail')

@section('content')

  @component('components.navbar-admin')
  @endcomponent

  @component('layouts.main-content')
    <h1 class="display2">Event Detail</h1>
  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
