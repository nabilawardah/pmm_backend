@php
    $menus = [
      (object)[
        'name' => 'Home',
        'to' => '/',
        'active' => true,
      ],
      (object)[
        'name' => 'Profile',
        'to' => '/profile',
        'active' => false,
      ],
      (object)[
        'name' => 'Articles',
        'to' => '/articles',
        'active' => false,
      ],
      (object)[
        'name' => 'Events',
        'to' => '/events',
        'active' => false,
      ],
      (object)[
        'name' => 'Gallery',
        'to' => '/gallery',
        'active' => false,
      ],
];

    $secondary_menus = [
      (object)[
        'name' => 'Sign In',
        'to' => '/sign-in',
        'active' => false,
      ],
      (object)[
        'name' => 'Go to Admin',
        'to' => '/admin',
        'active' => false,
      ],
    ]
@endphp

<nav class="navbar">
  <div class="navbar-wrapper">
    <ul class="navbar-primary inline--ll">
      @foreach ($menus as $menu)
        @component('components.web-menu', ['name' => $menu->name, 'to' => $menu->to, 'active' => $menu->active])
        @endcomponent
      @endforeach
    </ul>
    <ul class="navbar-secondary inline--ll">
      @foreach ($secondary_menus as $menu)
          @component('components.web-menu', ['name' => $menu->name, 'to' => $menu->to, 'active' => $menu->active])
        @endcomponent
      @endforeach
    </ul>
  </div>
</nav>