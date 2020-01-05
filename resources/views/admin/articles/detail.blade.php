@extends('layouts.admin-provider')

@section('title', 'Article Detail')

@section('content')

  @include('components.navbar-admin')

  @component('layouts.main-content')
    <h1 class="display2">Article Detail</h1>
  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
