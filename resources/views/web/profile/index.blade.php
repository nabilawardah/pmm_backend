@extends('layouts.web-provider')

@section('title', 'Ongki Herlambang')

@section('content')

  <style>
    html, body {
      min-height: 100vh;
    }
  </style>

  @include('components.navbar')

  @component('layouts.main-content', ['class' => 'profile-page'])
    <section class="card align--center profile-wrapper">
      <textarea class="hidden">
        {"id":1,"name":"Ongki Herlambang","email":"ongkiherlambang@gmail.com","role":"admin","photo":"ongki.jpg","phone":"082377296969","divisi":"Kebersihan","working_area":"OB"}
      </textarea>
      <div class="profile-info-photo-container">
        <img class="profile-photo" src="/images/users/default.png" alt="Ongki Herlambang">
        <span class="profile-badge">admin</span>
      </div>
      <div class="profile-info-wrapper">
        <header class="profile-info-header">
          <h1 class="heading3 profile-name">Ongki Herlambang</h1>
          <dl class="info-work">
            <dd class="medium">Public Relation</dd>
            <span class="separator"></span>
            <dd class="medium">HO</dd>
          </dl>
        </header>
        <dl class="info--contact">
          <dt class="info--stack large">
            <a href="mailto:ongki@herlambang.design"  class="profile-info">
              <span class="contact-icon">@include('icons.mail')</span>
              <span class="contact-value">ongki@herlambang.design</span>
            </a>
          </dt>
          <dt class="info--stack large">
            <a href="phone:+6282377298989" class="profile-info">
              <span class="contact-icon">@include('icons.call')</span>
              <span class="contact-value">+62 823 7729 6969</span>
            </a>
          </dt>
        </dl>
      </div>
      <button class="button button--medium default edit-profile">Edit Profile</button>
    </section>
    <section class="profile-achievment">
      <h2 class="heading4 profile-user-achievment">
        You've achieved <span class="point-counts">24</span> points.
      </h2>
      <span class="profile-all-achievment">out of total 120 points achieved by all PMM users.</span>
      <a href="/articles/1/create" class="button button--large primary">
        Add Points
      </a>
    </section>
  @endcomponent

@include('components.footer')

@endsection