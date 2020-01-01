@extends('layouts.web-provider')

@section('title', 'Home')

@section('content')

  @component('components.navbar')
  @endcomponent

  @component('layouts.main-content')
    <h1 class="display2">Homepage</h1>
  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
