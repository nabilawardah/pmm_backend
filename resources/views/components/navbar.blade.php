@php
    $menus = [
      (object)[
        'name' => 'Home',
        'to' => '/',
        'active' => false,
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
    ]
@endphp

<nav class="navbar">
  <ul class="navbar-primary">
    @foreach ($menus as $menu)
      @component('components.web-menu', ['name' => $menu->name, 'to' => $menu->to])
      @endcomponent
    @endforeach
  </ul>
  <ul class="navbar-secondary">
    <li>Sign in</li>
  </ul>
</nav>