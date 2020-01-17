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

        <section class="editor-subtitle-wrapper" style="margin-bottom: 48px;">
          <p id="editor-subtitle-preview" class="editor-subtitle-preview event-summary" contenteditable>{{$event['subtitle'] ?? 'Summary'}}</p>
        </section>

        <section style="margin-bottom: 48px;">

          <h2 class="heading3" style="margin-bottom: 32px;">Date and Time</h2>
          <div class="date-time-outer-wrapper">
            <fieldset class="input date-picker-container" style="margin-bottom: 0;">
              <label class="input-label" for="date-start">Start Date</label>
              <input class="input-field date-picker" type="text" id="date-start" placeholder="Start Date" data-value="{{ $event['date']['start'] ?? now() }}" value="{{ date('d F Y', strtotime($event['date']['start'] ?? now())) }}">
              <div class="popout calendar-outer-container" style="display: none;" id="popout-start-date"></div>
            </fieldset>
            <fieldset class="input time-picker-container" style="margin-bottom: 0;">
              <label class="input-label" for="time-start">Start time</label>
              <input class="input-field" type="text" id="time-start" placeholder="Start">
            </fieldset>
          </div>

          <div class="date-time-outer-wrapper">
            <fieldset class="input date-picker-container" style="margin-bottom: 0;">
              <label class="input-label" for="date-end">End Date</label>
              <input class="input-field date-picker" type="text" id="date-end" placeholder="End Date" data-value="{{ $event['date']['start'] ?? now() }}" value="{{ date('d F Y', strtotime($event['date']['end'] ?? now())) }}">
              <div class="popout calendar-outer-container" style="display: none;" id="popout-end-date"></div>
            </fieldset>
            <fieldset class="input time-picker-container" style="margin-bottom: 0;">
              <label class="input-label" for="time-end">Start time</label>
              <input class="input-field" type="text" id="time-end" placeholder="End">
            </fieldset>
          </div>

        </section>

        <section>
          <h2 class="heading3" style="margin-bottom: 32px;">Venue</h2>
          <fieldset class="input">
            <label for="venue-name" class="input-label">Name</label>
            <input type="text" class="input-field" id="venue-name" placeholder="Venue Name" value="{{ $event['venue']['name'] ?? '' }}">
          </fieldset>
          <fieldset class="input">
            <label for="venue-detail" class="input-label">Name</label>
            <input type="text" class="input-field" id="venue-detail" placeholder="Venue Name" value="{{ $event['venue']['address'] ?? '' }}">
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
