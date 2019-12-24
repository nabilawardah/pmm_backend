@php
    $primary_menus = [
      (object) [
        'name' => 'Home',
        'to' => '/',
        'active' => true,
      ],
      (object) [
        'name' => 'Profile',
        'to' => '/profile',
        'active' => false,
      ],
      (object) [
        'name' => 'Articles',
        'to' => '/articles',
        'active' => false,
      ],
      (object) [
        'name' => 'Events',
        'to' => '/events',
        'active' => false,
      ],
      (object) [
        'name' => 'Gallery',
        'to' => '/gallery',
        'active' => false,
      ],
];

$admin_menus = [
      (object) [
        'name' => 'Home',
        'to' => '/admin',
        'active' => true,
      ],
      (object) [
        'name' => 'Users',
        'to' => '/admin/users',
        'active' => false,
      ],
      (object) [
        'name' => 'Articles',
        'to' => '/admin/articles',
        'active' => false,
      ],
      (object) [
        'name' => 'Events',
        'to' => '/admin/events',
        'active' => false,
      ],
      (object) [
        'name' => 'Gallery',
        'to' => '/admin/gallery',
        'active' => false,
      ],
  ];

  $secondary_menus = [
      (object) [
          'name' => 'Sign In',
          'to' => '/sign-in',
          'active' => false,
      ],
      (object) [
          'name' => 'Go to Admin',
          'to' => '/admin',
          'active' => false,
      ],
  ];

  $admin_secondary_menus = [
      (object) [
          'name' => 'Sign In',
          'to' => '/sign-in',
          'active' => false,
      ],
      (object) [
          'name' => 'Go to Website',
          'to' => '/',
          'active' => false,
      ],
  ];
@endphp

<nav class="navbar">
  <div class="navbar-wrapper">
    <ul class="navbar-primary inline--ll">
      <li class="brand-wrapper">
        @include('icons.h')
      </li>
      @foreach ($primary_menus as $menu)
        @component('components.menu-web', ['name' => $menu->name, 'to' => $menu->to, 'active' => $menu->active])
        @endcomponent
      @endforeach
    </ul>
    <ul class="navbar-secondary inline--ll">
      @foreach ($secondary_menus as $menu)
          @component('components.menu-web', ['name' => $menu->name, 'to' => $menu->to, 'active' => $menu->active])
        @endcomponent
      @endforeach
    </ul>
  </div>
</nav>