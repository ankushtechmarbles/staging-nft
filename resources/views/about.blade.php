@extends('layouts.app')
@section('title','About')
@section('body-class','about-page')
@section('header-bg-class','bg-navbar')
@push('custom-css') 
<link rel="stylesheet" media="screen" href="{{asset('assets/css/about.css')}}">
@endpush
@section('content')
<!-- Banner section start -->
<section class="hero overflow-hidden">
    <div class="container">
        <div class="row justify-content-between align-items-center">
            <div class="col-xl-5 col-md-6 left">
                <img alt="vector" class="vector" src="{{asset('assets/img/pages/about/about-hero-vector.svg')}}"/>         
                <h1 class="my-5">Building Experiences to simplify Web3</h1>
                <!-- <div>
                    <a type="button" role="button" class="btn btn-primary mt-2 my-5">Apply to Create</a> 
                </div> -->
                <img alt="vector" class="vector-1 d-none d-md-block" src="{{asset('assets/img/pages/about/about-hero-vector-2.svg')}}"/>
            </div>      
            <div class="col-xl-6 col-md-6">          
                <div class="card card-body w-100 ms-auto">
                    <p><strong><q>An idea answers the problem; A solution solves the problem.</q> - Jamal Kinney</strong></p>
                    <p>Coming up with IDEAs is easy. Transforming an IDEA into a solution is hard. In Web3 an IDEA that resonates with your community can go anywhere. Our goal is to invest & build technology to support those IDEAs. Our mission is to established an ecosystem based on shared values, composable architecture, and bonded community-incentivizes. Together we can weave the fabric of this new digital frontier which is Web3 to reimagine and build a new landscape through our IDEAs.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="overlap-group">
        <img alt="vector" class="vector-3" src="{{asset('assets/img/pages/about/about-hero-vector-3.svg')}}"/>
        <img alt="vector" class="vector-4" src="{{asset('assets/img/pages/about/about-hero-vector-4.svg')}}"/>
    </div>
</section>
<!-- Banner section end -->
<!-- Creativity-innov section start -->
<section class="creativity-innov py-5 overflow-hidden">
  <span class="strawberry"> . Creativity . </span>
  <span class="blue">Innovation</span>
  <span class="strawberry"> . Web3 . </span>
  <span class="jaffa">IDEA NFTs</span>
  <span class="strawberry"> . 3D NFTs . </span>
  <span class="chateau-greenstrawberry">Community</span>
</section>
 <!-- Creativity-innov section end -->
 <!-- Team section start -->
<section class="our-team py-5 overflow-hidden">
    <div class="container mb-5">
        <div class="row gy-4 py-xl-2 justify-content-between align-items-center">
          <div class="col-md-4">
            <h2 class="mb-0 section-title">Our super innovative team</h2>
          </div>
          <div class="col-lg-6 offset-lg-2 col-md-8">
             <p class="raleway-normal-dove-gray-14px">We're a group of engineers, artists, thinkers, designers & writers who immersed ourselves in Web3. We want to help bridge the gap between Web2 & Web3 by helping others take IDEAs from zero to one and beyond.</p>
          </div>
        </div>
    </div> 
    <div class="container">  
        <div class="position-relative px-xl-0">
            <!-- Slider -->
            <div class="px-xl-2">
                <div class="swiper mx-n2" data-swiper-options='{
                      "slidesPerView": 1,
                      "spaceBetween": 26,
                      "loop": true,
                      "pagination": {
                        "el": ".swiper-pagination",
                        "clickable": false
                      },
                      "navigation": {
                        "prevEl": "#prev-news",
                        "nextEl": "#next-news"
                      },
                      "breakpoints": {
                        "500": {
                          "slidesPerView": 2
                        },
                        "1000": {
                          "slidesPerView": 3
                        }
                      }
                    }'>
                    <div class="swiper-wrapper">
                        @for($i=1; $i<=6; $i++)
                        <!-- Item -->
                        <div class="swiper-slide h-auto pb-3">
                          <div class="card h-100 mx-2 card-team">
                            <div class="position-relative border-0">
                              <img src="{{asset('assets/img/team/'.$i.'.jpeg')}}" class="w-100" alt="Image">
                            </div>
                          </div>
                        </div>
                        @endfor  
                    </div>
                    <!-- Slider prev/next buttons -->
                    <button type="button" id="prev-news" class="btn btn-prev btn-icon btn-sm position-absolute top-50 start-0 translate-middle-y bg-dark">
                    <i class="bx bx-chevron-left text-white"></i>
                    </button>
                    <button type="button" id="next-news" class="btn btn-next btn-icon btn-sm position-absolute top-50 end-0 translate-middle-y bg-dark">
                    <i class="bx bx-chevron-right text-white"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
 <!-- Team section end -->
 <!-- Call To Action section start -->
<section class="container pt-5" >
    <div class="row justify-content-between align-items-center">
        <div class="col-lg-10">
            <h2 class="reach-out-to-idea-da"> 
                <span>Reach out to the IDEA-NFTs Team for inquiries!<br></span>
                <a class="link-email" href="mailto:info@idea-nfts.co">info@idea-nfts.com</a>
            </h2>
            <!-- <a class="btn-circle" href="#"><span>Contact Us</span></a> -->
        </div> 
    </div>
</section> 
 <!-- Call To Action section end -->
@endsection
@push('js-plugin')@endpush
@push('custom-scripts')@endpush