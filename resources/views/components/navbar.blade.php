@php
  $primary_menus = [
    (object) [
      'name' => 'Home',
      'to' => '/',
    ],
    (object) [
      'name' => 'Articles',
      'to' => '/articles',
    ],
    (object) [
      'name' => 'Events',
      'to' => '/events',
    ],
    (object) [
      'name' => 'Gallery',
      'to' => '/gallery',
    ],
  ];

  $secondary_menus = [
    // (object) [
    //     'name' => 'Sign In',
    //     'to' => '/sign-in',
    // ],
    (object) [
      'class' => '',
      'name' => 'Profile',
      'to' => '/profile/1',
    ],
    (object) [
      'class' => '',
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

<nav class="main-navbar navbar">
  <div class="navbar-wrapper navbar-web">
    <ul class="navbar-primary inline--ll">
      <li class="brand-wrapper">
        <a href="/" style="display: block;">
          @include('icons.pmm')
        </a>
      </li>
      @foreach ($primary_menus as $menu)
        @component('components.menu-web', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
        @endcomponent
      @endforeach
    </ul>
    <ul class="navbar-secondary inline--ml">
      <li class="primary-menu-wrapper">
        <a href="/articles/create/1" class="button button--small primary no-pre">
          Add Points
        </a>
      </li>
      <li class="primary-menu-wrapper" style="padding-left: 14px; padding-right: 14px;">
        <div class="custom-dropdown-wrapper">
          <button class="custom-dropdown-trigger current-user-wrapper">
            <img class="current-user-profile-photo" src="/images/users/default.png" alt="user currently login">
          </button>
          <ul class="custom-dropdown-menu-wrapper popout">
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