@extends('layouts.web-provider')

@section('title', 'Sign in')

@section('content')

  <div class="container-post">
    <h1 class="display3">Sign in</h1>
    <p class="large">Please sign in to continue</p>

    <form method="POST" action="/sign-in" class="sign-in-form">
      <fieldset>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email address">
      </fieldset>
      <fieldset>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password">
      </fieldset>
      <input class="button secondary button--large" type="button" value="Sign in">
      <input class="button primary-outline button--large" type="submit" value="Sign in">
    </form>

    <a href="/">Back to Homepage</a>
  </div>

@endsection