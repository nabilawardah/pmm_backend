@extends('layouts.admin-provider')

@section('title', 'Article Edit')

@section('content')

  @component('components.navbar-writing')
  @endcomponent

  @component('layouts.main-content', ['width' => 'post'])

    <div id="toolbar-container">
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-header" value="1"></button>
        <button class="ql-header" value="2"></button>
        <button class="ql-header" value="3"></button>
        <button class="ql-blockquote"></button>
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
        <button class="ql-image"></button>
        <button class="ql-video"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-custom-media"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-clean"></button>
      </span>
    </div>


    <h1 id="article-title" class="article-title" contenteditable autofocus> </h1>
    <input type="hidden" id="article-id" name="article-id" value="{{ $article_id }}" />
    <input type="hidden" name="article-title" />

    <div id="wysiwyg-editor"></div>
    <input type="hidden" name="article-content" />


  @endcomponent

@endsection
