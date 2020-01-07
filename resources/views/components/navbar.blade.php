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

$admin_menus = [
      (object) [
        'name' => 'Home',
        'to' => '/admin',
      ],
      (object) [
        'name' => 'Users',
        'to' => '/admin/users',
      ],
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
  ];

  $secondary_menus = [
      (object) [
          'name' => 'Sign In',
          'to' => '/sign-in',
      ],
      (object) [
          'name' => 'Go to Admin',
          'to' => '/admin/articles',
      ],
  ];

  $admin_secondary_menus = [
      (object) [
          'name' => 'Sign In',
          'to' => '/sign-in',
      ],
      (object) [
          'name' => 'Go to Website',
          'to' => '/',
      ],
  ];
@endphp

<nav class="main-navbar navbar">
  <div class="navbar-wrapper">
    <ul class="navbar-primary inline--ll">
      <li class="brand-wrapper">
        <a href="/">
          @include('icons.pmm')
        </a>
      </li>
      @foreach ($primary_menus as $menu)
        @component('components.menu-web', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
        @endcomponent
      @endforeach
    </ul>
    <ul class="navbar-secondary inline--ll">
      @foreach ($secondary_menus as $menu)
          @component('components.menu-web', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
        @endcomponent
      @endforeach
    </ul>
  </div>
</nav>