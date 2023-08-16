@extends('layouts.app')
@section('title','Courses')
@section('header-bg-class','course-page')
@push('custom-css')
<link rel="stylesheet" media="screen" href="{{asset('assets/css/course.css')}}">
@endpush
@section('content')
      <!-- Hero -->
      <section class="position-relative pt-5 course-page">

        <!-- Background
        <div class="position-absolute top-0 start-0 w-100 bg-position-bottom-center bg-size-cover bg-repeat-0" style="background-image: url(assets/img/about/hero-bg.svg);">
          <div class="d-lg-none" style="height: 960px;"></div>
          <div class="d-none d-lg-block" style="height: 768px;"></div>
        </div> -->

        <!-- Content -->
        <div class="container position-relative zindex-5 pt-5">
          <div class="row">
            <div class="col-lg-10">              
              <!-- Breadcrumb -->
              <div class="pt-md-2 pt-lg-3 pb-4 pb-md-5 mb-xl-4"> </div>
              <!-- Text -->     

               <p class="pb-2 pb-md-3 sequel100black-95-regular-normal-onyx-20px">
                <span class="sequel100black-95-regular-normal-onyx-20px">Immerse yourself with </span><span class="span1">Web3 knowledge</span
                ><span class="sequel100black-95-regular-normal-onyx-20px">; from basic to Pro. Learn about</span><span class="span3">&nbsp;</span
                ><span class="span4">NFTs</span><span class="sequel100black-95-regular-normal-onyx-20px">, </span><span class="span6">IDEAs</span
                ><span class="sequel100black-95-regular-normal-onyx-20px"> and create your own from scratch. We’ll lead you every step of the way.</span>
              </p>

            </div>
            <!-- text group -->
            <div class="col-lg-2">
              <div class="pt-md-2 pt-lg-3 pb-4 pb-md-5 mb-xl-4"> </div>
              <img src="{{asset('assets/img/courses/course-mark.svg')}}" class="d-block ms-md-auto  pb-2 pb-md-3 " alt="...">
            </div>
          </div> 
          <div class="row  pt-4 pt-md-5 mt-2 mt-xl-4">
            <div class="col-lg-7">
              <h1 class="pb-4 mb-1 mb-md-2 mb-lg-3 whats-included-in-the-courses sequel100black-95-regular-normal-new-car-32px"> WHAT’S included in the Courses </h1>
            </div>
            <div class="col-lg-5">             
              <div class="row row-cols-3">
                <div class="col">
                    <div class="mb-2 course-number">
                      <div class="number sequel100black-95-regular-normal-white-32px">
                        <span class="sequel100black-95-regular-normal-white-32px-2">40</span>
                      </div>
                      <div class="text raleway-medium-jaffa-24px">
                        <span class="raleway-medium-jaffa-24px">+</span>
                      </div>
                    </div> 
                  <p class="mb-0 raleway-medium-onyx-14px">Lessons</p>
                </div>
                <div class="col"> 
                    <div class="mb-2 course-number">
                      <div class="number-1 sequel100black-95-regular-normal-white-32px">
                        <span class="sequel100black-95-regular-normal-white-32px-2">18</span>
                      </div>
                      <div class="text raleway-medium-wild-strawberry-24px">
                        <span class="raleway-medium-wild-strawberry-24px">+</span>
                      </div>
                    </div>
                  <p class="mb-0 raleway-medium-onyx-14px">Hours of content</p>
                </div>
                <div class="col">
                    <div class="mb-2 course-number">
                      <div class="number-2 sequel100black-95-regular-normal-white-32px">
                        <span class="sequel100black-95-regular-normal-white-32px-2">29</span>
                      </div>
                      <div class="text raleway-medium-chateau-green-24px">
                        <span class="raleway-medium-chateau-green-24px">+</span>
                      </div>
                    </div> 
                  <p class="mb-0 raleway-medium-onyx-14px">Hours of content</p>
                </div>
              </div>
            </div>
          </div> 

        </div>
      </section>

      <section class="container mt-3 mb-5 pt-lg-5" > 
        @livewire('courses')
      </section>

      <section class="container pb-5 mb-2 mb-md-4 mb-lg-5" style="padding-top: 80px;">
        <div class="bg-secondary border-2 shadow rounded-4 ">
          <div class="row align-items-center">
            <div class="col-xl-5 col-md-6 offset-xl-1 mb-4 mb-md-0">  
                <h2 class="h4">Ready to dive in?</h2> 
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia</p>
                <a href="" class="btn btn-link m-0 p-0 text-upper">START CREATING <img src="https://idea.thecela.com/assets/img/icon/right-arrow-rounded-icon.svg" class="ms-2"></a> 
            </div>
            <div style="margin-top: -80px;" class="col-xl-5 col-md-6 pb-4 pb-md-0 mb-2 mb-md-0 d-flex justify-content-end"> 
                <img src="https://idea.thecela.com/assets/img/courses/test.svg" alt="Image" class="" style="max-width: 384px;">
              
            </div>
          </div>
        </div>
      </section>

@endsection
@push('custom-scripts')@endpush