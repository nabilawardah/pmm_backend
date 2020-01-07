{{--
  Generate input field
--}}

<fieldset class="input" {{ isset($disabled) ? 'disabled' : ''}}>
  <label class="input-label" for="${id}">{{$data->label ?? ''}}</label>
  <input id="{{$data->id ?? ''}}" class="input-field" name="{{$data->name ?? ''}}" type="{{$data->type ?? ''}}" value="{{$data->value ?? ''}}" placeholder="{{$data->placeholder ?? ''}}" data-initial="{{$data->initial ?? ''}}"/>
</fieldset>