@extends('layouts.admin-provider')

@section('title', 'Articles')

@section('content')
  @component('components.navbar-admin')
  @endcomponent

  @component('layouts.main-content', ['width' => 'post'])

    <h1 class="display3" style="font-size: 56px; margin-top: 64px; margin-bottom: 24px;">Jakarta Kebanjiran, Jakarta Punya Monorail, Oke!</h1>

    <a class="button button--medium primary" href="/admin/articles/edit/1">Write new article</a>

    <div id="article-container-read"></div>


  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
