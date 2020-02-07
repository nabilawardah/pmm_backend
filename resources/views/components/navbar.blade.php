@php
  $primary_menus = [
    (object) [
      'name' => 'Home',
      'to' => '/',
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

  $secondary_menus = [
    // (object) [
    //     'name' => 'Sign In',
    //     'to' => '/sign-in',
    // ],
    // (object) [
    //   'class' => '',
    //   'name' => 'Profile',
    //   'to' => '/profile/1',
    // ],
    (object) [
      'class' => 'no-pre',
      'name' => 'Sign out',
      'to' => '/sign-out',
    ],
  ];
@endphp

<nav class="main-navbar navbar">
  <div class="navbar-wrapper navbar-web">
    <ul class="navbar-primary inline--ll">
      <li class="brand-wrapper">
        <a href="/" style="display: block;">
          @include('icons.pmm')
        </a>
      </li>
      @foreach ($primary_menus as $menu)
        @component('components.menu-web', ['name' => $menu->name, 'to' => $menu->to, 'active' => $active_page])
        @endcomponent
      @endforeach
    </ul>
    <ul class="navbar-secondary inline--ml">
      <li class="primary-menu-wrapper">
        <a href="/articles/create/1" class="button button--small primary no-pre">
          Add Points
        </a>
      </li>
      <li class="primary-menu-wrapper" style="padding-left: 14px; padding-right: 14px;">
        <div class="custom-dropdown-wrapper">
          <button class="custom-dropdown-trigger">
            <div class="current-user-wrapper">
              <img class="current-user-profile-photo" src="/images/users/default.png" alt="user currently login">
            </div>
          </button>
          <ul class="hidden custom-dropdown-menu-wrapper popout" style="display: none;">
            <li class="custom-dropdown-menu-item">
              <a class="custom-dropdown-menu heading6" style="display: flex; align-items: center; justify-content: space-between; width: 100%" href="/admin/articles">
                <span style="display: block; padding-right: 16px;">
                  Go to Admin
                </span>
                <div style="display: block; width: 24px; height: 24px; margin-right: 8px">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style="display: block; fill: #0099cc;">
                    {{-- <path d="m13.0429 20.4868c-.252.108-.56-.037-.56-.318l-.079-16.225c0-.327.404-.491.639-.26 1.491 1.462 4.438 2.852 6.897 3.197.161.022.288.143.316.299 1.089 6.046-2.202 11.152-7.213 13.307"></path> --}}
                    <path d="m13.998 11.0102h-4v-2c0-1.104.896-2 2-2s2 .896 2 2zm1.5 0h-.5v-2c0-1.657-1.343-3-3-3s-3 1.343-3 3v2h-.5c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h7c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5z" fill="#fff"></path>
                    <path d="m12.998 10.0102h-2v-1c0-.552.448-1 1-1s1 .448 1 1zm-1-3c-1.104 0-2 .896-2 2v2h4v-2c0-1.104-.896-2-2-2zm1 6c0 .37-.201.693-.5.866v1.134c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1.134c-.299-.173-.5-.496-.5-.866 0-.552.448-1 1-1s1 .448 1 1zm3 3.5c0 .276-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5v-5c0-.276.224-.5.5-.5h.5v-2c0-1.657 1.343-3 3-3s3 1.343 3 3v2h.5c.276 0 .5.224.5.5zm0-6.415v-1.085c0-2.209-1.791-4-4-4s-4 1.791-4 4v1.085c-.583.206-1 .762-1 1.415v5c0 .828.671 1.5 1.5 1.5h7c.828 0 1.5-.672 1.5-1.5v-5c0-.653-.417-1.209-1-1.415zm-3.627 11.861c-7.206-3.07-10.097-8.274-8.751-15.741 3.612-.536 6.535-2.014 8.751-4.432 2.215 2.418 5.138 3.896 8.75 4.432 1.346 7.467-1.545 12.671-8.75 15.741zm9.684-16.294c-.042-.216-.218-.38-.436-.408-3.754-.484-6.698-2.007-8.858-4.573-.204-.242-.577-.242-.781 0-2.16 2.566-5.104 4.089-8.858 4.573-.218.028-.394.192-.436.408-1.612 8.206 1.58 14.027 9.488 17.319.126.052.267.052.392 0 7.91-3.292 11.101-9.113 9.489-17.319z" fill="#484848"></path></svg>
                </div>
              </a>
            </li>
            <li class="custom-dropdown-menu-item">
              <a class="custom-dropdown-menu heading6" style="display: flex; align-items: center; justify-content: space-between; width: 100%" href="/profile/1">
                <span style="display: block; padding-right: 16px;">
                  Profile
                </span>
                <div style="display: block; width: 20px; height: 20px; margin-right: 8px">
                  <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style="display: block; fill: #484848;"><path d="m14.76 11.38a6.01 6.01 0 0 0 3.28-5.36 6.02 6.02 0 0 0 -12.04 0 6.01 6.01 0 0 0 3.27 5.35c-4.81 1.22-9.27 5.31-9.27 8.7 0 1.56 6.8 3.93 12 3.93 5.23 0 12-2.34 12-3.93 0-3.39-4.45-7.47-9.24-8.7zm-7.76-5.36a5.02 5.02 0 0 1 10.04 0c0 2.69-2.12 4.87-4.78 5-.09 0-.18-.01-.26-.01s-.16.01-.24.01c-2.65-.14-4.76-2.32-4.76-5zm15.9 14.09a3.8 3.8 0 0 1 -.64.44c-.62.36-1.5.75-2.52 1.1-2.41.83-5.18 1.35-7.74 1.35-2.55 0-5.32-.52-7.74-1.37-1.01-.35-1.9-.74-2.52-1.1-.47-.27-.74-.51-.74-.46 0-3.35 5.55-7.85 10.64-8.05.13.01.25.02.38.02.12 0 .24-.01.36-.02 5.09.22 10.62 4.71 10.62 8.05 0-.07-.02-.04-.1.04z" fill-rule="evenodd"></path></svg>
                </div>
              </a>
            </li>
            @foreach ($secondary_menus as $menu)
              <li class="custom-dropdown-menu-item">
                <a class="custom-dropdown-menu heading6 {{ $menu->class ?? '' }} " href="{{ $menu->to }}">{{ $menu->name }}</a>
              </li>
            @endforeach
        </ul>
        </div>
      </li>
    </ul>
  </div>
</nav>