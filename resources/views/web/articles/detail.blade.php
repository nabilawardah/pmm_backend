@extends('layouts.web-provider')

@section('title', 'Kegiatan Memasak Bersama di Pizza Hut')

@section('content')

@include('components.navbar')

@component('layouts.main-content')
  <h1 class="display2">Article Detail</h1>
@endcomponent

@component('components.footer')
@endcomponent

@endsection