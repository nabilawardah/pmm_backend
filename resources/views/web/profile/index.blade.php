@extends('layouts.web-provider')

@section('title', 'Ongki Herlambang')

@section('content')

  @include('components.navbar')

  @component('layouts.main-content')
    <h1 class="display2">Profile</h1>
  @endcomponent

@include('components.footer')

@endsection