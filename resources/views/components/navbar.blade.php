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
  </div>
</nav>