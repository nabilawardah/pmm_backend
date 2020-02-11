@php
    $primary_menus = [
      (object) [
        'name' => 'Articles',
        'to' => '/admin/articles',
      ],
      (object) [
        'name' => 'Events',
        'to' => '/admin/events',
      ],
      (object) [
        'name' => 'Gallery',
        'to' => '/admin/gallery',
      ],
      (object) [
        'name' => 'Users',
        'to' => '/admin/users',
      ],
  ];

  $secondary_menus = [
      (object) [
      'class' => '',
      'name' => 'Profile',
      'to' => '/profile/1',
    ],
    (object) [
      'class' => 'no-pre',
      'name' => 'Sign out',
      'to' => '/sign-out',
    ],
  ];
@endphp

<nav class="main-navbar navbar">
  <div class="navbar-wrapper navbar-admin">
    <ul class="navbar-primary inline--ll">
      <li class="brand-wrapper brand-admin">
        <a href="/">
          @include('icons.pmm')
        </a>
      </li>
      @foreach ($primary_menus as $menu)
        @component('components.menu-admin', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
        @endcomponent
      @endforeach
    </ul>
    <ul class="navbar-secondary inline--ml">
      @component('components.menu-admin', ['name' => 'Go to PMM', 'to' => '/', 'active' => false])
      @endcomponent
      <li class="primary-menu-wrapper" style="padding-left: 14px; padding-right: 14px;">
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
      </li>
    </ul>
  </div>
</nav>