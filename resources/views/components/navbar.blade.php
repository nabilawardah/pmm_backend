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
    ]
@endphp

<nav class="navbar">
  <ul class="navbar-primary box-inline--l">
    @foreach ($menus as $menu)
      @component('components.web-menu', ['name' => $menu->name, 'to' => $menu->to, 'active' => $menu->active])
      @endcomponent
    @endforeach
  </ul>
  <ul class="navbar-secondary">
    <li>Sign in</li>
  </ul>
</nav>