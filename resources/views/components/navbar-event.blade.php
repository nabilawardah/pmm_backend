<nav class="main-navbar navbar-focus navbar" style="box-shadow: inset 0px -1px 0px 0px rgba(0,0,0,.12);">
  <div class="navbar-wrapper navbar-web">
    <div class="brand-wrapper">
      <a href="/">
        @include('icons.pmm')
      </a>
    </div>
    <section class="section--outset navbar-event-main">
      <a href="/events" style="display: inline-flex; align-items: center; justify-content: flex-start;">
        <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-right: 8px; height: 1em; width: 1em; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
        Back
      </a>
      <div style="display: inline-flex; align-items: center; justify-content: flex-start;">
        @isset($show_publish)
          @if($show_publish)
            <button class="button button--small primary publish-event">Save & Publish</button>
          @endif
        @endisset
        @isset($show_edit)
          @if($show_edit)
            <a href="/admin/events/{{ $event['admin'] }}/edit/{{ $event['id'] }}" class="no-pre button button--small default edit-event">Edit</a>
          @endif
        @endisset
        <button style="margin-left: 24px;" class="button button--small secondary ghost confirm-delete">Delete</button>
      </div>
    </section>
    <div class="navbar-profile">
      <div class="navbar-profile-photo" style="background-image: url('/images/users/ongki.jpg')"></div>
    </div>
  </div>
</nav>