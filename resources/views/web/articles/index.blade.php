@extends('layouts.web-provider')

@section('title', 'Articles')

@section('content')

@include('components.navbar')

@component('layouts.main-content', ['width' => 'bleed'])
  {{-- <h1 class="display3">Articles</h1> --}}

  <main class="container-post-header">
    <a class="article-main-wrapper" href="/articles/{{ $articles[0]['id'] }}">
      <article class="article-main">
        {{-- <header class="article-main-thumbnail" style="background-image: url('{{ asset('/articles/user-'.$articles[0]['author']['id'].'/'.$articles[0]['cover']['src'] ) }}')"> --}}
        <header class="article-main-thumbnail" style="background-image: url('{{ asset('/articles/user-'.$articles[0]['author']['id'].'/io.png') }}')">
        </header>
        <main class="article-main-text">
          <h1 class="heading2 article-main-text-title" style="margin-bottom: 12px">{{ $articles[0]['title'] }}</h1>
          {{-- <p class="medium article-main-text-subtitle">{{ $articles[0]['subtitle'] }}</p> --}}
          <p class="large article-main-text-subtitle">First it was burgers. Now plant-based startups are coming for the nugget — but chicken is a much tougher challenge.</p>
          <footer class="article-author-wrapper" style="margin-top: 16px;">
            <img class="article-author-thumbnail" src="/images/users/default.png" alt="Ongki Herlambang">
            <div class="article-author-info">
              <p class="heading6" style="margin-bottom: 2px;">{{ $articles[0]['author']['name'] }}</p>
              <p class="small article-published-date">Published on Jan 7, 2020</p>
            </div>
          </footer>
        </main>
      </article>
    </a>
    <div class="article-list-divider" aria-hidden="true"></div>
  </main>

  <main class="article-list stack--ll container-post">
    @isset($articles)
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
                    <p class="small article-published-date">Published on Jan 7, 2020</p>
                  </div>
                </footer>
              </header>
              <aside class="article-thumbnail" style="background-image: url('{{ asset('/articles/user-'.$article['author']['id'].'/'.$article['cover']['src'] ) }}')">
              </aside>
            </article>
          </a>

          <a href="/articles/{{$article['id']}}" class="article-wrapper">
            <article class="article">
              <header class="article-text">
                <h1 class="heading3 article-text-title" style="margin-bottom: 8px">{{ $article['title'] }}</h1>
                <p class="medium article-text-subtitle">{{ $article['subtitle'] }}</p>
                <footer class="article-author-wrapper" style="margin-top: 16px;">
                  <img class="article-author-thumbnail" src="/images/users/default.png" alt="Ongki Herlambang">
                  <div class="article-author-info">
                    <p class="heading6" style="margin-bottom: 2px;">{{ $article['author']['name'] }}</p>
                    {{-- <p class="small article-published-date">{{ $article['author']['name'] }}</p> --}}
                    <p class="small article-published-date">Published on Jan 7, 2020</p>
                  </div>
                </footer>
              </header>
              <aside class="article-thumbnail" style="background-image: url('{{ asset('/articles/user-'.$article['author']['id'].'/'.$article['cover']['src'] ) }}')">
              </aside>
            </article>
          </a>

          <a href="/articles/{{$article['id']}}" class="article-wrapper">
            <article class="article">
              <header class="article-text">
                <h1 class="heading3 article-text-title" style="margin-bottom: 8px">{{ $article['title'] }}</h1>
                <p class="medium article-text-subtitle">{{ $article['subtitle'] }}</p>
                <footer class="article-author-wrapper" style="margin-top: 16px;">
                  <img class="article-author-thumbnail" src="/images/users/default.png" alt="Ongki Herlambang">
                  <div class="article-author-info">
                    <p class="heading6" style="margin-bottom: 2px;">{{ $article['author']['name'] }}</p>
                    {{-- <p class="small article-published-date">{{ $article['author']['name'] }}</p> --}}
                    <p class="small article-published-date">Published on Jan 7, 2020</p>
                  </div>
                </footer>
              </header>
              <aside class="article-thumbnail" style="background-image: url('{{ asset('/articles/user-'.$article['author']['id'].'/'.$article['cover']['src'] ) }}')">
              </aside>
            </article>
          </a>

          @endif
      @endforeach
    @else
      <p class="large">There's no article yet to show :(</p>
    @endisset
  </main>

@endcomponent

@include('components.footer')

@endsection