@extends('layouts.web-provider')

@section('title', 'Sign in')

@section('content')

<div class="background-wrapper">
  <div aria-hidden="true" class="background-area"></div>
  <div class="login-container">
    <div class="login-brand">
      <a href="/">
        @include('icons.pmm')
      </a>
    </div>
    <form method="POST" enctype="multipart/form-data" action="/sign-in" class="login-form">
      <header class="login-header">
        <h1 class="heading1">Sign in</h1>
        <p class="medium">Please sign in to your account to continue.</p>
      </header>
      {{ csrf_field() }}
      <fieldset class="input">
        <label class="input-label" for="email">Email</label>
        <input autocomplete="false" autofocus class="input-field" type="email" id="email" name="email">
      </fieldset>
      <fieldset class="input" style="margin-bottom: 24px">
        <label class="input-label" for="password">Password</label>
        <input autocomplete="false" class="input-field" type="password" id="password" name="password">
      </fieldset>
      <input class="button primary button--large" type="submit" value="Sign in" />
    </form>
    <footer class="stack--l">
      <a style="display: inline-flex;" class="button ghost" href="/forgot-password">Forgot Password</a>
    </footer>
  </div>
</div>

@endsection