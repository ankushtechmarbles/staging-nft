@extends('layouts.app')
@section('title','Welcome to IDEA NFT')
@push('custom-css')
<link rel="stylesheet" media="screen" href="{{asset('assets/css/home.css')}}">
@endpush
@section('content')
<!-- Hero section -->
<section class="banner overflow-hidden">
	<div class="container">
	<div class="row">
		<div class="col-md-6">			
			<h1>Create &amp; Contribute <br/> to IDEAs through <br/> 3D NFTs.</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
			<a href="" class="btn btn-light me-4 mb-3">Create Project</a>
			<a href="" class="btn btn-warning mb-3">How It Works</a>
			<span class="b_i_1"><img src="{{ asset('assets/img/home/b_i_1.png')}}" class="scaling_animation"></span>
			<span class="b_i_2"><img src="{{ asset('assets/img/home/b_i_2.png')}}" class=""></span>
			<span class="b_i_3"><img src="{{ asset('assets/img/home/b_i_3.png')}}" class="floating_animation"></span>
		</div>		
		<div class="col-md-6">			
			<div style="position: relative;">
				<div class="boxy">
					<div class="boxy_img">
						<!-- Use image dimensions of 340px width and 342px height -->
						<img src="{{ asset('assets/img/home/m1.jpg')}}" class="img-fluid">
						<img src="{{ asset('assets/img/home/bitcoin.svg')}}" width="36px" height="36px" style="position: absolute; bottom: 10px; left: 20px; border-radius: unset;">
						<img src="{{ asset('assets/img/logo/logo.svg')}}" width="96px" height="20px" style="position: absolute; bottom: 10px; right: 20px; border-radius: unset;">
					</div>
					<span class="boxy_txt_1">Helix Auto</span>
					<span class="boxy_txt_2">1.4K Owners</span>
				</div>			
				<div class="boxy2">
					<!-- Use image dimensions of 210px width and 158px height -->
					<img src="{{ asset('assets/img/home/zebra.jpg')}}" class="img-fluid">
					<span class="boxy2_txt_1">Humanity Rocks</span>
					<span class="boxy2_txt_2"><img src="{{ asset('assets/img/home/heart.svg')}}" width="14px" height="14px" vspace="20"> 1.4K </span>
					<span class="boxy2_txt_3"><img src="{{ asset('assets/img/home/ethereum.svg')}}" width="20px" height="20px" vspace="20"> 1.4K </span>
				</div>
			</div>
		</div>
		</div>
	</div>
	</div>
</section>

<section class="skew-section overflow-hidden">
	 <span class="strawberry">.Creativity</span>
	 <span class="blue">.Innovation</span>
	 <span class="strawberry">.web3</span>
	 <span class="jaffa">.IDEA NFT<small>s</small></span>
	 <span class="strawberry">.3D NFTs</span>
	 <span class="chateau-green">.Community</span>
</section>

<div class="skew-separator overflow-hidden">
	<!-- <img src="{{ asset('assets/img/home/divider.png')}}" class="img-fluid"> -->
</div>
 
<!-- Popular Projects Section Start -->
<section class="popular-projects-section py-3 overflow-hidden">
	<div class="overlap-group1-1">
    <img class="subtract" src="{{ asset('assets/img/home/subtract-2.png')}}" alt="Subtract" />
    <div class="ellipse-10-1"></div>
  </div>
	<div class="container py-2 py-md-4 py-lg-5">
		<h2 class="h1 text-center pb-4 mb-1 mb-lg-3">Popular Projects</h2>
		<div class="position-relative px-xl-5"> 
		    <div class="swiper swiper-3d" data-swiper-options='{
								"effect": "coverflow",
								"grabCursor": true,
								"centeredSlides": true,
								"slidesPerView": "auto",
								"initialSlide": 2,
								"coverflowEffect": {
									"rotate": 0,
									"stretch": 10,
									"depth": 150,
									"modifier": 1.5,
									"slideShadows": false
								}
              }'>
		      <div class="swiper-wrapper">
		        <div class="swiper-slide">
		          <img src="{{ asset('assets/img/home/1.png')}}" alt="Popular Project" />
		        </div>
		        <div class="swiper-slide">
		          <img src="{{ asset('assets/img/home/2.png')}}" alt="Popular Project" />
		        </div>
		        <div class="swiper-slide swiper-slide-active">
		          <img src="{{ asset('assets/img/home/3.png')}}" alt="Popular Project" />
		        </div>
		        <div class="swiper-slide">
		          <img src="{{ asset('assets/img/home/4.png')}}" alt="Popular Project" />
		        </div>
		        <div class="swiper-slide">
		          <img src="{{ asset('assets/img/home/5.png')}}" alt="Popular Project" />
		        </div>
		      </div> 
		    </div>
		</div>
	</div>	
</section>
<!-- Popular Projects Section End -->

