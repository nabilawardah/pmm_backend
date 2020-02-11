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

<nav class="main-navbar navbar-focus navbar">
  <div class="navbar-wrapper navbar-admin">
    <ul class="navbar-primary inline--ml">
      <li class="brand-wrapper">
        <a href="/">
          @include('icons.pmm')
        </a>
      </li>
      <div class="separator-vertical"></div>
      <p class="heading6" style="padding-top: 16px; padding-bottom: 16px; line-height: 24px;">{{ $title ?? '' }}</p>
    </ul>
    <ul class="navbar-secondary inline--ml">
      <button class="button button--small primary {{ $action_class ?? '' }}">{{ $action_label ?? 'Publish' }}</button>
      <div class="separator-vertical"></div>
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
    </ul>
  </div>
</nav>