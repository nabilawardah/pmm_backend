@extends('layouts.web-provider')

@section('title', 'Articles')

@section('content')

@include('components.navbar')

@component('layouts.main-content')
  <h1 class="display2">Articles</h1>
  <hr>

  @foreach ($articles as $article)
      @if ($article['published'])
        <a href="/articles/{{$article['id']}}">
          <h1 class="heading1">{{ $article['title'] }}</h1>
          <span class="small">{{ $article['author'] }}</span>
          <p class="large">{{ $article['subtitle'] }}</p>
        </a>
      @endif
  @endforeach

@endcomponent

@include('components.footer')

@endsection