<!-- How To Create Section Start -->
<section class="htc-section py-5 overflow-hidden">
	<div class="container py-5">
		<h2 class="h1 text-center pb-5 mb-1 mb-lg-3">How to Create</h2>
	  <div class="row">
	    <div class="col-md-4 mb-4 mb-md-0">
	      <div class="card justify-content-center bg-white h-100">
	        <div class="p-2">
	          <h3 class="h3 text-dark pb-5 mb-2">Step1</h3>
	          <p class="text-dark mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	        </div>
	      </div>
	    </div>
	    <div class="col-md-4 mb-4 mb-md-0">
	      <div class="card justify-content-center bg-strawberry h-100">
	        <div class="p-2">
	          <h3 class="h3 text-light pb-5 mb-2">Step2</h3>
	          <p class="text-light mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	        </div>
	      </div>
	    </div>
	    <div class="col-md-4 mb-4 mb-md-0">
	      <div class="card justify-content-center bg-white h-100">
	        <div class="p-2">
	          <h3 class="h3 text-dark pb-5 mb-2">Step3</h3>
	          <p class="text-dark mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	        </div>
	      </div>
	    </div>
	  </div>
	</div>
</section>
<!-- How To Create Section End -->

<!-- Current Leaderboard Section Start -->
<section class="leaderboard-section py-5 overflow-hidden">
	<div class="container py-5">
		<h2 class="h1 text-center pb-5 mb-1 mb-lg-3">Current Leaderboard</h2>
		<div class="row">
			<div class="col-12">
				<div class="table-responsive">
		  			<table class="table align-middle leaderboard-table">
		  				@foreach(range(0,4) as $i)
		  				<tr>
							<td class="ps-md-4">
								<img src="{{ asset('assets/img/home/humanity-rocks-icon.svg')}}" width="33" alt="icon" class="pe-2"> Humanity Rocks
							</td>
							<td>Charity, Gaming</td>
							<td>356,021</td>
							<td>654,152</td>
							<td>1,458</td>
							<td>235,020</td>
							<td class="text-lg-end pe-lg-4">
								<a target="_blank" href="https://discord.gg/nWpATbdZ" rel="nofollow" title="Discord" class="me-2">
									<svg width="20" height="16" >
	                    <use xlink:href="{{asset('assets/img/idea-icon.svg#discord-blue')}}"></use>
	                </svg>
	              </a>
                <a target="_blank" href="https://twitter.com/IDEA_NFTs" rel="nofollow" title="Twitter" class="me-2">
									<svg width="17" height="14" >
	                    <use xlink:href="{{asset('assets/img/idea-icon.svg#twitter-blue')}}"></use>
	                </svg> 
	              </a>                
							</td>
						</tr>
						@endforeach 
					</table>
				</div>
			</div>
		</div>

    <!-- Table
    <div class="d-sm-flex flex-wrap d-lg-table w-100">
    	@foreach(range(0,4) as $i)
      <div class="d-lg-table-row w-sm-50 w-lg-100 pe-sm-3 pe-lg-0 mb-3 mb-lg-3 border border-dark">
        <div class="d-lg-table-cell align-middle py-3 py-lg-4 mb-3 bg-white rounded-start">
          <div class="d-flex align-items-center">
            <img src="{{ asset('assets/img/home/humanity-rocks-icon.svg')}}" width="32" alt="icon">
            <div class="ps-3">
              <div class="fs-lg mb-0">Humanity Rocks</div>
            </div>
          </div>
        </div>
        <div class="d-lg-table-cell align-middle fs-lg py-3 py-lg-4 mb-3 bg-white">Charity, Gaming</div>
        <div class="d-lg-table-cell align-middle fs-lg py-3 py-lg-4 mb-3 bg-white">356,021</div>
        <div class="d-lg-table-cell align-middle fs-lg py-3 py-lg-4 mb-3 bg-white">654,152</div>
        <div class="d-lg-table-cell align-middle fs-lg py-3 py-lg-4 mb-3 bg-white">1,458</div>
        <div class="d-lg-table-cell align-middle fs-lg py-3 py-lg-4 mb-3 bg-white">235,020</div>
        <div class="d-lg-table-cell align-middle py-3 py-lg-4 mb-3 bg-white rounded-end text-lg-end">          
						<a target="_blank" href="https://discord.gg/nWpATbdZ" rel="nofollow" title="Discord" class="me-2">
							<svg width="20" height="16" >
                  <use xlink:href="{{asset('assets/img/idea-icon.svg#discord-blue')}}"></use>
              </svg>
            </a>
            <a target="_blank" href="https://twitter.com/IDEA_NFTs" rel="nofollow" title="Twitter" class="me-2">
							<svg width="17" height="14" >
                  <use xlink:href="{{asset('assets/img/idea-icon.svg#twitter-blue')}}"></use>
              </svg> 
            </a>
        </div>
      </div>
			@endforeach
		</div>
		--> 
	</div>
</section>
<!-- Current Leaderboard Section End --> 

