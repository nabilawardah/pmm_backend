@extends('layouts.web-provider')

@section('title', 'Home')

@section('content')

  @include('components.navbar')

  @component('layouts.main-content')
    <header style="padding-top: 48px; margin-bottom: 96px; display: flex; align-items: center; justify-content: space-between;">
      <div>
        <h1 class="heading1" style="margin-bottom: 12px;">Paragon<br> Meaningful Movement</h1>
        <p class="heading3" style="font-weight: 400; margin-bottom: 32px; color: rgba(0,0,0,.54);">Bermanfaat Untuk Tumbuh</p>
        <p class="medium" style="max-width: 55ch;">
          Sebuah gerakan kerelawanan yang dilakukan Paragonian dalam mewujudkan visi dan misi perusahaan yaitu memberikan manfaat bagi Paragonian, mitra, masyarakat, dan lingkungan berdasarkan 4 pilar Paragon Corporate Social Responsibility yaitu Pendidikan, Kesehatan, Pemberdayaan Perempuan, dan Lingkungan.
        </p>
      </div>
      <div style="width: 256px; height: 256px;">
        @include('icons.logo-clean')
      </div>
    </header>
    <div class="csr-grid-container">
      <div class="csr-item" style="background-image: linear-gradient(to top, rgba(0,0,0,.70), transparent), url('/homepage/education.jpg')">
        <h2 class="csr-item-title heading4">Pendidikan</h2>
        <p class="csr-item-description small">
          Pendidikan merupakan fondasi pembangunan sebuah bangsa
        </p>
      </div>
      <div class="csr-item" style="background-image: linear-gradient(to top, rgba(0,0,0,.70), transparent), url('/homepage/health.jpg')">
        <h2 class="csr-item-title heading4">Kesehatan</h2>
        <p class="csr-item-description small">
          Kesehatan adalah awal penting dari kesejahteraan masyarakat suatu negara
        </p>
      </div>
      <div class="csr-item" style="background-image: linear-gradient(to top, rgba(0,0,0,.70), transparent), url('/homepage/education.jpg')">
        <h2 class="csr-item-title heading4">Pemberdayaan Perempuan</h2>
        <p class="csr-item-description small">
          Membantu pemerintah dalam pemberdayaan perempuan
        </p>
      </div>
      <div class="csr-item" style="background-image: linear-gradient(to top, rgba(0,0,0,.70), transparent), url('/homepage/environment.jpg')">
        <h2 class="csr-item-title heading4">Lingkungan</h2>
        <p class="csr-item-description small">
          Persoalan lingkungan masih jadi pekerjaan rumah yang perlu diselesaikan di Indonesia
        </p>
      </div>
    </div>
  @endcomponent

  @include('components.footer')

@endsection
