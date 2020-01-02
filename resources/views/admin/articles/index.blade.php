@extends('layouts.admin-provider')

@section('title', 'Articles')

@section('content')
  @component('components.navbar-admin')
  @endcomponent

  @component('layouts.main-content')

    <h1 class="heading1 article-title" contenteditable>Jakarta Banjir, Jakarta Punya Monorail, Okezone Aja!</h1>

    <a class="button button--medium primary" href="/admin/articles/edit/1">Write new article</a>

  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
