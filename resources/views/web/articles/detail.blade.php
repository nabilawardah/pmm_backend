@extends('layouts.web-provider')

{{-- @php
    dd($html)
@endphp --}}

@section('title', $article['title'])

@section('content')

  @include('components.navbar-article-admin')

  @component('layouts.main-content', ['width' => 'default'])
    <textarea class="hidden" id="single-article-data">{{ json_encode($article) }}</textarea>
    <header class="section--inset" style="margin-bottom: 64px">
      <h1 class="heading1" style="margin-bottom: 32px">{{ html_entity_decode($article['title'], ENT_HTML5) }}</h1>
      <footer class="article-author-wrapper" style="margin-bottom: 32px;">
        <img class="article-author-thumbnail larger" src="/images/users/default.png" alt="Ongki Herlambang">
        <div class="article-author-info">
          <p class="heading5" style="color: #484848; margin-bottom: 2px;">{{ $article['author']['name'] }}</p>
          <p class="medium article-published-date" style="color: #767676;">Published on {{ date('M d, Y', strtotime($article['submitted_at'])) }}</p>
        </div>
      </footer>
    </header>
    <img class="editor-cover-image" src="/media/user-{{ $article['author']['id'] }}/{{ $article['cover']['src'] }}" alt="">
    <section class="ql-container ql-snow">
      <article class="ql-editor">
        {!! html_entity_decode($article['html'])  !!}
      </article>
    </section>


  @endcomponent

  @include('components.confirm-delete-article')
  @include('components.footer')

@endsection