<div class="container-{{ isset($width) ? $width : 'narrow' }} main-content {{ isset($class) ? $class : '' }}">
  {{ $slot }}
</div>