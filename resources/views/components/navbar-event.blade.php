<nav class="main-navbar navbar-focus navbar">
  <div class="navbar-wrapper">
    <ul class="navbar-primary inline--ll">
      <li class="brand-wrapper">
        <a href="/">
          @include('icons.pmm')
        </a>
      </li>
      {{-- <button class="button ghost default">Back</button> --}}
      {{-- <p class="heading6" style="padding-top: 16px; padding-bottom: 16px; line-height: 24px;">{{ $title ?? '' }}</p> --}}
    </ul>
    <ul class="navbar-secondary inline--l">
      <button class="button button--small primary {{ $action_class ?? '' }}">{{ $action_label ?? 'Publish' }}</button>
      <div class="navbar-profile">
        <div class="navbar-profile-photo" style="background-image: url('/images/users/ongki.jpg')"></div>
      </div>
      {{-- @foreach ($secondary_menus as $menu)
        @component('components.menu-admin', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
        @endcomponent
      @endforeach --}}
    </ul>
  </div>
</nav>