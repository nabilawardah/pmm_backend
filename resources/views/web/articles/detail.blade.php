@extends('layouts.web-provider')

@section('title', $article['title'])

@section('content')

  @include('components.navbar')

  @component('layouts.main-content')
    <h1 class="display2">Article Detail</h1>

    <section class="ql-container ql-snow">
      <article class="ql-editor">
        {!! trim($article['html'], 'u0022')  !!}
      </article>
    </section>

  @endcomponent

  @include('components.footer')

@endsection