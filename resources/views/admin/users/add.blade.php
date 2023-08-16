@extends('layouts.admin.master')
@section('title', 'Add New User')
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
                            <h5 class="m-0 font-weight-bold text-primary">{{ __('Add New User') }}</h5>
                        </div>
                    </div>
                </div>
                <form action="{!! url()->current() !!}" method="POST" enctype="multipart/form-data" autocomplete="off" novalidate="">
                @csrf
                <!-- Body -->
                <div class="card-body">
			       	<div class="row">
						<div class="form-group col-lg-3 col-md-3 col-sm-12">
							<label><span class="text-danger">*</span>{{ __('Full Name') }}:</label>
							<input type="text" class="form-control" name="name" value="{{ old('name') }}" placeholder="{{ __('*Enter your full name') }}"tabindex="1" required autofocus>
						</div>
						<div class="form-group col-lg-3 col-md-3 col-sm-12">
							<label><span class="text-danger">*</span>{{ __('Email') }}:</label>
							<input type="email" class="form-control" name="email" value="{{ old('email') }}" placeholder="{{ __('*Enter email address') }}" tabindex="2" required>
						</div>
						<div class="form-group col-lg-3 col-md-3 col-sm-12">
						    <label for="form"><span class="text-danger">*</span>{{ __('Password') }}:</label>
						    <div class="input-group">
		                     	<input id="password" type="password" class="form-control" name="password" placeholder="{{ __('*Enter password') }}" tabindex="3" autocomplete="off" required>
		                     	<div class="input-group-append">
								    <span class="input-group-text">
								    	<span class="password-hide"><i class="fas fa-eye-slash text-gray-600"></i></span>
								   		<span class="password-show" style="display: none;"><i class="fas fa-eye text-gray-800"></i></span>
								   	</span>
								</div>
							</div>
		                </div>
						<div class="form-group col-lg-3 col-md-3 col-sm-12">
							<label><span class="text-danger">*</span>{{ __('Phone') }}:</label>
							<input type="text" class="form-control" name="phone" value="{{ old('phone') }}" placeholder="{{ __('*Enter phone number') }}" tabindex="4" maxlength="13" min="10" max="20" required>
						</div>							                  
	                </div>           
		            <div class="row">		                
						<div class="form-group col-lg-3 col-md-3 col-sm-12">
						    <label><span class="text-danger">*</span>{{ __('User Role') }}:</label>
						    <select class="form-control m-input role custom-select select2" name="role" id="role" tabindex="5">
                                <option value="admin" {{ old('role') == 'admin' ? 'selected' : null }}>Admin</option>
                                <option value="staff" {{ old('role') == 'staff' ? 'selected' : null }}>Staff</option>
                                <option value="seller" {{ old('role') == 'seller' ? 'selected' : null }}>Seller</option>
                            </select>
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
									<input type="file" class="custom-file-input" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg, image/gif" tabindex="6">
									<label class="custom-file-label" for="avatar">{{ __('Choose Profile Picture') }}</label>
								</div>
							</div>
						</div>              
		                <div class="form-group col-lg-3 col-md-3 col-sm-12">
		                    <label>Allowed IP:</label>
	                     	<input type="text" class="form-control ip_address" name="ip_address" value="{{ old('ip_address') }}" placeholder="{{ __('Enter allowed IP') }}" tabindex="7">
		                </div>		                
						<div class="form-group col-lg-3 col-md-3 col-sm-12">
							<label for="notification" tabindex="8">Email Notification:</label><br/>
							<input name="notification" id="notification" type="checkbox" data-toggle="toggle" data-on="YES" data-off="NO" data-onstyle="success" data-offstyle="danger" data-width="100" tabindex="8" class="btn-toggle">
						</div>						
	                	<div class="form-group col-lg-3 col-md-3 col-sm-12">
	                        <label for="tfa_enabled"><span class="text-danger"></span>{!! trans('Use Two Factor Authentication') !!}:</label> <br/>
	                        <input name="tfa_enabled" id="tfa_enabled" type="checkbox" data-toggle="toggle" data-on="YES" data-off="NO" data-onstyle="success" data-offstyle="danger" class="btn-toggle" data-width="100">
	                    </div>	
	                </div>
	                <div class="row">
		                <div class="form-group col-lg-12 col-sm-12 mb-3">
		                    <label>Address:</label>
	                     	<input type="text" class="form-control" name="address" value="{{ old('address') }}" placeholder="{{ __('Enter address') }}" tabindex="9">
		                </div>  
	                </div>  
	                <div class="row">
		                <div class="form-group col-lg-3 col-md-3 col-sm-12">
		                    <label>City:</label>
	                     	<input type="text" class="form-control" name="city" value="{{ old('city') }}" placeholder="{{ __('Enter city') }}" placeholder="Enter city" tabindex="10">
		                </div> 
	                    <div class="form-group col-lg-3 col-md-3 col-sm-12">
		                    <label>State:</label>
	                   		<input type="text" class="form-control" name="state" value="{{ old('state') }}" placeholder="{{ __('Enter state') }}" tabindex="11">
		                </div>  
		                <div class="form-group col-lg-3 col-md-3 col-sm-12">
		                    <label>Country:</label>
	                   		<input type="text" class="form-control" name="country" value="{{ old('country') }}" placeholder="{{ __('Enter country') }}" tabindex="12">
		                </div>
		                <div class="form-group col-lg-3 col-md-3 col-sm-12">
		                   <label>Postal Code:</label>
	                   		<input type="text" class="form-control" name="postalcode" value="{{ old('postalcode') }}" placeholder="{{ __('Enter postalcode') }}" maxlength="6" tabindex="13">
		                </div>
	                </div>
			    </div>
		        <div class="card-footer">
                    <div class="form-group row">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <button type="submit" class="btn btn-primary"  tabindex="14">{{ __('Save') }}</button>
                            <a href="{!! route('admin.users') !!}" class="btn btn-danger"  tabindex="15">{{ __('Cancel') }}</a>
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
	$(".input-group-append").click(function(e) {
	    var x = $(this).parent().children('input');
	    if (x.attr('type') === "password") {
	      $(".input-group-append").parent().children('input').attr('type', 'text'); 
	      $(".input-group-append").children('span').children('.password-show').show();
	      $(".input-group-append").children('span').children('.password-hide').hide();
	    } else {
	      $(".input-group-append").parent().children('input').attr('type', 'password'); 
	      $(".input-group-append").children('span').children('.password-show').hide();
	      $(".input-group-append").children('span').children('.password-hide').show();
	    }
	});
</script>
@endpush