{{-- @php
  dd(json_encode($user))
@endphp --}}

@extends('layouts.web-provider')

@section('title', 'Ongki Herlambang')

@section('content')

  @include('components.navbar')

  @component('layouts.main-content', ['class' => 'profile-page'])
    <section class="card align--center profile-wrapper">
      <textarea class="hidden">
        {{ json_encode($user) }}
      </textarea>
      <div class="profile-info-photo-container">
        <img class="profile-photo lazy blur-up" src="{{ asset('/images/lqip.jpg')}}" data-src="{{asset('/images/users/ongki.jpg')}}" alt="Ongki Herlambang">
        @if ($user->role === 'admin')
          <span class="profile-badge">admin</span>
        @endif
      </div>
      <div class="profile-info-wrapper">
        <header class="profile-info-header">
        <h1 class="heading3 profile-name">{{ $user->name }}</h1>
          <dl class="info-work">
            <dd class="medium">{{ $user->divisi }}</dd>
            <span class="separator"></span>
          <dd class="medium">{{ $user->working_area }}</dd>
          </dl>
        </header>
        <dl class="info--contact">
          <dt class="info--stack large">
            <a href="mailto:ongki@herlambang.design"  class="profile-info">
              <span class="contact-icon">@include('icons.mail')</span>
              <span class="contact-value">{{ $user->email }}</span>
            </a>
          </dt>
          <dt class="info--stack large">
            <a href="tel:+6282377298989" class="profile-info">
              <span class="contact-icon">@include('icons.call')</span>
              <span class="contact-value">{{ $user->phone }}</span>
            </a>
          </dt>
        </dl>
      </div>
      <a href="/profile/edit/1" class="button button--medium default edit-profile">Edit Profile</a>
    </section>
    <section class="profile-achievment">
      {{-- PLANT ANIMATION CONTAINER --}}
      <div id="plant-container" style="width: 320px; height: 320px;"></div>
      <input id="user-points-counts" type="hidden" value="{{ $user->points ?? 0 }}">
      <h2 class="heading4 profile-user-achievment">
        You've achieved <span class="point-counts">{{ $user->points ?? 0 }}</span> points.
      </h2>
      <span class="profile-all-achievment">out of total {{ $total_points ?? 0 }} points achieved by all PMM users.</span>
      <a href="/articles/create/1" class="button button--large primary no-pre">Add Points</a>
    </section>

  @endcomponent


  @include('components.footer')

@endsection