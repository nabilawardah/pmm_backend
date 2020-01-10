@extends('layouts.web-provider')

{{-- @php
    dd($html)
@endphp --}}

@section('title', $article['title'])

@section('content')

  @include('components.navbar')

  @component('layouts.main-content', ['width' => 'default'])
    <header class="section--inset" style="margin-bottom: 64px">
      <footer class="article-author-wrapper" style="margin-bottom: 24px;">
        <img class="article-author-thumbnail" src="/images/users/default.png" alt="Ongki Herlambang">
        <div class="article-author-info">
          <p class="heading6" style="margin-bottom: 2px;">{{ $article['author']['name'] }}</p>
          <p class="small article-published-date">Published on {{ date('M d, Y', strtotime($article['submitted_at'])) }}</p>
        </div>
      </footer>
      <h1 class="heading1" style="margin-bottom: 24px">{{ html_entity_decode($article['title'], ENT_HTML5) }}</h1>
    </header>
    <img class="editor-cover-image" src="/media/user-{{ $article['author']['id'] }}/{{ $article['cover']['src'] }}" alt="">
    <section class="ql-container ql-snow">
      <article class="ql-editor">
        {!! html_entity_decode($article['html'])  !!}
      </article>
    </section>

  @endcomponent

  @include('components.footer')

@endsection