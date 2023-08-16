@extends('layouts.admin.master')
@section('title', 'Profile')
@push('css-plugins')
    <link href="{{ URL::asset('admin/assets/vendor/bootstrap4-toggle/css/bootstrap4-toggle.min.css') }}" rel="stylesheet">
@endpush
@section('content')
    <div class="container-fluid">
        <!-- Page Heading -->
	    <div class="row">
	        <div class="col-lg-12">
	            <div class="card shadow mb-4">
	                <div class="card-header py-3">
		            	<div class="row">
			              	<div class="col-lg-8 col-md-6 col-sm-6 mb-2">
			              		<h5 class="m-0 font-weight-bold text-primary">{{ __('Profile') }}</h5>
			              	</div>
			            </div>
		            </div>
	               	<form action="{!! url()->current() !!}" method="POST" enctype="multipart/form-data" autocomplete="off" data-toggle="validator" data-disable="false">
                    @csrf
	                <!-- Body -->
	                <div class="card-body">
				       	<div class="row">
							<div class="form-group col-lg-3 col-md-3 col-sm-12">
								<label><span class="text-danger">*</span>{{ __('Full Name') }}:</label>
								<input type="text" class="form-control" name="name" value="{{ $user->name }}" placeholder="{{ __('*Enter your full name') }}"tabindex="1" required autofocus>
							</div>
							<div class="form-group col-lg-3 col-md-3 col-sm-12">
								<label><span class="text-danger">*</span>{{ __('Email') }}:</label>
								<input type="email" class="form-control" name="email" value="{{ $user->email }}" placeholder="{{ __('*Enter email address') }}" tabindex="2" required>
							</div>
							<div class="form-group col-lg-3 col-md-3 col-sm-12">
								<label><span class="text-danger">*</span>{{ __('Phone') }}:</label>
								<input type="text" class="form-control" name="phone" value="{{ $user->phone }}" placeholder="{{ __('*Enter phone number') }}" tabindex="4" maxlength="13" min="10" max="20" required>
							</div>
							<div class="form-group col-lg-3 col-md-3 col-sm-12">
							    <label>{{ __('User Picture') }}:</label>
				                <div class="input-group">
									@if(!empty($user->avatar))
									<div class="input-group-prepend rounded-top">
					    				<span class="input-group addon border rounded-left"><img height="36px" width="36px" src="{{ $user->avatar }}" alt=""></span>
					    			</div>
					    			@else
					    			<div class="input-group-prepend rounded-top">
					    				<span class="input-group addon border rounded-left"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="34" height="34" class="avatar-svg"><path fill="#eaecf4" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"></path></svg></span>
					    			</div>                
			    					@endif
									<div class="custom-file">
										<input type="file" class="custom-file-input" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg, image/gif" tabindex="5">
										<label class="custom-file-label" for="avatar">{{ __('Choose Profile Picture') }}</label>
									</div>
								</div>
							</div> 				                  
		              
		                </div>
		                <div class="row">
			                <div class="form-group col-lg-12 col-sm-12 mb-3">
			                    <label>Address:</label>
		                     	<input type="text" class="form-control" name="address" value="{{ $user->address }}" placeholder="{{ __('Enter address') }}" tabindex="9">
			                </div>  
		                </div>  
		                <div class="row">
			                <div class="form-group col-lg-3 col-md-3 col-sm-12">
			                    <label>City:</label>
		                     	<input type="text" class="form-control" name="city" value="{{ $user->city }}" placeholder="{{ __('Enter city') }}" placeholder="Enter city" tabindex="10">
			                </div> 
		                    <div class="form-group col-lg-3 col-md-3 col-sm-12">
			                    <label>State:</label>
		                   		<input type="text" class="form-control" name="state" value="{{ $user->state }}" placeholder="{{ __('Enter state') }}" tabindex="11">
			                </div>  
			                <div class="form-group col-lg-3 col-md-3 col-sm-12">
			                    <label>Country:</label>
		                   		<input type="text" class="form-control" name="country" value="{{ $user->country }}" placeholder="{{ __('Enter country') }}" tabindex="12">
			                </div>
			                <div class="form-group col-lg-3 col-md-3 col-sm-12">
			                   <label>Postal Code:</label>
		                   		<input type="text" class="form-control" name="postalcode" value="{{ $user->postalcode }}" placeholder="{{ __('Enter postalcode') }}" maxlength="6" tabindex="13">
			                </div>
		                </div>
		                <div class="row">
		                	<div class="form-group col-lg-12 col-md-12 col-sm-12">
	                            <label for="tfa_enabled"><span class="text-danger"></span>{!! trans('auth.twoFactorAuth', [
			                                            'link' => 'https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345'
			                                        ]) !!}:</label> 
	                            <input name="tfa_enabled" id="tfa_enabled" type="checkbox" data-toggle="toggle" data-on="YES" data-off="NO" data-onstyle="success" data-offstyle="danger" class="btn-toggle" data-size="sm" data-width="100">
	                        </div> 
		                </div>  
				    </div>
	               	<!--End Body -->
			        <div class="card-footer">
	                    <div class="form-group row">
	                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
	                            <button type="submit" class="btn btn-primary">{{ __('Update') }}</button>
	                            <a href="{!! url()->current() !!}" class="btn btn-danger">{{ __('Cancel') }}</a>
	                        </div>
	                    </div>
	                </div>
                  </form>	                
	            </div>
	        </div>
	    </div>
    </div>
@endsection
@push('scripts')
<script type="text/javascript">
    $('.btn-toggle').bootstrapToggle();
    $('.btn-toggle').bootstrapToggle('off');
    @if($user->tfa_enabled == '1')
        $('#tfa_enabled').bootstrapToggle('on');
    @endif
</script>
@endpush