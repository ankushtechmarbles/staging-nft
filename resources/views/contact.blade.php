@extends('layouts.app')
@section('title','Contact')
@section('body-class','contact-page')
@section('header-bg-class','bg-navbar')
@push('custom-css') 
<link rel="stylesheet" media="screen" href="{{asset('assets/css/contact.css')}}">
@endpush
@section('content')
<section class="hero">
    <div class="container">
         <div class="row align-items-center justify-content-center">
            <div class="col-md-7 col-lg-7 text-center">
                <h1 class="my-5">Contact Us</h1>
                <p class="raleway-normal-black-16px mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                <a type="button" class="btn button-success mt-2 my-5">Apply to Create</a>
            </div>
        </div>
    </div>
    <!-- <div class="overlap-group">
        <img alt="vector" class="vector-3" src="{{asset('assets/img/pages/about/about-hero-vector-3.svg')}}"/>
        <img alt="vector" class="vector-4" src="{{asset('assets/img/pages/about/about-hero-vector-4.svg')}}"/>
    </div> -->
</section>

<section class="apply-section py-5">
    <div class="container">
        <div class="row ">
            <div class="col">
                <div class="card card-body">
                  <div class="position-relative d-flex flex-column flex-md-row justify-content-between align-items-center h-90">
                    <h3 class="h3 mb-md-0">Are you an aspiring entrepreneur that wants to get involved?</h3>
                    <a class="btn button-primary" href="">Apply Here</a>
                  </div>
                </div>
            </div>
        </div>

        <div class="row ">
            <div class="col">
                <div class="card card-body">
                  <div class="position-relative d-flex flex-column flex-md-row justify-content-between align-items-center h-90">
                    <h3 class="h3 mb-md-0">Register to attend a Startup Week</h3>
                    <a class="btn button-warning">Apply Here</a>
                  </div>
                </div>
            </div>
        </div>

        <div class="row ">
            <div class="col">
                <div class="card card-body">
                  <div class="position-relative d-flex flex-column flex-md-row justify-content-between align-items-center h-90">
                    <h3 class="h3 mb-md-0">Are you an early- stage startup investor wanting to learn how IDEADAO works?</h3>
                    <a class="btn button-strawberry">Learn More</a>
                  </div>
                </div>
            </div>
        </div>

        <div class="row ">
            <div class="col">
                <div class="card card-body">
                  <div class="position-relative d-flex flex-column flex-md-row justify-content-between align-items-center h-90">
                    <h3 class="h3 mb-md-0">Register to participate in a IDEADAO Hackathon weekend in October</h3>
                    <a class="btn button-success">Register Now</a>
                  </div>
                </div>
            </div>
        </div>

    </div>
</section>

<section class="form-section py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <!-- Form START -->
                <form class="contact-from my-5" method="post">
                    <div class="mb-3"> 
                        <label class="form-control-inline-text">Hello, I'm</label>
                        <span class="d-inline-block">
                            <input type="text" name="name">
                        </span>
                    </div>
                    <div class="mb-3"> 
                        <label class="form-control-inline-text">My email is</label>
                        <span class="d-inline-block">
                            <input type="email" name="email">
                        </span> 
                    </div>
                    <div class="mb-3">
                        <label class="form-control-inline-text">I’d like to contact you about</label>
                        <span class="d-inline-block">
                            <input type="text" name="message">
                        </span>
                    </div>
                    <div class="mb-3">
                        <label class="form-control-inline-text">Thank You</label> 
                    </div> 
                    <!-- Button -->
                    <button class="btn btn-send border-primary rounded-circle mt-4" type="submit">Send Message</button>
                </form>
                <!-- Form END -->
            </div>
        </div>
    </div>
</section>
@endsection
@push('js-plugin')@endpush
@push('custom-scripts')@endpush