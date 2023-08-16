@extends('layouts.admin.app')
@section('title', 'Login')
@section('content')
<div class="container">
    <!-- Outer Row -->
   
    <div class="row justify-content-center my-0">

      <div class="col-xl-10 col-lg-12 col-md-9 mt-5 mb-4 pt-4">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">              
              <div class="col-lg-5 d-none d-lg-block p-5 align-self-center">
                <img src="{{ url('admin/assets/img/logo/logo.svg') }}" class="d-block mx-auto w-100" >
              </div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4 font-wight-900">{{ __('Welcome back to ') }}{{config('app.name')}}</h1>
                  </div>
                  <form class="user" method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="form-group">
                      <input id="email" type="email" class="form-control form-control-user {{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" placeholder="{{ __('*Enter your email') }}" required autofocus>

                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>
                    <div class="form-group">
                        <input id="password" type="password" class="form-control form-control-user{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" placeholder="{{ __('*Enter your password') }}" required>
                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input class="custom-control-input  {{ old('remember') ? 'checked' : '' }}" type="checkbox" name="remember" id="remember">
                        <label class="custom-control-label" for="remember"> {{ __('Remember Me') }} </label>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">{{ __('Login') }} </button>                    
                  </form><!-- <hr>                  <div class="text-center">
                    @if (Route::has('password.request'))
                        <a class="small btn btn-link" href="{{ route('password.request') }}" title="{{ __('Forgot password?') }}">
                            {{ __('Forgot password?') }}
                        </a>
                    @endif
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
@endsection
