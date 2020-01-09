@extends('layouts.web-provider')

{{-- @php
    dd($html)
@endphp --}}

@section('title', $article['title'])

@section('content')

  @include('components.navbar')

  @component('layouts.main-content')
    <header class="section--inset">
      <h1 class="heading1">{{ html_entity_decode($article['title'], ENT_HTML5) }}</h1>
    </header>
    <section class="ql-container ql-snow">
      <article class="ql-editor">
        {!! html_entity_decode($article['html'])  !!}
      </article>
    </section>

  @endcomponent

  @include('components.footer')

@endsection