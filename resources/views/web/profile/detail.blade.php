@extends('layouts.web-provider')

@section('title', 'Ongki Herlambang')
@endsection

@section('content')

@include('components.navbar')

@component('layouts.main-content')
  <h1 class="display2">Profile Detail</h1>
@endcomponent

@include('components.footer')

@endsection