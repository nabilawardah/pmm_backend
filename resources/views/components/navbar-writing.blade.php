@php

  $secondary_menus = [
      (object) [
          'name' => 'Sign Out',
          'to' => '/logout',
          'active' => false,
      ],
  ];
@endphp

<nav class="main-navbar navbar-focus navbar">
  <div class="navbar-wrapper">
    <ul class="navbar-primary inline--ll">
      <li class="brand-wrapper">
        @include('icons.pmm')
      </li>
      <p class="heading5">Write Article</p>
    </ul>
    <ul class="navbar-secondary inline--l">
      <button class="button button--small primary publish-article">Submit Article</button>
      <div class="navbar-profile">
        <div class="navbar-profile-photo" style="background-image: url('/images/users/ongki.jpg')"></div>
      </div>
      {{-- @foreach ($secondary_menus as $menu)
          @component('components.menu-admin', ['name' => $menu->name, 'to' => $menu->to, 'active' => $menu->active])
        @endcomponent
      @endforeach --}}
    </ul>
  </div>
</nav>