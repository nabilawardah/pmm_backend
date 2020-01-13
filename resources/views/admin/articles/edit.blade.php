@extends('layouts.admin-provider')

@section('title', 'Article Edit')

@section('content')

  <style>
    .main-content {
      padding-bottom: 96px;
    }
  </style>

  @include('components.navbar-writing')
  @include('components.confirm-delete-article')
  @include('components.media-library')

  @component('layouts.main-content', ['width' => 'bleed'])
    <section>
      @isset($article['cover'])
        <div class="editor-cover-container">
          <img class="editor-cover-image" data-name="{{ $article['cover']['src'] }}" src="/media/user-1/{{ $article['cover']['src'] }}">
        </div>
      @else
        <div class="editor-cover-container cover-empty"></div>
      @endisset

      <header class="editor-header-wrapper section--inset">
        <h1 id="editor-title" class="editor-title" contenteditable autofocus>{{ $article['title'] ?? '' }}</h1>
      </header>

      <section class="editor-subtitle-wrapper section--inset">
        <p id="editor-subtitle-preview" class="editor-subtitle-preview" contenteditable>{{$article['subtitle'] ?? ''}}</p>
      </section>
    </section>

    <div id="toolbar-container">
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-header" value="1"></button>
        <button class="ql-header" value="2"></button>
        <button class="ql-header" value="3"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-blockquote"></button>
        {{-- <button class="ql-divider"></button> --}}
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-align" value=""></button>
        <button class="ql-align" value="center"></button>
        <button class="ql-align" value="right"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-link"></button>
        {{-- <button class="ql-image"></button> --}}
        <button class="ql-video"></button>
        <button class="ql-media"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-clean"></button>
      </span>
    </div>

    <div id="wysiwyg-editor"></div>

    <input name="editor-cover" type="file" class="editor-cover">
    <input type="hidden" id="article-id" name="article-id" value="{{ $article_id }}" />
    <input type="hidden" id="user-id" name="user-id" value="{{ $user_id }}" />
    <input type="hidden" name="article-title" />
    <input type="hidden" name="editor-subtitle-preview" />
    <input type="hidden" name="article-content" value="{{ json_encode($article['content'] ?? '') ?? '' }}" />
    <textarea class="hidden" name="article-data" id="article-data">{{ json_encode($article) ?? '' }}</textarea>
  @endcomponent


@endsection
