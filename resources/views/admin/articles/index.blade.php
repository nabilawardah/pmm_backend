@extends('layouts.admin-provider')

@section('title', 'Articles')

@section('content')
  @component('components.navbar-admin')
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
        <button class="ql-clean"></button>
      </span>
    </div>

    <input type="hidden" name="article-title" />

    <h1 class="heading1 article-title" contenteditable>Jakarta Banjir, Jakarta Punya Monorail, Okezone Aja!</h1>

    <div id="wysiwyg-editor">
      <p>Hi, there! General Kenobi...</p>
    </div>

    <input type="hidden" name="article-content" />
    <button class="button button--medium primary publish-article">Submit Article</button>

  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
