@php
    $primary_menus = [
      (object) [
        'name' => 'Articles',
        'to' => '/admin/articles',
        'active' => true,
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
      (object) [
        'name' => 'Users',
        'to' => '/admin/users',
        'active' => false,
      ],
  ];

  $secondary_menus = [
      (object) [
          'name' => 'Sign Out',
          'to' => '/logout',
          'active' => false,
      ],
      (object) [
          'name' => 'Back to PMM',
          'to' => '/',
          'active' => false,
      ],
  ];
@endphp

<nav class="navbar">
  <div class="navbar-wrapper">
    <ul class="navbar-primary inline--ll">
      @foreach ($primary_menus as $menu)
        @component('components.menu-admin', ['name' => $menu->name, 'to' => $menu->to, 'active' => $menu->active])
        @endcomponent
      @endforeach
    </ul>
    <ul class="navbar-secondary inline--ll">
      @foreach ($secondary_menus as $menu)
          @component('components.menu-admin', ['name' => $menu->name, 'to' => $menu->to, 'active' => $menu->active])
        @endcomponent
      @endforeach
    </ul>
  </div>
</nav>