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
      // (object) [
      //     'name' => 'Sign Out',
      //     'to' => '/logout',
      // ],
      (object) [
          'name' => 'Back to PMM',
          'to' => '/',
      ],
  ];
@endphp

<nav class="main-navbar navbar">
  <div class="navbar-wrapper">
    <ul class="navbar-primary inline--ll">
      <li class="brand-wrapper">
        @include('icons.pmm')
      </li>
      @foreach ($primary_menus as $menu)
        @component('components.menu-admin', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
        @endcomponent
      @endforeach
    </ul>
    <ul class="navbar-secondary inline--ll">
      @foreach ($secondary_menus as $menu)
          @component('components.menu-admin', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
        @endcomponent
      @endforeach
    </ul>
  </div>
</nav>