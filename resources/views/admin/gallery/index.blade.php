@extends('layouts.admin-provider')

@section('title', 'Gallery')

@section('content')

@include('components.navbar-admin')

@include('components.add-new-album')
@include('components.add-new-gallery-item')

@component('layouts.main-content', ['width' => 'narrow'])

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

  <header class="admin-table-header" style="z-index: 99;">
    <h1 class="heading1 page-title">Gallery</h1>
    <input type="hidden" id="user-id" class="hidden" value="1" />

    <div style="flex: auto; display: flex; justify-content: flex-end;">
      <button style="margin-right: 8px;" class="button button--medium primary add-new-gallery-item">Add Photo/Video</button>
    </div>

  </header>

  <ul class="gallery-container">
    @foreach ($gallery as $key=>$item)
      @if ($item['attribute']['type'] === 'image' && $item['attribute']['origin'] === 'local')
        <li class="gallery-item item-image-wrapper" data-index="{{ $key }}">
          <picture class="gallery-item-image-outer">
            <img class="lazy gallery-item-image" data-src="{{ '/galleries/'.$item['attribute']['src'] }}" alt="{{ $item['caption'] ?? '' }}">
            <div class="gallery-item-caption">
              <span style="color: rgba(255,255,255,.80)" class="small">{{ $item['caption'] ?? '' }}</span>
            </div>
          </picture>
        </li>
      @elseif( $item['attribute']['type'] === 'image' && $item['attribute']['origin'] === 'external' )
        <li class="gallery-item item-image-wrapper" data-index="{{ $key }}">
          <picture class="gallery-item-image-outer">
            <img class="lazy gallery-item-image" data-src="{{ $item['attribute']['src'] }}" alt="{{ $item['caption'] ?? '' }}">
            <div class="gallery-item-caption">
              <span style="color: rgba(255,255,255,.80);" class="small">{{ $item['caption'] ?? '' }}</span>
            </div>
          </picture>
        </li>
      @elseif( $item['attribute']['type'] === 'video' && $item['attribute']['origin'] === 'local' )
        <li class="gallery-item item-video-wrapper" data-index="{{ $key }}">
          <picture class="gallery-item-image-outer" data-alt="{{ $item['caption'] ?? '' }}">
            <img class="lazy gallery-item-image" data-src="{{ '/galleries/'.$item['attribute']['thumbnail'] }}" alt="{{ $item['caption'] ?? '' }}">
            <div class="gallery-item-caption">
              <span style="color: rgba(255,255,255,.80);" class="small">{{ $item['caption'] ?? '' }}</span>
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
        <li class="gallery-item item-video-external-wrapper" data-index="{{ $key }}">
          <iframe class="gallery-item-video lazy" data-src="{{ $item['attribute']['src'] }}" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </li>
      @endif
    @endforeach
  </ul>

  <div class="slick-fullscreen-wrapper" style="display: none;">
    <button type="button" class="slick-close" aria-label="close">Close</button>
    <button class="slick-prev slick-arrow" aria-label="Previous" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="12" height="12" role="presentation" aria-hidden="true" focusable="false" style="display:block; margin-left: -3px;"><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path></svg>
    </button>
    <button class="slick-next slick-arrow" aria-label="Next" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="12" height="12" role="presentation" aria-hidden="true" focusable="false" style="display:block; margin-right: -3px;"><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path></svg>
    </button>
    <ul class="slick-fullscreen">
      @foreach ($gallery as $slick_key=>$item)
        @if ($item['attribute']['type'] === 'image' && $item['attribute']['origin'] === 'local')
          <li class="slick-item-container" data-index="{{ $slick_key }}">
            <img class="slick-item slick-image" data-lazy="{{ '/galleries/'.$item['attribute']['src'] }}" alt="{{ $item['caption'] ?? '' }}">
            <footer class="slick-caption-wrapper">
            <p class="medium slick-caption" style="color: #FFFFFF" >
              {{ $item['caption'] ?? '' }}
            </p>
            </footer>
          </li>
        @elseif( $item['attribute']['type'] === 'image' && $item['attribute']['origin'] === 'external' )
          <li class="slick-item-container" data-index="{{ $slick_key }}">
            <img class="slick-item slick-image" data-lazy="{{ $item['attribute']['src'] }}" alt="{{ $item['caption'] ?? '' }}">
            <footer class="slick-caption-wrapper">
              <p class="medium slick-caption" style="color: #FFFFFF" >
                {{ $item['caption'] ?? '' }}
              </p>
            </footer>
          </li>
        @elseif( $item['attribute']['type'] === 'video' && $item['attribute']['origin'] === 'local' )
          <li class="slick-item-container" data-index="{{ $slick_key }}">
            <video class="slick-item slick-video" loop="true" data-poster="{{ '/galleries/'.$item['attribute']['thumbnail'] }}" controls="true" alt="{{ $item['caption'] ?? '' }}">
              <source data-lazy="{{ '/galleries/'.$item['attribute']['src'] }}" type="{{ $item['attribute']['filetype'] }}" />
            </video>
            <footer class="slick-caption-wrapper">
            <p class="medium slick-caption" style="color: #FFFFFF" >
              {{ $item['caption'] ?? '' }}
            </p>
            </footer>
          </li>
        @elseif( $item['attribute']['type'] === 'video' && $item['attribute']['origin'] === 'external' )
          <li class="slick-item-container" data-index="{{ $slick_key }}">
            <iframe class="slick-item slick-iframe" width="100%" src="{{ $item['attribute']['src'] }}" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </li>
        @endif
      @endforeach
    </ul>
  </div>

@endcomponent

@include('components.footer')

@endsection