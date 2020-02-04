<fieldset class="input">
  <label class="input-label">{{$data->label ?? ''}}</label>
  <div class="edit-profile-photo" style="background-image: url('/images/users/{{$data->src ?? 'default.png'}}')"></div>
</fieldset>
<button class="button button--medium default stretch upload-profile-picture">Upload an Image</button>