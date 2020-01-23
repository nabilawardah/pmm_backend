@extends('layouts.admin-provider')

@section('title', 'Event Edit')

@section('content')

  @include('components.confirm-delete', [
    'message' => 'Deleted events are gone forever. Are you sure?',
    'url' => '/api/events/delete/'.$event['id']
  ])

  <style>
    .main-content {
      padding-top: 0;
      padding-bottom: 0;
    }
  </style>

  @include('components.navbar-event', [
    'action_class' => 'publish-event',
    'action_label' => 'Save & Publish Event',
    'show_publish' => true
  ])

  @include('components.confirm-delete', [
    'message' => 'Deleted events are gone forever. Are you sure?',
    'url' => '/api/events/delete/'.$event['id']
  ])
  @include('components.media-library', ['user' => $admin])

  @component('layouts.main-content', ['width' => 'narrow'])

    <main class="edit-event-step step-1">

      <section>
        {{-- <header class="event-step-label-container">
          <span aria-hidden="true" class="event-step-label heading5">Step  1 / 2</span>
        </header> --}}
        <h1 class="heading1" style="margin-bottom: 48px; width: 100%;">Event Basic Info</h1>

        <section style="margin-bottom: 48px; width: 100%;">
          <fieldset class="input" style="width: 100%;">
            <label class="input-label label--event" for="event-title">Name</label>
            <input class="input-field date-picker" type="text" id="event-title" placeholder="What's the event name?" data-value="{{ $event['title'] ?? '' }}" value="{{ $event['title'] ?? '' }}">
          </fieldset>
          <fieldset class="input" style="margin-bottom: 0; width: 100%;">
            <label class="input-label label--event" for="event-summary">Summary</label>
            <textarea style="resize: vertical;" class="input-field" name="event-summary" id="event-summary" rows="4" placeholder="Write a short event summary to get attendees excited.">{{ $event['subtitle'] ?? '' }}</textarea>
          </fieldset>
        </section>

        <section class="date-picker-parents-reference" style="margin-bottom: 48px;">
          <h2 class="heading3" style="margin-bottom: 32px;">Date and Time</h2>
          <div class="date-time-outer-wrapper">
            <fieldset class="input date-picker-container" style="margin-bottom: 0;">
              <label class="input-label label--event" for="date-start">Start Date</label>
              <input class="input-field date-picker" type="text" id="date-start" placeholder="Start Date" data-value="{{ $event['date']['start_date'] ?? now() }}" value="{{ date('d F Y', strtotime($event['date']['start_date'] ?? now())) }}">
              <div class="popout calendar-outer-container hidden" style="display: none;" id="popout-start-date"></div>
            </fieldset>
            <fieldset class="input time-picker-container" style="margin-bottom: 0;">
              <label class="input-label label--event" for="time-start">Start time</label>
              <input class="input-field" type="text" id="time-start" placeholder="HH:MM" data-value="{{ $event['date']['start_time'] ?? '08:00' }}" value="{{ $event['date']['start_time'] ?? '08:00' }}">
            </fieldset>
          </div>
          <div class="date-time-outer-wrapper">
            <fieldset class="input date-picker-container" style="margin-bottom: 0;">
              <label class="input-label label--event" for="date-end">End Date</label>
              <input class="input-field date-picker" type="text" id="date-end" placeholder="End Date" data-value="{{ $event['date']['end_date'] ?? now() }}" value="{{ date('d F Y', strtotime($event['date']['end_date'] ?? now())) }}">
              <div class="popout calendar-outer-container hidden" style="display: none;" id="popout-end-date"></div>
            </fieldset>
            <fieldset class="input time-picker-container" style="margin-bottom: 0;">
              <label class="input-label label--event" for="time-end">End time</label>
              <input class="input-field" type="text" id="time-end" placeholder="HH:MM" data-value="{{ $event['date']['end_time'] ?? '08:00' }}" value="{{ $event['date']['end_time'] ?? '08:00' }}">
            </fieldset>
          </div>
          <fieldset class="input">
            <label class="input-label label--event" for="date-notes">Notes (optional)</label>
            <textarea style="resize: vertical;" class="input-field" name="date-notes" id="date-notes" rows="4" placeholder="Add some additional notes regarding the schedule.">{{ $event['date']['notes'] ?? '' }}</textarea>
          </fieldset>
        </section>

        <section style="margin-bottom: 48px;">
          <h2 class="heading3" style="margin-bottom: 32px;">Venue Location</h2>
          <fieldset class="input">
            <label for="venue-name" class="input-label label--event">Name</label>
            <input type="text" class="input-field" id="venue-name" placeholder="misal, GOR Semarak" value="{{ $event['venue']['name'] ?? '' }}">
          </fieldset>
          <fieldset class="input">
            <label for="venue-location" class="input-label label--event">Address</label>
            <textarea style="resize: vertical;" class="input-field" name="venue-location" placeholder="misal, Jalan Kalimantan No.12 Rawa Makmur Permai" id="venue-location" rows="3">{{ $event['venue']['address'] ?? '' }}</textarea>
          </fieldset>
        </section>

        <footer>
          <button class="button primary button--large edit-event-to-step-2">Continue</button>
          <button class="button ghost button--large">Cancel</button>
        </footer>

      </section>

      <section class="editor-poster-outer-wrapper">
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

      <div id="pell-editor"></div>

      <div class="modal-action-wrapper">
        <footer class="modal-action-bar section--inset">
          <button class="button primary button--large edit-event-to-step-1">
            <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-left: -8px; margin-right: 8px; height: 1em; width: 1em; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
            Back to Basic Info</button>
          <button class="button ghost button--large">Cancel</button>
        </footer>
      </div>

    </main>

    <input name="editor-cover" data-type="event" hidden type="file" class="editor-cover">
    <input type="hidden" id="event-id" name="event-id" value="{{ $event_id }}" />
    <input type="hidden" id="user-id" name="user-id" value="{{ $user_id ?? 1 }}" />
    <textarea class="hidden" name="event-data" id="event-data">{{ json_encode($event) ?? '' }}</textarea>

  @endcomponent


@endsection
