@extends('layouts.admin-provider')

@section('title', 'Articles')

@section('content')
  @component('components.navbar-admin')
  @endcomponent

  @component('layouts.main-content')
    <h1 class="display2">Articles</h1>

    <div id="wysiwyg-editor">
      <p>Hi, there! General Kenobi...</p>
    </div>

  @endcomponent

  @component('components.footer')
  @endcomponent

@endsection
