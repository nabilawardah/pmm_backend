@extends('layouts.admin-provider')

@section('title', 'Articles')

@section('content')
  @include('components.navbar-admin')

  @component('layouts.main-content', ['width' => 'post'])

    <h1 class="display3" style="font-size: 56px; margin-top: 64px; margin-bottom: 24px;">Jakarta Kebanjiran, Jakarta Punya Monorail, Oke!</h1>

    <a class="button button--medium primary" href="/articles/1/create">Write new article</a>

    <div id="article-container-read"></div>


  @endcomponent

  @include('components.footer')

@endsection
