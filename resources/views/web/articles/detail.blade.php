@extends('layouts.web-provider')

@section('title', $article['title'])

@section('content')

  @include('components.navbar')

  @component('layouts.main-content')
    <header class="section--inset">
      <h1 class="heading1">{{ $article['title'] }}</h1>
    </header>
    <section class="ql-container ql-snow">
      <article class="ql-editor">
        {!! trim($article['html'], 'u0022')  !!}
      </article>
    </section>

  @endcomponent

  @include('components.footer')

@endsection