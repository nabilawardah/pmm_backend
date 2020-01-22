@extends('layouts.admin-provider')

@section('title', 'Event Edit')

@section('content')

  @include('components.navbar')

  @include('components.media-library', ['user' => 1])

  @component('layouts.main-content', ['width' => 'narrow'])

    <main class="edit-event-step step-2">
      <div id="pell-editor"></div>
    </main>

    <input type="hidden" id="user-id" name="user-id" value="1" />

  @endcomponent


@endsection
