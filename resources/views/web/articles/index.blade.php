@extends('layouts.web-provider')

@section('title', 'Articles')

@section('content')

@include('components.navbar')

@component('layouts.main-content', ['width' => 'bleed'])

  @if($featured_article)
    <main class="container-post-header">
      <a class="article-main-wrapper" href="/articles/{{ $featured_article['id'] }}">
        <article class="article-main">
          <header class="article-main-thumbnail" style="background-image: url('{{ asset('/media/user-'.$featured_article['author']['id'].'/'.$featured_article['cover']['src'] ) }}')">
          </header>
          <main class="article-main-text">
            <h1 class="heading2 article-main-text-title" style="margin-bottom: 12px">{{ $featured_article['title'] }}</h1>
            <p class="medium article-main-text-subtitle">{{ $featured_article['subtitle'] }}</p>
            <footer class="article-author-wrapper" style="margin-top: 16px;">
              <img class="article-author-thumbnail" src="/images/users/default.png" alt="Ongki Herlambang">
              <div class="article-author-info">
                <p class="heading6" style="margin-bottom: 2px;">{{ $featured_article['author']['name'] }}</p>
                <p class="small article-published-date">Published on {{ date('M d, Y', strtotime($featured_article['submitted_at'])) }}</p>
              </div>
            </footer>
          </main>
        </article>
      </a>
      <div class="article-list-divider" aria-hidden="true"></div>
    </main>
  @endif

  <main class="article-list stack--ll container-post">
    @if($articles)
      @foreach ($articles as $article)
          @if ($article['published'])

          <a href="/articles/{{$article['id']}}" class="article-wrapper">
            <article class="article">
              <header class="article-text">
                <h1 class="heading3 article-text-title" style="margin-bottom: 8px">{{ $article['title'] }}</h1>
                <p class="medium article-text-subtitle">{{ $article['subtitle'] }}</p>
                <footer class="article-author-wrapper" style="margin-top: 16px;">
                  <img class="article-author-thumbnail" src="/images/users/default.png" alt="Ongki Herlambang">
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
    @endif
  </main>

@endcomponent

@include('components.footer')

@endsection