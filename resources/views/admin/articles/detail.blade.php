@extends('layouts.admin-provider')

@section('title', 'Article Detail')

@section('content')

  @component('components.navbar-admin')
  @endcomponent

  @component('layouts.main-content')
    <h1 class="display2">Article Detail</h1>
  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
