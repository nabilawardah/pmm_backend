<nav class="main-navbar navbar-focus navbar">
  <div class="navbar-wrapper">
    <ul class="navbar-primary inline--ml">
      <li class="brand-wrapper">
        <a href="/">
          @include('icons.pmm')
        </a>
      </li>
      <span class="vertical-separator"></span>
      <li style="display: flex; align-items: center;">
        <img src="/icons/arrow-down-small.svg" alt="Back" style="width: 12px; height: 12px; margin-right: 8px; color: #767676; transform: rotate(90deg)">
        {{-- <a class="medium" href="/admin/articles" style="color: #767676;">Back to Articles</a> --}}
        <a class="medium back-link" style="color: #767676; font-weight: 500;">Back to Articles</a>
      </li>
    </ul>
    <ul class="navbar-secondary inline--l">
      <div style="display: flex; align-items: center;" class="inline--s">
      @if($article['published'])
        <span class="small" style="margin-right: 16px; color: #767676">Published on {{ date('M d, Y \a\t H:i a', strtotime($article['published_at'])) }}</span>
        <button class="button button--small default unlist-article">Unlist Article</button>
      @else
        <span class="small" style="margin-right: 16px; color: #767676">Article unlisted</span>
        <button class="button button--small primary publish-article">Publish</button>
      @endif
      <a href="/admin/articles/{{ $author['id'] }}/edit/{{ $article['id'] }}" class="no-pre button button--small default edit-article">Edit</a>
      <button class="button button--small secondary ghost confirm-delete">Delete</button>
      </div>
      <div class="navbar-profile">
        <div class="navbar-profile-photo" style="background-image: url('/images/users/ongki.jpg')"></div>
      </div>
    </ul>
  </div>
</nav>