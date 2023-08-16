@extends('layouts.admin.master')
@section('title', 'Change Password')
@section('content')
    <div class="container-fluid">
        <!-- Page Heading -->
	    <div class="row">
	        <div class="col-lg-12">
	            <div class="card shadow mb-4">
	            	<div class="card-header py-3">
		            	<div class="row">
			              	<div class="col-lg-8 col-md-6 col-sm-6 mb-2">
			              		<h5 class="m-0 font-weight-bold text-primary">{{ __('Change Password') }}</h5>
			              	</div>
			            </div>
		            </div>
	                <form action="{!! url()->current() !!}" method="POST" enctype="multipart/form-data" autocomplete="off" data-toggle="validator" data-disable="false">
	                    @csrf
		                <!-- Body -->
		                <div class="card-body">
		                	<div class="form-group row">
								<label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right"><span class="text-danger">*</span>{{ __('Current Password') }}:</label>
								<div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
									<div class="input-group">
				                     	<input id="password" type="password" class="form-control{{ $errors->has('current') ? ' is-invalid' : '' }}" name="current" value="" placeholder="{{ __('*Enter current password') }}" tabindex="1" autocomplete="off" required autofocus>
				                     	<div class="input-group-append">
										    <span class="input-group-text">
										    	<span class="password-hide"><i class="fas fa-eye-slash text-gray-600"></i></span>
										   		<span class="password-show" style="display: none;"><i class="fas fa-eye text-gray-800"></i></span>
										   	</span>
										</div>
									</div>
								</div>
							</div>

							<div class="form-group row">
								<label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right"><span class="text-danger">*</span>{{ __('New Password') }}:</label>
								<div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
									<div class="input-group">
				                     	<input id="new-password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" placeholder="{{ __('*Enter new password') }}" tabindex="2" autocomplete="off" required>
			                     		<div class="input-group-append">
										    <span class="input-group-text">
										    	<span class="password-hide"><i class="fas fa-eye-slash text-gray-600"></i></span>
										   		<span class="password-show" style="display: none;"><i class="fas fa-eye text-gray-800"></i></span>
										   	</span>
										</div>
									</div>
								</div>
							</div>

							<div class="form-group row">
								<label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right"><span class="text-danger">*</span>{{ __('Confirm Password') }}:</label>
								<div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
									<div class="input-group">
				                     	<input id="password-confirm" type="password" class="form-control" name="password_confirmation" placeholder="{{ __('*Enter confirm password') }}" tabindex="3" autocomplete="off" required> 
				                     	<div class="input-group-append">
										    <span class="input-group-text">
										    	<span class="password-hide"><i class="fas fa-eye-slash text-gray-600"></i></span>
										   		<span class="password-show" style="display: none;"><i class="fas fa-eye text-gray-800"></i></span>
										   	</span>
										</div>
									</div>
								</div>
							</div>

				        </div>

		               	<!--End Body -->	               	
				        <div class="card-footer">
				        	<div class="form-group row">
								<label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label"></label>
								<div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
									<button type="submit" class="btn btn-primary" tabindex="4">{{ __('Update') }}</button>
		                			<button type="reset" class="btn btn-danger" tabindex="5">{{ __('Cancel') }}</button>
								</div>
							</div>
				        </div>
		            </form>	
	            </div>
	                <!--End Body -->
	        </div>
	    </div>
	</div>
@endsection
@push('scripts')
<script type="text/javascript">
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
