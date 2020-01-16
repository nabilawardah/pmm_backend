@extends('layouts.admin-provider')

@section('title', 'Event Edit')

@section('content')

  <style>
    .main-content {
      padding-bottom: 96px;
    }
  </style>

  @include('components.navbar-writing', [
    'title' => 'New event',
    'action_class' => 'publish-event',
    'action_label' => 'Publish Event'
  ])
  @include('components.confirm-delete', [
    'message' => 'Deleted events are gone forever. Are you sure?',
    'url' => '/api/events/delete/'.$event['id']
  ])
  @include('components.media-library', ['user' => $admin])

  @component('layouts.main-content', ['width' => 'narrow'])

    <main class="edit-event-step step-1">
      <section>
        <header class="editor-header-wrapper">
          <h1 id="editor-title" class="editor-title" contenteditable autofocus>{{ $event['title'] ?? '' }}</h1>
        </header>
        <section class="editor-subtitle-wrapper">
          <p id="editor-subtitle-preview" class="editor-subtitle-preview" contenteditable>{{$event['subtitle'] ?? ''}}</p>
        </section>
        <section>
          <fieldset class="input">
            <label class="input-label" for="date-start">Date</label>
            <div class="date-picker-outer-wrapper">
              <div class="date-picker-container">
              <input class="input-field date-picker" type="text" id="date-start" placeholder="Start" style="margin-right: 8px;" data-value="{{ $event['date']['start'] ?? now() }}" value="{{ date('d F Y', strtotime($event['date']['start'] ?? now())) }}">
                <div class="popout calendar-outer-container" style="display: none;" id="popout-start-date"></div>
              </div>
              <div class="date-picker-container">
                <input class="input-field" type="text" id="date-end" placeholder="End">
                <div class="popout calendar-outer-container" style="display: none;" id="popout-end-date"></div>
              </div>
            </div>
          </fieldset>
          <fieldset class="input">
            <label class="input-label" for="time-start">Time</label>
            <span style="display: flex;">
              <input class="input-field" type="text" id="time-start" placeholder="Start" style="margin-right: 8px;">
              <input class="input-field" type="text" id="time-end" placeholder="End">
            </span>
          </fieldset>
        </section>
      </section>

      <section>
        @isset($event['poster'])
          <div class="editor-cover-container editor-cover-container--event">
            <img class="editor-cover-image editor-cover-image--event" width="100%" data-name="{{ $event['poster'] }}" src="/media/user-1/{{ $event['poster'] }}">
          </div>
        @else
          <div class="editor-cover-container cover-empty editor-cover-container--event"></div>
        @endisset
      </section>

    </main>

    <main class="edit-event-step step-2" style="display: none;">
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

    </main>

    <input name="editor-cover" type="file" class="editor-cover">
    <input type="hidden" id="event-id" name="event-id" value="{{ $event_id }}" />
    <input type="hidden" id="user-id" name="user-id" value="{{ $user_id }}" />
    <input type="hidden" name="event-title" />
    <input type="hidden" name="editor-subtitle-preview" />
    <textarea class="hidden" name="event-data" id="event-data">{{ json_encode($event) ?? '' }}</textarea>

  @endcomponent


@endsection
