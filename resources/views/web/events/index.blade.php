@extends('layouts.web-provider')

@section('title', 'Events')

@section('content')

@include('components.navbar')

@component('layouts.main-content', ['width' => 'narrow'])
  <section class="event-list-outer-wrapper">
    <header class="event-list-outer-header">
      <h1 class="display3">Events</h1>
      <p class="heading4" style="color: #767676;">All the exciting and fun events available for you to join in!</p>
    </header>
    <main class="event-list-outer-grid">
      <ul class="event-list-container">
        @foreach ($events as $event)
        <a class="event-list-item-wrapper" href="/events/{{ $event['id'] }}">
          <article class="event-list-item">
            <picture class="event-list-poster-wrapper">
              <img class="event-list-poster" width="100%" src="/media/user-{{ $event['admin'] }}/{{ $event['poster'] }}" alt="{{ $event['title'] }}">
            </picture>
            <p class="heading5 event-list-info" style="color: rgba(0, 153, 204, 1);">{{ date('F d, Y', strtotime($event['date']['start_date'])) }}, {{ $event['date']['start_time'] }}</p>
            <h1 class="heading3 event-list-title">{{ $event['title'] }}</h1>
            <p class="small event-list-subtitle">{{ $event['subtitle'] }}</p>
            <footer class="event-list-footer heading6">
              {{ $event['venue']['name'] }}
              {{-- <span style="margin-left: 4px; margin-right: 4px;">•</span> --}}
            </footer>
          </article>
        </a>
        @endforeach
      </ul>
    </main>
  </section>

@endcomponent

@include('components.footer')

@endsection