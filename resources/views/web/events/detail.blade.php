@extends('layouts.web-provider')

<style>
  div#main-content {
    padding: 0;
  }
</style>

@section('title', $event['title'] ?? '')

@section('content')

@component('layouts.main-content', ['width' => 'bleed'])
  <main class="event-detail-outer-wrapper">

    <section class="event-detail-info">
      <header class="padding-bottom: 48px;">
        <a href="/events" style="display: inline-flex; align-items: center; justify-content: flex-start; margin-bottom: 24px">
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-right: 8px; height: 1em; width: 1em; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
          Back</a>
        <h1 class="heading2" style="margin-bottom: 24px;">{{ $event['title'] ?? '' }}</h1>
      </header>
      <ul class="event-detail-info-list-container">
        <li class="event-detail-info-list-item">
          <span class="event-detail-info-list-item-icon">
            @include('icons.time')
          </span>
          <span class="event-detail-info-list-item-detail">
            <p class="heading5" style="margin-bottom: 2px">{{ $event['date']['formatted_date'] }}</p>
            <p class="heading5" style="margin-bottom: 8px">{{ $event['date']['formatted_time'] }}</p>
            <p class="small">{{ $event['date']['notes'] }}</p>
          </span>
        </li>
        <li class="event-detail-info-list-item">
          <span class="event-detail-info-list-item-icon">
            @include('icons.place')
          </span>
          <span class="event-detail-info-list-item-detail">
            <p class="heading5" style="margin-bottom: 8px">{{ $event['venue']['name'] }}</p>
            <p class="small">{{ $event['venue']['address'] }}</p>
          </span>
        </li>
        <button class="button button--large primary stretch">Join Event</button>
      </ul>
    </section>

    <section class="event-detail-description">

      <section class="event-detail-info-mobile">
        <header style="padding-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,.12); margin-bottom: 32px;">
          <a href="/events" style="display: inline-flex; align-items: center; justify-content: flex-start; margin-bottom: 24px">
            <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-right: 8px; height: 1em; width: 1em; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
            Back</a>
          <h1 class="heading2" style="margin-bottom: 16px;">{{ $event['title'] ?? '' }}</h1>
          <p class="event-detail-subtitle">{{ $event['subtitle'] }}</p>
        </header>
        <ul class="event-detail-info-list-container" style="border-bottom: 1px solid rgba(0,0,0,.12);">
          <li class="event-detail-info-list-item">
            <span class="event-detail-info-list-item-icon">
              @include('icons.time')
            </span>
            <span class="event-detail-info-list-item-detail">
              <p class="heading5" style="margin-bottom: 2px">{{ $event['date']['formatted_date'] }}</p>
              <p class="heading5" style="margin-bottom: 8px">{{ $event['date']['formatted_time'] }}</p>
              <p class="small">{{ $event['date']['notes'] }}</p>
            </span>
          </li>
          <li class="event-detail-info-list-item">
            <span class="event-detail-info-list-item-icon">
              @include('icons.place')
            </span>
            <span class="event-detail-info-list-item-detail">
              <p class="heading5" style="margin-bottom: 8px">{{ $event['venue']['name'] }}</p>
              <p class="small">{{ $event['venue']['address'] }}</p>
            </span>
          </li>
        </ul>
      </section>

      <p class="event-detail-subtitle subtitle-wide">{{ $event['subtitle'] }}</p>

      @if(count($thumbnail_participants) > 0)
        <div class="event-detail-participants-container participants-wide">
          @foreach ($thumbnail_participants as $participant)
            <picture class="event-detail-participants-image-wrapper">
            <img class="event-detail-participants-image" title="{{ $participant['name'] }}" src="/images/users/{{ $participant['photo'] ?? 'default.png' }}" alt="{{ $participant['name'] }}">
            </picture>
          @endforeach
          @if (count($other_participants) > 0)
            <p class="heading6" style="padding-left: 8px;">+{{ count($other_participants )}} others are joining this event</p>
          @elseif(count($participants) === 1)
            <p class="heading6" style="padding-left: 8px;">is joining this event</p>
          @else
            <p class="heading6" style="padding-left: 8px;">are joining this event</p>
          @endif
        </div>
      @endif

      <section class="ql-container ql-snow ql-event-container" style="min-height: 0; margin-top: -24px;">
        <article class="ql-editor ql-event" style="min-height: 0; display: block;">
          {!! html_entity_decode($event['html'])  !!}
        </article>
      </section>

      <div class="modal-action-wrapper">
        <footer class="modal-action-bar section--outset action--inline">
          <button class="button primary button--large" style="margin-right: 24px;">Join the Event</button>
          @if(count($thumbnail_participants) > 0)
            <div class="event-detail-participants-container">
              @foreach ($thumbnail_participants as $participant)
                <picture class="event-detail-participants-image-wrapper">
                <img class="event-detail-participants-image" title="{{ $participant['name'] }}" src="/images/users/{{ $participant['photo'] ?? 'default.png' }}" alt="{{ $participant['name'] }}">
                </picture>
              @endforeach
              @if (count($other_participants) > 0)
                <p class="heading6" style="padding-left: 8px;">+{{ count($other_participants )}} others are joining this event</p>
              @elseif(count($participants) === 1)
                <p class="heading6" style="padding-left: 8px;">is joining this event</p>
              @else
                <p class="heading6" style="padding-left: 8px;">are joining this event</p>
              @endif
            </div>
          @endif
        </footer>
      </div>

    </section>

    <aside class="event-detail-aside">
      <picture class="event-detail-poster-wrapper">
        <img class="event-detail-poster" width="100%" src="/media/user-{{ $event['admin'] }}/{{ $event['poster'] }}" alt="{{ $event['title'] ?? '' }}">
      </picture>
    </aside>

  </main>
@endcomponent

@endsection