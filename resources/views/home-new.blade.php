@extends('layouts.app')
@section('title','About')
@section('body-class','about-page')
@section('header-bg-class','bg-navbar')
@push('custom-css')
<link rel="stylesheet" media="screen" href="{{asset('assets/css/about.css')}}">
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>

@endpush
@section('content')

<!-- main banner section -->
<section id="main-hero" class="bg-shape section position-relative">
	<div class="inner-element container">
		<div class="row">
			<div class="col-md-6">
				<div class="hero-content pr-80">
					<h1 class="h-tagline">Create your IDEAs through innovative NFT Experiences</h1>
					<p class="text-dark mb-5">Dive into a world of limitless possibilities and explore innovative ways to express yourself with our state-of-the-art NFT creation platform, redefining the boundaries of digital artistry.</p>
					<button type="button" class="btn btn0-create">CREATE</button>
				</div>
			</div>
			<div class="col-md-6 r-elem">
				<div class="hero-img">
					<img class="img-fluid" src="image/Hero_image01.png">
				</div>
			</div>
		</div>
	</div>
	<div class="sticker sticker-colored">
		<span>Creativity</span>
		<span> &#x2022;</span>
		<span>Experience</span>
		<span> &#x2022;</span>
		<span>Web3</span>
		<span> &#x2022;</span>
		<span>AI</span>
		<span> &#x2022;</span>
		<span>3D NFTS</span>
		<span> &#x2022;</span>
		<span>Community</span>
	</div>
	<div class="sticker">
		<span>Creativity</span>
		<span> &#x2022;</span>
		<span>Experience</span>
		<span> &#x2022;</span>
		<span>Web3</span>
		<span> &#x2022;</span>
		<span>AI</span>
		<span> &#x2022;</span>
		<span>3D NFTS</span>
		<span> &#x2022;</span>
		<span>Community</span>
	</div>
</section>

<!-- /. main banner end -->

<!-- How it work section -->
<section id="how-to-work" class="section how-to-work">
	<div class="container inner-element">
		<div class="row pt-4">
			<div class="col-lg-6">
				<div class="position-relative web-picture">
					<img class="img-fluid tab" src="image/Tab.png">
					<span class="cube position-absolute"><img src="image/Cube.png"></span>
					<span class="pipe position-absolute"><img src="image/Pipe.png"></span>
					<span class="wheel position-absolute"><img src="image/Wheel.png"></span>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="right-elem position-relative corner-utility">
					<h2 class="h-tagline">How It Work</h2>
					<div class="progress-steps">
						<ul>
							<li>
								<span class="counter"></span>
								<p class="counter-desc">Unleash your creativity by customizing and designing your NFT, exploring the countless possibilities our platform has to offer.</p>
							</li>
							<li>
								<span class="counter"></span>
								<p class="counter-desc">Unleash your creativity by customizing and designing your NFT, exploring the countless possibilities our platform has to offer.</p>
							</li>
							<li>
								<span class="counter"></span>
								<p class="counter-desc after-none">Mint your completed masterpiece as an NFT, ready to be showcased, shared, or sold on our marketplace, and start making an impact in the digital art world.</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- /. How it work end -->

<!-- Popular project section -->

<section id="popular-project" class="section bg-shape-curve position-relative">
	<div class="container inner-element content">
		<h2 class="h-tagline text-center text-white mb-5">Popular Projects</h2>
		<div class="row align-items-center">
			<div class="col-lg-8 order-lg-2 position-relative">
				<div class="project-preview slider-for">
					<img src="image/project-image01.png">
					<img src="image/Tab.png">
				</div>
				<span class="position-absolute utility-top"><img src="image/Utility_pipe_circle.svg"></span>
				<span class="position-absolute utility-bottom"><img src="image/utility_triangle.png"></span>
			</div>
			<div class="col-lg-4 order-lg-1">
				<div class="project-detail slider-nav">
					<span class="detail-in">
						<h2 class="h-tagline dynamic text-white">Humanity Rocks!</h2>
						<p class="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
					</span>
					<span class="detail-in">
						<h2 class="h-tagline dynamic text-white">Humanity Rocks! 2</h2>
						<p class="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 2</p>
					</span>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- /. Popular project end -->


<!-- How to create section -->

