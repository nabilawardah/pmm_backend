@php
  $secondary_menus = [
    (object) [
      'class' => '',
      'name' => 'Profile',
      'to' => '/profile/1',
    ],
    (object) [
        'name' => 'Go to Admin',
        'to' => '/admin/articles',
    ],
    (object) [
      'class' => 'no-pre',
      'name' => 'Sign out',
      'to' => '/sign-out',
    ],
  ];
@endphp

<nav class="main-navbar navbar-focus navbar">
  <div class="navbar-wrapper navbar-web">
    <ul class="navbar-primary inline--ll">
      {{-- <li class="brand-wrapper">
        <a href="/" style="display: block;">
          @include('icons.pmm')
        </a>
      </li> --}}
      <a href="/articles" style="display: inline-flex; align-items: center; justify-content: flex-start;">
        <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-right: 8px; height: 1em; width: 1em; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
        Back to Articles
      </a>
    </ul>
    <ul class="navbar-secondary">
      <a href="/admin/articles/{{ $author['id'] }}/edit/{{ $article['id'] }}" class="no-pre button button--small default edit-article" style="margin-right:12px;">Edit Article</a>
      <div class="custom-dropdown-wrapper">
        <button class="custom-dropdown-trigger">
          <div class="menu-more">
            <svg style="display: block; width: 25px; height: 25px; margin-left: -2px;">
              <path fill="currentColor" d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 7 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 0 0-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 0 0-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z" fill-rule="evenodd"></path>
            </svg>
          </div>
        </button>
        <ul class="hidden custom-dropdown-menu-wrapper popout" style="display: none;">
          <li class="custom-dropdown-menu-item">
            <div style="padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0,0,0,.08); text-align: left;">
              @if($article['published'])
                <p class="small" style="margin-bottom: 12px; color: #767676">Published on {{ date('M d, Y \a\t H:i a', strtotime($article['published_at'])) }}</p>
                <button class="button button--small default unlist-article">Unlist Article</button>
              @else
                <p class="small" style="margin-bottom: 12px; color: #767676">Article not published yet</p>
                <button class="button button--small primary publish-article">Publish Now</button>
              @endif
            </div>
          </li>
          <li class="custom-dropdown-menu-item">
            <button class="custom-dropdown-menu confirm-delete" style="color: #ff5a5b;" >Delete Article</button>
          </li>
        </ul>
      </div>
      <div class="primary-menu-wrapper" style="padding-left: 14px; padding-right: 14px;">
        <div class="custom-dropdown-wrapper">
          <button class="custom-dropdown-trigger">
            <div class="current-user-wrapper">
              <img class="current-user-profile-photo" src="/images/users/default.png" alt="user currently login">
            </div>
          </button>
          <ul class="hidden custom-dropdown-menu-wrapper popout" style="display: none;">
            @foreach ($secondary_menus as $menu)
              <li class="custom-dropdown-menu-item">
                <a class="custom-dropdown-menu heading6 {{ $menu->class ?? '' }} " href="{{ $menu->to }}">{{ $menu->name }}</a>
              </li>
            @endforeach
          </ul>
        </div>
      </div>
    </ul>
  </div>
</nav>