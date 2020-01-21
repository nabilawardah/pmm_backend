@extends('layouts.web-provider')

<style>
  div#main-content {
    padding: 0;
  }
</style>

@section('title', $event['title'] ?? '')

@section('content')

@include('components.navbar-event')

@include('components.confirm-delete', [
  'message' => 'Deleted events are gone forever. Are you sure?',
  'url' => '/api/events/delete/'.$event['id']
])

<textarea hidden name="event-data" id="event-data" class="hidden">{{ json_encode($event) ?? '' }}</textarea>

@component('layouts.main-content', ['width' => 'bleed'])
  <main class="event-detail-outer-wrapper">

    <section class="event-detail-info">
      <header class="padding-bottom: 48px;">
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
        @if($registered)
          <p class="small event-registered">
            <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-right: 12px; height: 16px; width: 16px; display: block; fill: currentColor;"><path d="m17 9c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8 8-3.58 8-8m1 0c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9m-9-5.25c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25m0 4.25c.55 0 1 .45 1 1v5c0 .55-.45 1-1 1s-1-.45-1-1v-5c0-.55.45-1 1-1" fill-rule="evenodd"></path></svg>
            You're already registered to this event.
          </p>
          <button class="button button--large secondary stretch cancel-event-registration" data-user="1">Cancel Registration</button>
        @else
          <button class="button button--large primary stretch join-event" data-user="1">Join Event</button>
        @endif
      </ul>
    </section>

    <section class="event-detail-description">

      <section class="event-detail-info-mobile">
        <header style="padding-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,.12); margin-bottom: 32px;">
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

      <p class="event-detail-subtitle subtitle-wide" style="font-weight: 500;">{{ $event['subtitle'] }}</p>

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
          <div class="event-action-container">
            @if($registered)
            <button class="button secondary button--large cancel-event-registration" data-user="1" style="margin-right: 24px;">Cancel Registration</button>
            <p class="small event-registered event-registered--desktop">
              <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-right: 8px; height: 16px; width: 16px; display: block; fill: currentColor;"><path d="m17 9c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8 8-3.58 8-8m1 0c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9m-9-5.25c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25m0 4.25c.55 0 1 .45 1 1v5c0 .55-.45 1-1 1s-1-.45-1-1v-5c0-.55.45-1 1-1" fill-rule="evenodd"></path></svg>
              You're already registered to this event.
            </p>
            @else
            <button class="button primary button--large join-event" data-user="1" style="margin-right: 24px;">Join Event</button>
            @endif
          </div>
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