<section id="how-to-create" class="section how-to-create">
	<div class="container inner-element">
		<h2 class="h-tagline text-center text-dark mb-5">How to Create</h2>
		<div class="row px-5 gy-5 pb-5 position-relative utility">
			<div class="col-md-6 col-lg-4">
				<div class="icon-box">
					<div class="icon-bg-shape"><img src="image/nft_icon.svg"></div>
					<h3>AI ART</h3>
					<p>Harness the power of artificial intelligence to generate stunning, one-of-a-kind artworks tailored to your unique preferences and artistic vision.</p>
				</div>
			</div>
			<div class="col-md-6 col-lg-4">
				<div class="icon-box">
					<div class="icon-bg-shape"><img src="image/3d_box.svg"></div>
					<h3>3d experience</h3>
					<p>Immerse yourself in captivating 3D worlds by selecting models from our extensive library, customizing backgrounds, adding music, and more, all within our intuitive platform.</p>
				</div>
			</div>
			<div class="col-md-6 col-lg-4">
				<div class="icon-box">
					<div class="icon-bg-shape"><img src="image/paint_board.svg"></div>
					<h3>3d paint</h3>
					<p>Transform your ideas into vibrant 3D masterpieces with our advanced 3D paint tool, offering a dynamic and immersive creative experience like no other.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- /. How to create end -->

<!-- Leaderboard section -->
<section id="leader-board" class="section leader-board pb-1">
	<div class="container inner-element content">
		<h2 class="h-tagline text-center text-dark mb-1 fst-italic">Leaderboard</h2>
		<p class="sub-heading-leader text-center text-dark pb-5">Discover the top creators and NFTs on our platform, showcasing an incredible array of talent and innovation. Be inspired by the best in the industry and join our thriving community of artists, collectors, and enthusiasts.</p>
		<div class="px-5 table-overflow-scroll position-relative utility">
			<div class="table-container bg-white">
				<table>
					<tbody>
						<tr>
							<td><img class="user-prev" src="image/img_01.png"></td>
							<td class="text-start">
								<h5>Humanity Rock</h5>
								<em class="text-uppercase">charity</em>
								<em class="text-uppercase">gaming</em>
							</td>
							<td><strong>356,021</strong></td>
							<td><strong>654,152</strong></td>
							<td><strong>1,452</strong></td>
							<td><strong>253,020</strong></td>
							<td>
								<a class="bg-darkblue" href="#"><img src="image/discard.svg"></a>
								<a class="bg-skyblue" href="#"><img src="image/twitter.svg"></a>
							</td>
						</tr>

						<tr>
							<td><img class="user-prev" src="image/img_01.png"></td>
							<td class="text-start">
								<h5>Humanity Rock</h5>
								<em class="text-uppercase">charity</em>
								<em class="text-uppercase">gaming</em>
							</td>
							<td><strong>356,021</strong></td>
							<td><strong>654,152</strong></td>
							<td><strong>1,452</strong></td>
							<td><strong>253,020</strong></td>
							<td>
								<a class="bg-darkblue discard" href="#"><img src="image/discard.svg"></a>
								<a class="bg-skyblue twitter" href="#"><img src="image/twitter.svg"></a>
							</td>
						</tr>

						<tr>
							<td><img class="user-prev" src="image/img_01.png"></td>
							<td class="text-start">
								<h5>Humanity Rock</h5>
								<em class="text-uppercase">charity</em>
								<em class="text-uppercase">gaming</em>
							</td>
							<td><strong>356,021</strong></td>
							<td><strong>654,152</strong></td>
							<td><strong>1,452</strong></td>
							<td><strong>253,020</strong></td>
							<td>
								<a class="bg-darkblue discard" href="#"><img src="image/discard.svg"></a>
								<a class="bg-skyblue twitter" href="#"><img src="image/twitter.svg"></a>
							</td>
						</tr>

						<tr>
							<td><img class="user-prev" src="image/img_01.png"></td>
							<td class="text-start">
								<h5>Humanity Rock</h5>
								<em class="text-uppercase">charity</em>
								<em class="text-uppercase">gaming</em>
							</td>
							<td><strong>356,021</strong></td>
							<td><strong>654,152</strong></td>
							<td><strong>1,452</strong></td>
							<td><strong>253,020</strong></td>
							<td>
								<a class="bg-darkblue discard" href="#"><img src="image/discard.svg"></a>
								<a class="bg-skyblue twitter" href="#"><img src="image/twitter.svg"></a>
							</td>
						</tr>

						<tr>
							<td><img class="user-prev" src="image/img_01.png"></td>
							<td class="text-start">
								<h5>Humanity Rock</h5>
								<em class="text-uppercase">charity</em>
								<em class="text-uppercase">gaming</em>
							</td>
							<td><strong>356,021</strong></td>
							<td><strong>654,152</strong></td>
							<td><strong>1,452</strong></td>
							<td><strong>253,020</strong></td>
							<td>
								<a class="bg-darkblue discard" href="#"><img src="image/discard.svg"></a>
								<a class="bg-skyblue twitter" href="#"><img src="image/twitter.svg"></a>
							</td>
						</tr>

						<tr>
							<td><img class="user-prev" src="image/img_01.png"></td>
							<td class="text-start">
								<h5>Humanity Rock</h5>
								<em class="text-uppercase">charity</em>
								<em class="text-uppercase">gaming</em>
							</td>
							<td><strong>356,021</strong></td>
							<td><strong>654,152</strong></td>
							<td><strong>1,452</strong></td>
							<td><strong>253,020</strong></td>
							<td>
								<a class="bg-darkblue discard" href="#"><img src="image/discard.svg"></a>
								<a class="bg-skyblue twitter" href="#"><img src="image/twitter.svg"></a>
							</td>
						</tr>

						<tr>
							<td><img class="user-prev" src="image/img_01.png"></td>
							<td class="text-start">
								<h5>Humanity Rock</h5>
								<em class="text-uppercase">charity</em>
								<em class="text-uppercase">gaming</em>
							</td>
							<td><strong>356,021</strong></td>
							<td><strong>654,152</strong></td>
							<td><strong>1,452</strong></td>
							<td><strong>253,020</strong></td>
							<td>
								<a class="bg-darkblue discard" href="#"><img src="image/discard.svg"></a>
								<a class="bg-skyblue twitter" href="#"><img src="image/twitter.svg"></a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>

