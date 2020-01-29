@php
  $primary_menus = [
    (object) [
      'name' => 'Home',
      'to' => '/',
    ],
    (object) [
      'name' => 'Profile',
      'to' => '/profile/1',
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
      'name' => 'Go to Admin',
      'to' => '/admin/articles',
    ],
  ];
@endphp

<nav class="main-navbar navbar">
  <a href="/" class="brand-wrapper" style="margin-right: 64px;">
    @include('icons.pmm')
  </a>
  <div class="navbar-wrapper navbar-web">
    <ul class="navbar-primary inline--ll">
      @foreach ($primary_menus as $menu)
        @component('components.menu-web', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
        @endcomponent
      @endforeach
    </ul>
  </div>
  <ul class="navbar-secondary inline--ll">
    <li class="primary-menu-wrapper">
      <a href="/articles/create/1" class="button button--small primary no-pre">
        Add Points
      </a>
    </li>
    @foreach ($secondary_menus as $menu)
      @component('components.menu-web', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
      @endcomponent
    @endforeach
  </ul>
</nav>