

@extends('layouts.web-provider')

@section('title', 'Ongki Herlambang')


@section('content')

@include('components.navbar')


  @component('layouts.main-content', ['class' => 'profile-page'])
 <div class="modal-wrapper container-post">
        <h1 class="heading1" style="margin-bottom: 48px;">User Profile</h1>
        <main class="edit-profile-wrapper">

          {{-- User Info Section --}}
          <div class="edit-profile-info">
          	<form method="post" action="/profile/update">
                {{ csrf_field() }}
            <input type="hidden" name="id" id="user-id" value="{{$user->id}}" />

            {{-- Field Email --}}
            @component('components.input-field',
              ['data' => (object)[
                  'label' => 'Email',
                  'type' => 'email',
                  'name' => 'email',
                  'id' => 'user-email',
                  'value' => $user->email,
                  'initial' => $user->email,
                  'placeholder' => 'Enter your email address',
                  ]
              ])
            @endcomponent

            @component('components.input-field',
              ['data' => (object)[
                  'label' => 'Full name',
                  'type' => 'text',
                  'name' => 'name',
                  'id' => 'user-fullname',
                  'value' => $user->name,
                  'initial' => $user->name,
                  'placeholder' => "What's your name?",
                  ]
              ])
            @endcomponent


            @component('components.input-field', [
              'data' => (object)[
                'label' => 'Phone number',
                'type' => 'text',
                'name' => 'phone',
                'id' => 'user-phone',
                'value' => $user->phone,
                'initial' => $user->phone,
                'placeholder' => 'Enter your phone number',
              ]
            ])
            @endcomponent

            

          </div>

          {{-- Profile Photo Section --}}
          <div class="edit-profile-side">
            @component('components.profile-photo-container', [
              'data' => (object) [
                'label' =>'Profile photo',
                'src' => $user->photo,
              ]
            ])
            @endcomponent
          </div>
      </div>
        </main>

        

        {{-- Modal Footer --}}
        <div class="modal-action-wrapper">
          <footer class="modal-action-bar container-post">
            <button class="button button--large primary save-change" type="submit">Save Changes</button>
            <a href="/profile/update" class="button button--large default close-modal">Cancel</a>
          </footer>
        </div>
    </form>
      </div>
    </div>

@include('components.footer')

@endsection