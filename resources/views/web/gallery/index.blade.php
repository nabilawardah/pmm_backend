@extends('layouts.web-provider')

@section('title', 'Gallery')

@section('content')

@include('components.navbar')

@component('layouts.main-content', ['width' => 'default'])

  <style>
    .lazy {
      display: block;
      border: 0;
      opacity: 0;
    }
    .lazy:not(.initial) {
      transition: opacity 1s;
    }
    .lazy.initial,
    .lazy.loaded,
    .lazy.error {
      opacity: 1;
    }

    .lazy:not([src]) {
      visibility: hidden;
    }
  </style>

  <header style="margin-bottom: 64px;">
    <h1 class="heading1">Gallery</h1>
  </header>

  <ul class="gallery-container">
    @foreach ($gallery as $item)
      @if ($item['attribute']['type'] === 'image' && $item['attribute']['origin'] === 'local')
        <li class="gallery-item item-image-wrapper">
          <picture class="gallery-item-image-outer">
            <img class="lazy gallery-item-image" data-src="{{ '/galleries/'.$item['attribute']['src'] }}" alt="{{ $item['alt'] }}">
            <div class="gallery-item-caption">
              <p class="heading5" style="color: #FFFFFF;">{{ $item['name'] }}</p>
              <span style="color: rgba(255,255,255,.80)" class="small">{{ $item['caption'] }}</span>
            </div>
          </picture>
        </li>
      @elseif( $item['attribute']['type'] === 'image' && $item['attribute']['origin'] === 'external' )
        <li class="gallery-item item-image-wrapper">
          <picture class="gallery-item-image-outer">
            <img class="lazy gallery-item-image" data-src="{{ $item['attribute']['src'] }}" alt="{{ $item['alt'] }}">
            <div class="gallery-item-caption">
              <p class="heading5" style="color: #FFFFFF; margin-bottom: 4px;">{{ $item['name'] }}</p>
              <span style="color: rgba(255,255,255,.80);" class="small">{{ $item['caption'] }}</span>
            </div>
          </picture>
        </li>
      @elseif( $item['attribute']['type'] === 'video' && $item['attribute']['origin'] === 'local' )
        <li class="gallery-item item-video-wrapper">
          <picture class="gallery-item-image-outer" data-alt="{{ $item['alt'] }}">
            <img class="lazy gallery-item-image" data-src="{{ '/galleries/'.$item['attribute']['thumbnail'] }}" alt="{{ $item['alt'] }}">
            <div class="gallery-item-caption">
              <p class="heading5" style="color: #FFFFFF;">{{ $item['name'] }}</p>
              <span style="color: rgba(255,255,255,.80);" class="small">{{ $item['caption'] }}</span>
            </div>
            <div class="gallery-item-play-icon-container">
              <svg class="gallery-item-play-icon" viewBox="0 0 496 496" xmlns="http://www.w3.org/2000/svg" role="img">
                <path d="M248,0 C111,0 0,111 0,248 C0,385 111,496 248,496 C385,496 496,385 496,248 C496,111 385,0 248,0 Z" fill="currentColor"></path>
                <path d="M369.7,272 L193.7,373 C177.9,381.8 158,370.5 158,352 L158,144 C158,125.6 177.8,114.2 193.7,123 L369.7,230 C386.1,239.2 386.1,262.9 369.7,272 Z" class="play-icon-filler" fill="#FFFFFF"></path>
              </svg>
            </div>
          </picture>
        </li>
      @elseif( $item['attribute']['type'] === 'video' && $item['attribute']['origin'] === 'external' )
        <li class="gallery-item item-video-external-wrapper">
          <iframe class="gallery-item-video lazy" data-src="{{ $item['attribute']['src'] }}" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </li>
      @endif
    @endforeach
  </ul>
@endcomponent

@include('components.footer')

@endsection