<fieldset class="input">
  <label for="{{$data->id ?? ''}}" class="input-label">{{$data->label ?? ''}}</label>
  <span class="input-arrow">
    <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 16px; width: 16px; display: block; fill: currentColor;"><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path></svg>
  </span>
  <select class="input-field input-dropdown" id="{{$data->id ?? ''}}" name="{{$data->name ?? ''}}" data-initial="{{$data->initial ?? ''}}" value="{{$data->value ?? ''}}">
    <option disabled>{{$data->placeholder ?? ''}}</option>
    @foreach ($options as $option)
      <option value="{{ $option->value }}" {{$option->value === $data->value ? 'selected' : ''}}>
        {{$option->name}}
      </option>
    @endforeach
  </select>
</fieldset>