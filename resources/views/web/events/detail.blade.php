@extends('layouts.web-provider')

<style>
  div#main-content {
    padding: 0;
  }
</style>

@section('title', $event['title'])

@section('content')

@component('layouts.main-content', ['width' => 'bleed'])
  <main class="event-detail-outer-wrapper">
    <section class="event-detail-info">
      <header class="padding-bottom: 48px;">
        <a href="/events" style="display: block; margin-bottom: 24px">Back</a>
        <h1 class="heading2" style="margin-bottom: 24px;">{{ $event['title'] }}</h1>
      </header>
      <ul class="event-detail-info-list-container">
        <li class="event-detail-info-list-item">
          <span class="event-detail-info-list-item-icon">
            @include('icons.time')
          </span>
          <span class="event-detail-info-list-item-detail">
            <p class="heading5" style="margin-bottom: 2px">{{ $event['date']['formatted_date'] }}</p>
            <p class="heading5" style="margin-bottom: 8px">{{ $event['date']['formatted_time'] }}</p>
            {{-- <p class="heading5">{{ date('F d, Y, h:i A', strtotime($event['date']['start'])) }}</p> --}}
            {{-- <p class="heading5">{{ date('F d, Y, h:i A', strtotime($event['date']['end'])) }}</p> --}}
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
      <p class="event-detail-subtitle">{{ $event['subtitle'] }}</p>
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
      @for ($i = 0; $i < 12; $i++)
        <p style="margin-bottom: 24px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto debitis labore, delectus molestiae provident iure, placeat cupiditate unde ipsam quae repudiandae! Delectus ipsa harum ipsam, veniam quaerat magni provident non!</p>
      @endfor
    </section>
    <aside class="event-detail-aside">
      <picture class="event-detail-poster-wrapper">
        <img class="event-detail-poster" width="100%" src="/media/user-{{ $event['admin'] }}/{{ $event['poster'] }}" alt="{{ $event['title'] }}">
      </picture>
    </aside>
  </main>
@endcomponent

@endsection