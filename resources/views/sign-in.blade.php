@extends('layouts.web-provider')

@section('title', 'Sign in')

@section('content')

<div class="background-wrapper">
  <div class="login-wrapper">
    <div class="container-narrow login-container">
      <header class="login-header">
        <h1 class="display3">Sign in</h1>
        <p class="large">Please sign in to your account to continue.</p>
      </header>
      <form method="POST" enctype="multipart/form-data" action="/sign-in" class="login-form">
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
        {{-- <a class="button primary-outline button--large stretch" href="/">Go to Home</a> --}}
      </form>
    </div>
  </div>
  </div>

@endsection