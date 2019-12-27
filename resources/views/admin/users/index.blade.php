@extends('layouts.admin-provider')

@section('title', 'Users')

@section('content')

  @component('components.navbar-admin')
  @endcomponent

  <div class="container-narrow">
    <h1 class="display2">Users</h1>

    <table id="users-table" class="table" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Points</th>
        </tr>
      </thead>
    </table>

  </div>

  @component('components.footer')
  @endcomponent

@endsection
