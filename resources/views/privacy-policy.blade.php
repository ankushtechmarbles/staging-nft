@extends('layouts.app')
@section('title','Privacy Policy')
@section('body-class','about-page')
@section('header-bg-class','bg-navbar')
@push('custom-css') 
<link rel="stylesheet" media="screen" href="{{asset('assets/css/about.css')}}">
@endpush
@section('content')
 <!-- Team section start -->
<section class="hero our-team py-5 overflow-hidden">
    <div class="container mb-5">
        <div class="row gy-4 py-xl-2">
          <div class="col-md-12">
            <h2 class="fs-2">Privacy Policy</h2>
            <p class="raleway-normal-dove-gray-14px">Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.</p>
            <ul>
                <li class="raleway-normal-dove-gray-14px">Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.</li>
                <li class="raleway-normal-dove-gray-14px">We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.</li>
                <li class="raleway-normal-dove-gray-14px">We will only retain personal information as long as necessary for the fulfillment of those purposes.</li>
                <li class="raleway-normal-dove-gray-14px">We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.</li>
                <li class="raleway-normal-dove-gray-14px">Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.</li>
                <li class="raleway-normal-dove-gray-14px">We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.</li>
                <li class="raleway-normal-dove-gray-14px">We will make readily available to customers information about our policies and practices relating to the management of personal information.</li>
            </ul>
            <p class="raleway-normal-dove-gray-14px">We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.</p>
            
          </div>
        </div>
    </div>
</section>
 <!-- Team section end -->
@endsection
@push('js-plugin')@endpush
@push('custom-scripts')@endpush