<!-- projects-slider Section Start  -->
<section class="projects-slider-section py-5 overflow-hidden" style="background-image: url({{ asset('assets/img/home/humanity-rocks-bg.png')}});">
	<div class="container py-5 ">
	  <div class="row align-items-center">
	    <div class="col-md-4 col-lg-4">
	      <div class="ps-md-4 ps-lg-0">	        
	        <div class="swiper text-center text-md-start mt-auto" data-swiper-options='{
	          "spaceBetween": 30,
	          "loop": true,
	          "tabs": true,
	          "navigation": {
	            "prevEl": "#prev-project",
	            "nextEl": "#next-project"
	          }
	        }'>
	          <div class="swiper-wrapper">
	            <div class="swiper-slide" data-swiper-tab="#project-1">
	              <h2 class="h1 text-start pb-5 mb-1 mb-lg-3">Humanity Rocks!</h2>
	              <p class="raleway-normal-black-16px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent  taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	            </div>
	            <div class="swiper-slide" data-swiper-tab="#project-2">
	              <h2 class="h1 text-start pb-5 mb-1 mb-lg-3">Humanity Rocks!</h2>
	              <p class="raleway-normal-black-16px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent  taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
	            </div>
	          </div>
	        </div>

	        <div class="d-flex justify-content-center justify-content-md-start pt-2 pt-lg-3">
	          <button type="button" id="prev-project" class="btn btn-icon btn-icon-outline rounded-circle btn-sm ms-2">
	          	<img src="{{ asset('assets/img/icon/bi-arrow-left.svg')}}" alt="arrow-left">
	            
	          </button>
	          <button type="button" id="next-project" class="btn btn-icon btn-icon-outline rounded-circle btn-sm ms-2">
	          	<img src="{{ asset('assets/img/icon/bi-arrow-right.svg')}}" alt="arrow-right">
	          </button>
	        </div>
	      </div>
	    </div>

	    <div class="col-md-7 offset-lg-1 pb-4 pb-md-0 mb-2 mb-md-0">
 
	      <div class="position-relative px-5">
	        <div class="swiper-tabs zindex-2 mx-auto" style="max-width: 754px;">
	          <div id="project-1" class="swiper-tab active">
	            <img src="{{ asset('assets/img/home/project-image.png')}}" alt="Project 1">
	          </div>
	          <div id="project-2" class="swiper-tab">
	            <img src="{{ asset('assets/img/home/project-image.png')}}" alt="Project 2">
	          </div> 
	        </div>
	      </div>
	    </div>

	  </div>
	</div>
</section>
<!--  projects-slider Section End --> 



<!-- Contribution Section Start -->
<section class="contribution-section py-5 overflow-hidden">
	<div class="container py-5">
		<div class="row">
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<span class="contribution_sec_title">How to contribute. Be part of our ecosystem</span>
					</div>
					<div class="col-md-12">
						<div class="contribution_col cc1">
						<span class="contribution_col_title">Lorel ipsum dolor</span>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="contribution_col cc2">
				<span class="contribution_col_title">Lorel ipsum dolor</span>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
				</div>
			</div>
			<div class="col-md-3">
				<div class="contribution_col cc3">
				<span class="contribution_col_title">Lorel ipsum dolor</span>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- Contribution Section End --> 

<div class="icons_sec  overflow-hidden">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-10">
				<div class="icons_box">
					<img src="{{ asset('assets/img/home/nft1.png')}}"/>
					<img src="{{ asset('assets/img/home/nft2.png')}}"/>
					<img src="{{ asset('assets/img/home/nft3.png')}}"/>
					<img src="{{ asset('assets/img/home/nft4.png')}}"/>
					<img src="{{ asset('assets/img/home/nft5.png')}}"/>
					<img src="{{ asset('assets/img/home/nft6.png')}}"/>
					<img src="{{ asset('assets/img/home/nft7.png')}}"/>
					<img src="{{ asset('assets/img/home/nft8.png')}}"/>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="tokenomics  overflow-hidden">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<span class="tokenomics_title">Tokenomics</span>
				<span class="tokenomics_subtitle">A quick breakdown of our distribution system</span>
			</div>
		</div>
		<div class="row">
			<div class="col-md-5">
				<img src="{{ asset('assets/img/home/tokens_number.png')}}" class="img-fluid">
			</div>
			<div class="col-md-6">
				<div class="tokenomics_points_outer">
				<div class="tokenomics_points tbg1">
					<h6><span class="tp1">10%</span> Team</h6>
					<p>Unlocked on bi-annual basis</p>
				</div>
				</div>
				<div class="tokenomics_points_outer">
				<div class="tokenomics_points tbg2">
					<h6><span class="tp2">10%</span> Team</h6>
					<p>Unlocked on bi-annual basis</p>
				</div>
				</div>
				<div class="tokenomics_points_outer">
				<div class="tokenomics_points tbg3">
					<h6><span class="tp3">10%</span> Team</h6>
					<p>Unlocked on bi-annual basis</p>
				</div>
				</div>
				<div class="tokenomics_points_outer">
				<div class="tokenomics_points tbg4">
					<h6><span class="tp4">10%</span> Team</h6>
					<p>Unlocked on bi-annual basis</p>
				</div>
				</div>
			</div>
		</div>
	</div>
</div>


@endsection
@push('custom-scripts')@endpush