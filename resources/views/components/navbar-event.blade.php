@php
  $secondary_menus = [
    (object) [
      'class' => '',
      'name' => 'Profile',
      'to' => '/profile/1',
    ],
    (object) [
        'name' => 'Go to Admin',
        'to' => '/admin/articles',
    ],
    (object) [
      'class' => 'no-pre',
      'name' => 'Sign out',
      'to' => '/sign-out',
    ],
  ];
@endphp

<nav class="main-navbar navbar-focus navbar" style="box-shadow: inset 0px -1px 0px 0px rgba(0,0,0,.12);">
  <div class="navbar-wrapper navbar-web">
    <ul class="navbar-primary inline--ml">
      <li class="brand-wrapper">
        <a href="/" style="display: block;">
          @include('icons.pmm')
        </a>
      </li>
      <div class="separator-vertical"></div>
      <a href="/events" style="display: inline-flex; align-items: center; justify-content: flex-start;">
        <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-right: 8px; height: 1em; width: 1em; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
        Back to Events
      </a>
    </ul>

    <ul class="navbar-secondary">

      @isset($show_publish)
        @if($show_publish)
          <button class="button button--small primary publish-event" style="margin-right:20px;">Save & Publish</button>
        @endif
      @endisset
      @isset($show_edit)
        @if($show_edit)
          <a href="/admin/events/{{ $event['admin'] }}/edit/{{ $event['id'] }}" class="no-pre button button--small default edit-event" style="margin-right:20px;">Edit Event</a>
        @endif
      @endisset

      <button style="margin-right:24px;" class="button button--small secondary ghost confirm-delete">Delete</button>

      <div class="separator-vertical" style="margin-right: 8px;"></div>
      <div class="primary-menu-wrapper" style="padding-left: 14px; padding-right: 14px;">
        <div class="custom-dropdown-wrapper">
          <button class="custom-dropdown-trigger">
            <div class="current-user-wrapper">
              <img class="current-user-profile-photo" src="/images/users/default.png" alt="user currently login">
            </div>
          </button>
          <ul class="hidden custom-dropdown-menu-wrapper popout" style="display: none;">
            @foreach ($secondary_menus as $menu)
              <li class="custom-dropdown-menu-item">
                <a class="custom-dropdown-menu heading6 {{ $menu->class ?? '' }} " href="{{ $menu->to }}">{{ $menu->name }}</a>
              </li>
            @endforeach
          </ul>
        </div>
      </div>

    </ul>

  </div>
</nav>