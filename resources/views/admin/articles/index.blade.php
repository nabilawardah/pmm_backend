@extends('layouts.admin-provider')

@section('title', 'Articles')

@section('content')
  @include('components.navbar-admin')

  @component('layouts.main-content', ['width' => 'default'])

    <header class="admin-table-header">
      <h1 class="heading1 page-title">Articles</h1>

      <fieldset class="table-search-wrapper">
        <input id="table-search-field" class="field-search" name="search-users" type="text" placeholder="Search by name, divisi, or area.">
        <button type="button" class="table-search-clear">
          <svg class="table-search-clear-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Clear Search" focusable="false" style="display: block; fill: currentcolor;"><path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fill-rule="evenodd"></path></svg>
          Clear Search
        </button>
      </fieldset>

    </header>

    <table id="articles-table" class="table" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th></th>
          <th>Articles</th>
          <th>Listed</th>
          <th>Author</th>
          <th>Submitted</th>
        </tr>
      </thead>
    </table>


  @endcomponent

  @include('components.footer')

@endsection
