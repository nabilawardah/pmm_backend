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
        <img class="profile-photo lazyload blur-up" src="{{ asset('/images/lqip.jpg')}}" data-src="{{asset('/images/users/ongki.jpg')}}" alt="Ongki Herlambang">
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
      <button class="button button--medium default edit-profile">Edit Profile</button>
    </section>
    <section class="profile-achievment">
      <h2 class="heading4 profile-user-achievment">
        You've achieved <span class="point-counts">24</span> points.
      </h2>
      <span class="profile-all-achievment">out of total 120 points achieved by all PMM users.</span>
      <a href="/articles/create/1" class="button button--large primary no-pre">Add Points</a>
    </section>

  @endcomponent

  <main class="modal none">
    <div class="modal-main-area">
      <nav class="modal-nav">
        <button type="button" class="close-modal button-close--rounded">
          <div class="modal-close-icon"></div>
          <div class="modal-close-text">esc</div>
        </button>
      </nav>
      <div class="modal-wrapper container-post">
        <h1 class="heading1" style="margin-bottom: 48px;">User Profile</h1>
        <main class="edit-profile-wrapper">

          {{-- User Info Section --}}
          <div class="edit-profile-info">
            <input type="hidden" name="id" id="user-id" value="{{$user->id}}" />

            @component('components.input-field',
              ['data' => (object)[
                  'label' => 'Full name',
                  'type' => 'text',
                  'name' => 'name',
                  'id' => 'user-fullname',
                  'value' => $user->name,
                  'initial' => $user->name,
                  'placeholder' => "What's your name?",
                  ]
              ])
            @endcomponent

            {{-- Field Email --}}
            @component('components.input-field',
              ['data' => (object)[
                  'label' => 'Email',
                  'type' => 'email',
                  'name' => 'email',
                  'id' => 'user-email',
                  'value' => $user->email,
                  'initial' => $user->email,
                  'placeholder' => 'Enter your email address',
                  ]
              ])
            @endcomponent

            @component('components.input-field', [
              'data' => (object)[
                'label' => 'Phone number',
                'type' => 'text',
                'name' => 'phone',
                'id' => 'user-phone',
                'value' => $user->phone,
                'initial' => $user->phone,
                'placeholder' => 'Enter your phone number',
              ]
            ])
            @endcomponent

            @component('components.input-dropdown', [
              'data' => (object)[
                  'label' => 'Divisi',
                  'name' => 'division',
                  'id' => 'user-division',
                  'value' => $user->divisi,
                  'initial' => $user->divisi,
                  'placeholder' => 'Select your division',
                ],
              'options' => $all_division ?? []
            ])
            @endcomponent

            @component('components.input-dropdown', [
              'data' => (object)[
                  'label' => 'Working area',
                  'name' => 'working_area',
                  'id' => 'user-working_area',
                  'value' => $user->working_area,
                  'initial' => $user->working_area,
                  'placeholder' => 'Select your working area',
                ],
              'options' => $all_working_area ?? []
            ])
            @endcomponent

          </div>

          {{-- Profile Photo Section --}}
          <div class="edit-profile-side">
            @component('components.profile-photo-container', [
              'data' => (object) [
                'label' =>'Profile photo',
                'src' => $user->photo,
              ]
            ])
            @endcomponent
          </div>

        </main>

        {{-- User Role --}}
        <section class="edit-profile-role-wrapper">
          <h2 class="heading3" style="margin-bottom: 12px;">Account Role</h2>
          <div class="edit-profile-role">
            @if ($user->role === 'admin')
              <div class="edit-profile-role-icon">
                <img src="/icons/admin.svg" />
              </div>
              <p class="heading4" style="margin-bottom: 4px;">
                This account has an admin privilege.
              </p>
              <p class="medium" style="margin-bottom: 12px;">
                An admin can manage all contents (articles, events, and galleries) and change users role.
              </p>
              <button data-id="{{ $user->id }}" data-current="admin" class="button button--medium primary change-user-role">Downgrade to Regular User</button>
            @else
              <div class="edit-profile-role-icon">
                <img src="/icons/user.svg" />
              </div>
              <p class="heading4" style="margin-bottom: 4px;">
                This is a regular user account.
              </p>
              <p class="medium" style="margin-bottom: 12px;">
                A regular account can only publish and manage it's own articles and profile info.
              </p>
              <button data-id="{{ $user->id }}" data-current="user" class="button button--medium primary change-user-role">Upgrade to Admin</button>
            @endif
          </div>
        </section>

        {{-- Modal Footer --}}
        <div class="modal-action-wrapper">
          <footer class="modal-action-bar container-post">
            <button class="button button--large primary save-change">Save Changes</button>
            <button class="button button--large default close-modal">Cancel</button>
          </footer>
        </div>

      </div>
    </div>

    {{-- Photo Uploader --}}
    <div class="modal-secondary-area">
      <div class="container-post modal-secondary-wrapper">
        <div class="modal-secondary-area">
          <main class="modal-secondary-main-wrapper">
            <div class="preview-photo-container" style="background-image: url('/images/users/default.png')"></div>
          </main>
          <div class="modal-secondary-sidebar">
            <header class="modal-secondary-header">
              <button type="button" class="close-secondary-modal" style="margin-bottom: 24px">
                <div class="modal-arrow-icon">
                  <svg style="transform: rotate(180deg);" class="arrow-right" xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 1000 1000"><path fill="currentColor" d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z"></path></svg>
                </div>
                <span class="modal-arrow-text">Back</span>
              </button>
              <h1 class="heading2">Preview Photo</h1>
            </header>
            <footer class="modal-secondary-action">
              <button class="button button--large primary save-photo stretch" style="margin-bottom: 12px">Save Photo</button>
              <button class="button button--large default try-another-photo stretch">Try Another Photo</button>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <input type="file" class="photo-upload-container" />
  </main>

  @include('components.footer')

@endsection