@extends('layouts.admin.master')
@section('title'){{ __('Site Setting') }}@endsection
@section('content')
<style type="text/css">

fieldset.scheduler-border {
    border: 1px groove #ddd !important;
    padding: 1.4em !important;
    margin: 0 0 1.5em 0 !important;
    -webkit-box-shadow:  0px 0px 0px 0px #000;
            box-shadow:  0px 0px 0px 0px #000;
}

legend.scheduler-border {
    font-size: 1rem !important;
    font-weight: 700 !important;
    line-height: 1.2 !important;
    color: #48465b !important;
    text-align: left !important;
    width:auto;
    padding:0 10px;
    border-bottom:none;
}

</style>
	<div class="container-fluid">
	    <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">{{ __('Site Setting') }}</h1>
          </div>
        <!-- Content Row -->
	    <div class="row">
	        <div class="col-lg-12">
	            <div class="card shadow mb-4">
	                <div class="card-header py-3">
	                    <div class="row">
	                        <div class="col-lg-8 col-md-6 col-sm-6 mb-2">
	                            <h5 class="m-0 font-weight-bold text-primary">{{ __('Site Setting') }}</h5>
	                        </div>
	                    </div>
	                </div>
	                <form action="{!! url()->current() !!}" method="POST" enctype="multipart/form-data" autocomplete="off">
	                @csrf
	                <!-- Body -->
	                <div class="card-body">
	                	<fieldset class="scheduler-border">
    						<legend class="scheduler-border">General</legend>
		                    <div class="form-group row">
		                        <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="site_name"><span class="text-danger">*</span>{{ __('Site Name') }}:</label>
		                        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
		                            <input type="text" class="form-control" name="site_name" id="site_name"  placeholder="{{ __('Enter site name') }}" value="{{ $setting['site_name'] ?? null }}" required autofocus>
		                        </div>
		                    </div> 
		                    <div class="form-group row">
		                        <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="email_to"><span class="text-danger">*</span>{{ __('Email To') }}:</label>
		                        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
		                            <input type="email" class="form-control" name="email_to" id="email_to" aria-describedby="email_help"  placeholder="{{ __('Enter email to') }}" value="{{ $setting['email_to'] ?? null  }}" required> 
		                            <small id="email_help" class="form-text text-muted">{{ __('Email address on a Cell Mall will be able to receive Contact us and Product requests notifications.') }}</small>
		                        </div>
		                    </div>
	                    </fieldset>

	                    <fieldset class="scheduler-border">
    						<legend class="scheduler-border">Contact</legend>
		                    <div class="form-group row">
		                        <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="phone_number">{{ __('Phone Number') }}:</label>
		                        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
		                            <input type="text" class="form-control" name="phone_number" id="phone_number" aria-describedby="phone_number_help"  placeholder="{{ __('Enter phone number') }}" value="{{ $setting['phone_number'] ?? null  }}"> 
		                            <small id="phone_number_help" class="form-text text-muted">{{ __('Add Phone number show on website.') }}</small>
		                        </div>
		                    </div>	                    
		                    <div class="form-group row">
		                        <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="email_address">{{ __('Email Address') }}:</label>
		                        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
		                            <input type="email" class="form-control" name="email_address" id="email_address" aria-describedby="email_address_help"  placeholder="{{ __('Enter email address') }}" value="{{ $setting['email_address'] ?? null  }}" > 
		                            <small id="email_address_help" class="form-text text-muted">{{ __('Add Email address show on website.') }}</small>
		                        </div>
		                    </div>

		                    <div class="form-group row">
		                        <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="office_address">{{ __('Office Address') }}:</label>
		                        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
		                            <input type="text" class="form-control" name="office_address" id="office_address" aria-describedby="office_address_help"  placeholder="{{ __('Enter office address') }}" value="{{ $setting['office_address'] ?? null  }}" > 
		                            <small id="office_address_help" class="form-text text-muted">{{ __('Add Office address show on website.') }}</small>
		                        </div>
		                    </div>	                    
	                    </fieldset>

	                    <fieldset class="scheduler-border">
    						<legend class="scheduler-border">Social</legend>
		                    <div class="form-group row">
		                        <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="facebook">{{ __('Facebook') }}:</label>
		                        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
		                            <input type="text" class="form-control" name="facebook" id="facebook" aria-describedby="facebook_help"  placeholder="{{ __('Enter Facebook URL') }}" value="{{ $setting['facebook'] ?? null  }}"> 
		                            <small id="facebook_help" class="form-text text-muted">{{ __('Add Facebook URL') }}</small>
		                        </div>
		                    </div>	                    
		                   	<div class="form-group row">
		                        <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="twitter">{{ __('Twitter') }}:</label>
		                        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
		                            <input type="text" class="form-control" name="twitter" id="twitter" aria-describedby="twitter_help"  placeholder="{{ __('Enter Twitter URL') }}" value="{{ $setting['twitter'] ?? null  }}"> 
		                            <small id="twitter_help" class="form-text text-muted">{{ __('Add Twitter URL') }}</small>
		                        </div>
		                    </div>	                    
		                   	<div class="form-group row">
		                        <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="linkedin">{{ __('Linkedin') }}:</label>
		                        <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
		                            <input type="text" class="form-control" name="linkedin" id="linkedin" aria-describedby="linkedin_help"  placeholder="{{ __('Enter Linkedin URL') }}" value="{{ $setting['linkedin'] ?? null  }}"> 
		                            <small id="linkedin_help" class="form-text text-muted">{{ __('Add Linkedin URL') }}</small>
		                        </div>
		                    </div>
		                    <div class="form-group row">
							    <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="instagram">{{ __('Instagram') }}:</label>
							    <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
							        <input type="text" class="form-control" name="instagram" id="instagram" aria-describedby="instagram_help"  placeholder="{{ __('Enter Instagram URL') }}" value="{{ $setting['instagram'] ?? null  }}"> 
							        <small id="instagram_help" class="form-text text-muted">{{ __('Add Instagram URL') }}</small>
							    </div>
							</div>					
		                    <div class="form-group row">
							    <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="vimeo">{{ __('Vimeo') }}:</label>
							    <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
							        <input type="text" class="form-control" name="vimeo" id="vimeo" aria-describedby="vimeo_help"  placeholder="{{ __('Enter vimeo URL') }}" value="{{ $setting['vimeo'] ?? null  }}"> 
							        <small id="vimeo_help" class="form-text text-muted">{{ __('Add Vimeo URL') }}</small>
							    </div>
							</div>
		                    <div class="form-group row">
							    <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label text-sm-left text-md-right" for="youtube">{{ __('Youtube') }}:</label>
							    <div class="col-sm-12 col-md-9 col-lg-9 col-xl-9">
							        <input type="text" class="form-control" name="youtube" id="youtube" aria-describedby="youtube_help"  placeholder="{{ __('Enter youtube URL') }}" value="{{ $setting['youtube'] ?? null  }}"> 
							        <small id="youtube_help" class="form-text text-muted">{{ __('Add Youtube URL') }}</small>
							    </div>
							</div>							                    
	                    </fieldset>

	                    
	                </div>
	                <!--End Body -->                    
	                <div class="card-footer">
	                    <div class="form-group row">
	                        <label class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label"></label>
	                        <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
	                            <button type="submit" class="btn btn-primary">{{ __('Save Changes') }}</button>
	                            <a href="{!! route('admin.settings') !!}" class="btn btn-danger">{{ __('Cancel') }}</a>
	                        </div>
	                    </div>
	                </div>  
	              </form>    
	            </div>
	        </div>
	    </div>
	    <div class="row">
	        <div class="col-lg-12">
	            <div class="card shadow mb-4">
	                <div class="card-body">
	                	<fieldset class="scheduler-border">
    						<legend class="scheduler-border">Website maintenance & Cache-Clear</legend>
		                    <div class="form-group row">
		                        <div class="col-sm-12">
		                        	<a href="{{url('admin/shutdown')}}" class="btn btn-danger m-1">{{ __('Site Down') }}</a>
		                        	<a href="{{url('admin/live')}}"  class="btn btn-success m-1">{{ __('Site Live') }}</a>
		                        	<a href="{{url('admin/cache-clear')}}" class="btn btn-warning m-1">{{ __('Site Cache Clear') }}</a>
		                        </div>
		                    </div>
	                    </fieldset>
	                </div> 
	              </form>    
	            </div>
	        </div>
	    </div>
	</div>
@endsection