<!-- /. Leaderboard end -->

<!-- Marketplace section -->

<section id="market-place" class="section market-place pt-5">
	<div class="container inner-element px-5">
		<h2 class="h-tagline text-center text-dark mb-1 fst-italic">Marketplace</h2>
		<p class="sub-heading-leader text-center text-dark pb-5">Discover the top creators and NFTs on our platform, showcasing an incredible array of talent and innovation. Be inspired by the best in the industry and join our thriving community of artists, collectors, and enthusiasts.</p>

		<div class="row border-bottom align-items-center pb-3">
			<div class="col-5 px-0">
				<!-- desktop filter  -->
				<nav class="hide-md-screen">
					<div class="nav nav-tabs mb-0" id="nav-tab" role="tablist">
						<a href="javascript_void(0)" class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#trending" type="button" role="tab" aria-controls="trending" aria-selected="true">
							<img class="mr-5" src="image/trending.svg">Trendings</a>
							<a href="javascript_void(0)" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#top-ideas" type="button" role="tab" aria-controls="top-ideas" aria-selected="false">
								<img class="mr-5" src="image/ideas.svg">Top Ideas</a>
								<a href="javascript_void(0)" class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#top-creators" type="button" role="tab" aria-controls="top-creators" aria-selected="false">
									<img class="mr-5" src="image/creators.svg">Top Creators</a>
								</div>
							</nav>
							<!--  desktop filter end -->

							<!-- mobile filter  -->
							<div class="mobile-filter hide-lg-screen">
								<!-- <select id="size_select">
								  <option value="trending" style="background-image:url(image/trending.svg);"> <img class="mr-5" src="image/trending.svg">Trending</option>
								  <option value="top-ideas"><img class="mr-5" src="image/ideas.svg">Top Ideas</option>
								  <option value="top-creators"><img class="mr-5" src="image/creators.svg">Top Creators</option>
								</select> -->
								<div class="custom-select">
									  <div class="select-trigger">
									    <span class="selected-text">
									    	<img src="image/trending.svg" alt="trending" class="flag">Trending</span>
									    	<img src="image/arrow-down.svg">
									  </div>
									  <ul class="select-options p-0">
									    <li data-value="trending" id="trending-tab">
									      <img src="image/trending.svg" alt="trending" class="flag">
									      <span class="option-text">Trending</span>
									    </li>
									    <li data-value="top-ideas"  id="top-ideas-tab">
									      <img src="image/ideas.svg" alt="ideas" class="flag">
									      <span class="option-text">Top Ideas</span>
									    </li>
									    <li data-value="top-creators" id="top-creators-tab">
									      <img src="image/creators.svg" alt="creators" class="flag">
									      <span class="option-text">Top Creators</span>
									    </li>
									    <!-- Add more options with images and text here -->
									  </ul>
									</div>
							</div>

						</div>
						<div class="col-7 px-0">
							<div class="d-flex gap-3 justify-content-end">
								<div class="select-box-radio">
									<!-- desktop filter -->
									<div class="selection-type hide-md-screen">
										<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
										<label class="form-check-label" for="flexRadioDefault1">
											1H
										</label>
										<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
										<label class="form-check-label" for="flexRadioDefault2">
											6H
										</label>
										<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked>
										<label class="form-check-label" for="flexRadioDefault3">
											24H
										</label>
										<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" checked>
										<label class="form-check-label" for="flexRadioDefault4">
											7D
										</label>
										<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" checked>
										<label class="form-check-label" for="flexRadioDefault5">
											30D
										</label>
										<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6" checked>
										<label class="form-check-label" for="flexRadioDefault6">
											All
										</label>
									</div>
									<!-- desktop filter end -->
									<!-- mobile filter  -->
										<div class="custom-select-dimentions hide-lg-screen">
										  <div class="select-trigger">
										    <span class="selected-text">All</span>
										    <img src="image/arrow-down.svg">
										  </div>
										  <ul class="select-options p-0">
										    <li data-value="trending" id="trending-tab">
										      <span class="option-text">1H</span>
										    </li>
										    <li data-value="top-ideas"  id="top-ideas-tab">
										      <span class="option-text">6H</span>
										    </li>
										    <li data-value="top-creators" id="top-creators-tab">
										      <span class="option-text">24H</span>
										    </li>
										    <li data-value="top-creators" id="top-creators-tab">
										      <span class="option-text">7D</span>
										    </li>
										    <li data-value="top-creators" id="top-creators-tab">
										      <span class="option-text">30D</span>
										    </li>
										    <li data-value="top-creators" id="top-creators-tab">
										      <span class="option-text">All</span>
										    </li>
										    <!-- Add more options with images and text here -->
										  </ul>
										</div>
										<!-- mobile filter end -->
								</div>
								<div class="select-box-radio">
									<!-- desktop filter -->
									<div class="selection-type hide-md-screen">
										<input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault01">
										<label class="form-check-label" for="flexRadioDefault01">
											All
										</label>
										<input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault02" checked>
										<label class="form-check-label" for="flexRadioDefault02">
											<img src="image/nft-1.svg">
										</label>
										<input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault03" checked>
										<label class="form-check-label" for="flexRadioDefault03">
											<img src="image/nft-2.svg">
										</label>
										<input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault04" checked>
										<label class="form-check-label" for="flexRadioDefault04">
											<img src="image/nft-3.svg">
										</label>
										<input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault05" checked>
										<label class="form-check-label" for="flexRadioDefault05">
											<img src="image/nft-4.svg">
										</label>
									</div>
									<!-- desktop filter end -->

										<!-- mobile filter  -->
											<div class="custom-select-nfts hide-lg-screen">
											  <div class="select-trigger">
											    <span class="selected-text">All</span>
											    <img src="image/arrow-down.svg">
											  </div>
											  <ul class="select-options p-0">
											    <li data-value="trending" id="trending-tab">
											      <img src="image/nft-1.svg">
											    </li>
											    <li data-value="top-ideas"  id="top-ideas-tab">
											      <img src="image/nft-2.svg">
											    </li>
											    <li data-value="top-creators" id="top-creators-tab">
											      <img src="image/nft-3.svg">
											    </li>
											    <li data-value="top-creators" id="top-creators-tab">
											      <img src="image/nft-4.svg">
											    </li>
											    <li data-value="top-creators" id="top-creators-tab">
											      <span class="option-text">All</span>
											    </li>
											    <!-- Add more options with images and text here -->
											  </ul>
											</div>
										<!-- mobile filter end -->
								</div>
							</div>
						</div>
					</div>
					<div class="tabs-content-wrapper">
						<div class="inner-wrapper">
							<div class="tab-content py-3  bg-light" id="nav-tabContent">
								<div class="tab-pane fade active show size_chart" id="trending" role="tabpanel" aria-labelledby="trending-tab">
									<div class="row">
										<div class="col-lg-6">
											<div class="marketplace-table-container bg-white">
												<table width="100%">
													<thead>
														<tr>
															<th class="text-start">Collections</th>
															<th>Floor Price</th>
															<th>Volume</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">1</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>2.3K ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">2</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>2.3K ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">3</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>2.3K ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">4</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>2.3K ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">5</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>2.3K ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<div class="col-lg-6">
											<div class="marketplace-table-container bg-white">
												<table width="100%">
													<thead class="hide-md-screen">
														<tr>
															<th class="text-start">Collections</th>
															<th>Floor Price</th>
															<th>Volume</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">6</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>114ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">7</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>114ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">8</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>114ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">9</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>114ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
														<tr>
															<td class="text-start d-flex align-items-center gap-3">
																<span class="counter">10</span>
																<span><img class="user-prev" src="image/helix.png"></span>
																<span><h5 class="m-0 type-name position-relative">Helix Auto</h5></span>
															</td>
															<td class="text-center"><span>114ETH</span></td>
															<td class="text-center"><span>114ETH</span></td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
								<div class="tab-pane fade size_chart" id="top-ideas" role="tabpanel" aria-labelledby="top-ideas-tab">
									<p class="contenting"><strong>This is some placeholder content the Profile tab's associated content.</strong>
										Clicking another tab will toggle the visibility of this one for the next.
										The tab JavaScript swaps classes to control the content visibility and styling. You can use it with
										tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
									</div>
									<div class="tab-pane fade size_chart" id="top-creators" role="tabpanel" aria-labelledby="top-creators-tab">
										<p class="contenting"><strong>This is some placeholder content the Contact tab's associated content.</strong>
											Clicking another tab will toggle the visibility of this one for the next.
											The tab JavaScript swaps classes to control the content visibility and styling. You can use it with
											tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--  /. Marketplace end -->

			<!-- Our blog section -->

			<section id="our-blog" class="section our-blog">
				<div class="container inner-element content">
						<h2 class="h-tagline text-center text-white mb-1 fst-italic">Our Blog</h2>
						<p class="sub-heading-leader text-center text-white pb-5">Discover the top creators and NFTs on our platform, showcasing an incredible array of talent and innovation. Be inspired by the best in the industry and join our thriving community of artists, collectors, and enthusiasts.</p>
						<div class="row py-5 align-items-center">
							<div class="col-md-6">
								<div class="postion-relative blog-thumnail-image">
									<img src="image/blog-main.png">
								</div>
							</div>
							<div class="col-md-6">
								<div class="blog-content">
									<h2 class="text-white h-blog-heading">How Helix Auto became a reality in 1 month</h2>
									<p class="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at faucibus lectus. Etiam leo ante, mattis sit amet mauris a, tempus sagittis quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras consectetur ex id magna placerat variu.</p>
									<button type="button" class="btn btn0-create read-more">Read More <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0 6L17 6" stroke="black"/>
									<path d="M12 1L17 6L12 11" stroke="black"/>
									</svg></button>
								</div>
							</div>
						</div>
				</div>
			</section>

			<!-- Our blog end -->

			<!-- Explore section -->

			<section id="explore" class="section explore">
				<div class="container inner-element">
					<h2 class="h-tagline text-center text-dark mb-1 fst-italic">Explore</h2>
						<p class="sub-heading-leader text-center text-dark pb-5">Discover the top creators and NFTs on our platform, showcasing an incredible array of talent and innovation. Be inspired by the best in the industry and join our thriving community of artists, collectors, and enthusiasts.</p>
						<div class="explore-utility">
							<div class="row" data-masonry="{&quot;percentPosition&quot;: true }">
					    <div class="col-sm-6 col-lg-3 mb-4">
					      <div class="card position-relative overflow-hidden">
					        <img src="image/explore02.jpeg">
					        <div class="card-body position-absolute d-flex align-items-center card-after-hover">
					          <div class="content_info">
					          	<h5 class="card-title">Illusion, Perception</h5>
					          	<p class="card-text">Lorem ipsum dolor sit amet, con s,e,cte tur adipiscing elit.Lorem ipsum dolor sit </p>
					          </div>
					          <div class="nft_value">
					          	<div class="p-2 d-flex flex-column align-items-center justify-content-center gap-1">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					        <div class="card-before-hover">
					        	<div class="nft_value d-flex">
					          	<div class="p-2 d-flex align-items-center justify-content-center">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					      </div>
					    </div>
					    <div class="col-sm-6 col-lg-3 mb-4">
					      <div class="card position-relative overflow-hidden">
					      	  <img src="image/explore04.jpeg">
					        <div class="card-body position-absolute d-flex align-items-center card-after-hover">
					          <div class="content_info">
					          	<h5 class="card-title">Illusion, Perception</h5>
					          	<p class="card-text">Lorem ipsum dolor sit amet, con s,e,cte tur adipiscing elit.Lorem ipsum dolor sit </p>
					          </div>
					          <div class="nft_value">
					          	<div class="p-2 d-flex flex-column align-items-center justify-content-center gap-1">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					         <div class="card-before-hover">
					        	<div class="nft_value d-flex">
					          	<div class="p-2 d-flex align-items-center justify-content-center">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					      </div>
					    </div>
					    <div class="col-sm-6 col-lg-3 mb-4">
					      <div class="card position-relative overflow-hidden">
					       <img src="image/explore02.jpeg">
					       <div class="card-body position-absolute d-flex align-items-center card-after-hover">
					          <div class="content_info">
					          	<h5 class="card-title">Illusion, Perception</h5>
					          	<p class="card-text">Lorem ipsum dolor sit amet, con s,e,cte tur adipiscing elit.Lorem ipsum dolor sit </p>
					          </div>
					          <div class="nft_value">
					          	<div class="p-2 d-flex flex-column align-items-center justify-content-center gap-1">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					         <div class="card-before-hover">
					        	<div class="nft_value d-flex">
					          	<div class="p-2 d-flex align-items-center justify-content-center">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					      </div>
					    </div>
					    <div class="col-sm-6 col-lg-3 mb-4">
					      <div class="card position-relative overflow-hidden">
					       <img src="image/explore03.jpeg">
					       <div class="card-body position-absolute d-flex align-items-center card-after-hover">
					          <div class="content_info">
					          	<h5 class="card-title">Illusion, Perception</h5>
					          	<p class="card-text">Lorem ipsum dolor sit amet, con s,e,cte tur adipiscing elit.Lorem ipsum dolor sit </p>
					          </div>
					          <div class="nft_value">
					          	<div class="p-2 d-flex flex-column align-items-center justify-content-center gap-1">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					         <div class="card-before-hover">
					        	<div class="nft_value d-flex">
					          	<div class="p-2 d-flex align-items-center justify-content-center">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					      </div>
					    </div>
					    <div class="col-sm-6 col-lg-3 mb-4">
					      <div class="card position-relative overflow-hidden">
					       <img src="image/explore07.jpeg">
					       <div class="card-body position-absolute d-flex align-items-center card-after-hover">
					          <div class="content_info">
					          	<h5 class="card-title">Illusion, Perception</h5>
					          	<p class="card-text">Lorem ipsum dolor sit amet, con s,e,cte tur adipiscing elit.Lorem ipsum dolor sit </p>
					          </div>
					          <div class="nft_value">
					          	<div class="p-2 d-flex flex-column align-items-center justify-content-center gap-1">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					         <div class="card-before-hover">
					        	<div class="nft_value d-flex">
					          	<div class="p-2 d-flex align-items-center justify-content-center">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					      </div>
					    </div>
					    <div class="col-sm-6 col-lg-3 mb-4">
					      <div class="card position-relative overflow-hidden">
					       <img src="image/explore08.jpeg">
					       <div class="card-body position-absolute d-flex align-items-center card-after-hover">
					          <div class="content_info">
					          	<h5 class="card-title">Illusion, Perception</h5>
					          	<p class="card-text">Lorem ipsum dolor sit amet, con s,e,cte tur adipiscing elit.Lorem ipsum dolor sit </p>
					          </div>
					          <div class="nft_value">
					          	<div class="p-2 d-flex flex-column align-items-center justify-content-center gap-1">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					         <div class="card-before-hover">
					        	<div class="nft_value d-flex">
					          	<div class="p-2 d-flex align-items-center justify-content-center">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					      </div>
					    </div>
					    <div class="col-sm-6 col-lg-3 mb-4">
					      <div class="card position-relative overflow-hidden">
					       <img src="image/explore05.jpeg">
					       <div class="card-body position-absolute d-flex align-items-center card-after-hover">
					          <div class="content_info">
					          	<h5 class="card-title">Illusion, Perception</h5>
					          	<p class="card-text">Lorem ipsum dolor sit amet, con s,e,cte tur adipiscing elit.Lorem ipsum dolor sit </p>
					          </div>
					          <div class="nft_value">
					          	<div class="p-2 d-flex flex-column align-items-center justify-content-center gap-1">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					         <div class="card-before-hover">
					        	<div class="nft_value d-flex">
					          	<div class="p-2 d-flex align-items-center justify-content-center">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					      </div>
					    </div>
					    <div class="col-sm-6 col-lg-3 mb-4">
					      <div class="card position-relative overflow-hidden">
					       <img src="image/explore06.jpeg">
					       <div class="card-body position-absolute d-flex align-items-center card-after-hover">
					          <div class="content_info">
					          	<h5 class="card-title">Illusion, Perception</h5>
					          	<p class="card-text">Lorem ipsum dolor sit amet, con s,e,cte tur adipiscing elit.Lorem ipsum dolor sit </p>
					          </div>
					          <div class="nft_value">
					          	<div class="p-2 d-flex flex-column align-items-center justify-content-center gap-1">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					         <div class="card-before-hover">
					        	<div class="nft_value d-flex">
					          	<div class="p-2 d-flex align-items-center justify-content-center">
					          		<span class="arrow_up_icon"><img src="image/arrow-up.svg"></span>
					          		<span class="value">1224</span>
					          	</div>
					          </div>
					        </div>
					      </div>
					    </div>
					  </div>
						</div>

					  <div class="lode-more-button text-center">
					  	<button type="button" id="load_more" class="btn btn_green text-dark">Load More</button>
					  </div>
				</div>
			</section>

			<!-- Explore end -->




			<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
			<!-- bootstrap 5.3 -->
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
			<!-- slick slider cdn -->
			<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
			<!-- masonary grid cdn -->
			<script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script>

			<script>
  // Your jQuery-related code here
  $(document).ready(function($) {
					$('.slider-for').slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
						fade: true,
						asNavFor: '.slider-nav'
					});
					$('.slider-nav').slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						asNavFor: '.slider-for',
						dots: false,
						centerMode: false,
						focusOnSelect: true,
						arrows: true,
						nextArrow: '<img class="arrow-icon icon-right" src="image/arrow-next.svg">',
						prevArrow: '<img class="arrow-icon icon-left" src="image/arrow-prev.svg">',
					});



				});
				$(document).ready(function() {
    				$(".custom-select .select-trigger").click(function() {
      				$(this).siblings(".select-options").toggle();
    			});

			    $(".custom-select .select-options li").click(function() {
			      var selectedValue = $(this).attr("data-value");
			      var selectedText = $(this).find(".option-text").text();
			      var selectedFlag = $(this).find(".flag").clone();

			      // Update the selected text and value in the trigger element
			      $(this).closest(".custom-select").find(".selected-text").html(selectedFlag).append(selectedText);
			      $(".custom-select .select-options").hide();

			      // Update the content of the element with the selected value
			      $("#selected-value").text("Selected Value: " + selectedText);

			      // Show the corresponding tab content based on data-value
			      $(".tab-pane").hide();
			      $("#" + selectedValue).show().css("opacity","1");;
			    });

			    // Hide dropdown when clicked outside
			    $(document).on("click", function(event) {
			      if (!$(event.target).closest(".custom-select").length) {
			        $(".custom-select .select-options").hide();
			      }
			    });

			    $(".custom-select li").click(function() {
			      var traget = $(this).attr('data-value');
						$('#nav-tabContent').find(jQuery('#'+traget)).show().css("opacity","1");
			    });

			  });

			</script>

			@endsection
			@push('js-plugin')@endpush
			@push('custom-scripts')@endpush
