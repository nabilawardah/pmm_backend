@php
  $menu_classes = $active === $name ? 'primary-menu active' : 'primary-menu'
@endphp

<li class="primary-menu-wrapper">
  <a class="{{$menu_classes}}" href="{{ $to }}">
    {{ $name }}
  </a>
</li>