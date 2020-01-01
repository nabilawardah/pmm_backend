@extends('layouts.web-provider')

@section('title', 'Ongki Herlambang')

@section('content')

@component('components.navbar')
@endcomponent

  @component('layouts.main-content')
    <h1 class="display2">Profile</h1>
  @endcomponent

@component('components.footer')
@endcomponent

@endsection