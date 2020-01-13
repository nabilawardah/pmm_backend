<div id="confirm-delete-article" class="modal" style="display: none;">
  <div class="modal-main-area">
    <nav class="modal-nav">
      <button type="button" class="close-modal button-close--rounded">
        <div class="modal-close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Clear Search" focusable="false" style="height: 20px; width: 20px; display: block; fill: currentcolor;"><path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fill-rule="evenodd"></path></svg>
        </div>
        <div class="modal-close-text">esc</div>
      </button>
    </nav>
    <div class="modal-wrapper container-post modal-confirmation">
      <h2 class="heading2" style="text-align: center; margin-bottom: 16px;">
        Delete
      </h2>
      <p class="large" style="text-align: center; margin-bottom: 48px;">
        Deleted articles are gone forever. Are you sure?
      </p>
      <footer style="display: inline-flex; align-items: center; justify-content: center; width: 100%;" class="inline--m">
        <a href="/api/articles/delete/{{$article['id']}}" class="no-pre button button--medium secondary delete-article">Delete</a>
        <button class="button button--medium default close-modal">Cancel</button>
      </footer>
    </div>
  </div>
</div>