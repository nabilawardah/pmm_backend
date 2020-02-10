@extends('layouts.admin-provider')

@section('title', 'Article Detail')

@section('content')

  @include('components.navbar-article-admin')

  @component('layouts.main-content', ['width' => 'default'])
    <textarea class="hidden" id="single-article-data">{{ json_encode($article) }}</textarea>
    <header class="section--inset" style="margin-bottom: 64px">
      <h1 class="heading1" style="margin-bottom: 32px">{{ html_entity_decode($article['title'], ENT_HTML5) }}</h1>
      <footer class="article-author-wrapper" style="margin-bottom: 32px;">
        <img class="article-author-thumbnail larger" src="/images/users/default.png" alt="Ongki Herlambang">
        <div class="article-author-info">
          <p class="heading5" style="color: #484848; margin-bottom: 2px;">{{ $author['name'] }}</p>
          <p class="medium article-published-date" style="color: #767676;">Published on {{ date('M d, Y', strtotime($article['submitted_at'])) }}</p>
        </div>
      </footer>
    </header>
    <div class="container-narrow">
      <img class="editor-cover-image" src="/media/user-{{ $author['id'] }}/{{ $article['cover']['src'] }}" alt="">
    </div>

    <article class="pell-content section--inset" style="display: block; margin-bottom: 64px;">
      {!! html_entity_decode($article['html'])  !!}
    </article>


  @endcomponent

  @include('components.confirm-delete', [
    'message' => 'Deleted articles are gone forever. Are you sure?',
    'url' => '/api/articles/delete/'.$article['id']
  ])
  @include('components.footer')

@endsection
