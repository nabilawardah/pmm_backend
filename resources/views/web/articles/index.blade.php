@extends('layouts.web-provider')

@section('title', 'Articles')

@section('content')

@include('components.navbar')

@component('layouts.main-content', ['width' => 'bleed'])

  @if($featured_article)
  {{-- <div class="container-post" aria-hidden="true" style="margin-bottom: 24px;">
    <p class="heading3" style="font-weight: 400;">Featured Article</p>
  </div> --}}
  <main class="">
    <a class="article-main-wrapper" href="/articles/{{ $featured_article['id'] }}">
      <article class="article-main">
        <header class="article-main-thumbnail section--outset" style="margin-bottom: 48px; background-image: url('{{ asset('/media/user-'.$featured_article['author']['id'].'/'.$featured_article['cover']['src'] ) }}')">
        </header>
        <main class="article-main-text container-post">
          <h1 class="heading2 article-main-text-title" style="margin-bottom: 12px">{{ $featured_article['title'] }}</h1>
          <p class="medium article-main-text-subtitle">{{ $featured_article['subtitle'] }}</p>
          <footer class="article-author-wrapper" style="margin-top: 16px;">
            <img class="article-author-thumbnail" src="{{ "/images/users/".$featured_article['author']['photo'] }}" alt="{{ $featured_article['author']['name'] }}">
            <div class="article-author-info">
              <p class="heading6" style="margin-bottom: 2px;">{{ $featured_article['author']['name'] }}</p>
              <p class="small article-published-date">Published on {{ date('M d, Y', strtotime($featured_article['submitted_at'])) }}</p>
            </div>
          </footer>
        </main>
      </article>
    </a>
  </main>
  @endif

  @if($articles)
  <header class="container-post" style="margin-bottom: 32px">
    <h2 class="heading3" style="font-weight: 400;">Latest Articles</h2>
    <div class="article-list-divider" aria-hidden="true"></div>
  </header>
  <main class="article-list stack--xl container-post">
    @foreach ($articles as $article)
        @if ($article['published'])

        <a href="/articles/{{$article['id']}}" class="article-wrapper">
          <article class="article">
            <header class="article-text">
              <h1 class="heading3 article-text-title" style="margin-bottom: 8px">{{ $article['title'] }}</h1>
              <p class="medium article-text-subtitle">{{ $article['subtitle'] }}</p>
              <footer class="article-author-wrapper" style="margin-top: 16px;">
                <img class="article-author-thumbnail" src="{{ "/images/users/".$article['author']['photo'] }}" alt="{{ $article['author']['name'] }}">
                <div class="article-author-info">
                  <p class="heading6" style="margin-bottom: 2px;">{{ $article['author']['name'] }}</p>
                  <p class="small article-published-date">Published on {{ date('M d, Y', strtotime($articles[0]['submitted_at'])) }}</p>
                </div>
              </footer>
            </header>
            <aside class="article-thumbnail" style="background-image: url('{{ asset('/media/user-'.$article['author']['id'].'/'.$article['cover']['src'] ) }}')">
            </aside>
          </article>
        </a>

        @endif
    @endforeach
  </main>
  @endif

@endcomponent

@include('components.footer')

@endsection